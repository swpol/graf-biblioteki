// src/lib/manifest.ts
var TILING_PLUGIN_ID = "tiling";
var manifest = {
  id: TILING_PLUGIN_ID,
  name: "Tiling Plugin",
  version: "1.0.0",
  provides: ["tiling"],
  requires: ["render", "scroll", "viewport"],
  optional: [],
  defaultConfig: {
    enabled: true,
    tileSize: 768,
    overlapPx: 2.5,
    extraRings: 0
  }
};

// src/lib/actions.ts
var UPDATE_VISIBLE_TILES = "UPDATE_VISIBLE_TILES";
var MARK_TILE_STATUS = "MARK_TILE_STATUS";
var updateVisibleTiles = (tiles) => ({
  type: UPDATE_VISIBLE_TILES,
  payload: tiles
});
var markTileStatus = (pageIndex, tileId, status) => ({ type: MARK_TILE_STATUS, payload: { pageIndex, tileId, status } });

// src/lib/reducer.ts
var initialState = {
  visibleTiles: {}
};
var tilingReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_VISIBLE_TILES: {
      const incoming = action.payload;
      const nextPages = { ...state.visibleTiles };
      for (const key in incoming) {
        const pageIndex = Number(key);
        const newTiles = incoming[pageIndex];
        const prevTiles = nextPages[pageIndex] ?? [];
        const prevScale = prevTiles.find((t) => !t.isFallback)?.srcScale;
        const newScale = newTiles[0].srcScale;
        const zoomChanged = prevScale !== void 0 && prevScale !== newScale;
        if (zoomChanged) {
          const promoted = prevTiles.filter((t) => !t.isFallback && t.status === "ready").map((t) => ({ ...t, isFallback: true }));
          const fallbackToCarry = promoted.length > 0 ? [] : prevTiles.filter((t) => t.isFallback);
          nextPages[pageIndex] = [...fallbackToCarry, ...promoted, ...newTiles];
        } else {
          const newIds = new Set(newTiles.map((t) => t.id));
          const keepers = [];
          const seenIds = /* @__PURE__ */ new Set();
          for (const t of prevTiles) {
            if (t.isFallback) {
              keepers.push(t);
              seenIds.add(t.id);
            } else if (newIds.has(t.id)) {
              keepers.push(t);
              seenIds.add(t.id);
            }
          }
          for (const t of newTiles) {
            if (!seenIds.has(t.id)) keepers.push(t);
          }
          nextPages[pageIndex] = keepers;
        }
      }
      return { ...state, visibleTiles: nextPages };
    }
    case MARK_TILE_STATUS: {
      const { pageIndex, tileId, status } = action.payload;
      const tiles = state.visibleTiles[pageIndex]?.map(
        (t) => t.id === tileId ? { ...t, status } : t
      ) ?? [];
      const newTiles = tiles.filter((t) => !t.isFallback);
      const allReady = newTiles.every((t) => t.status === "ready");
      const finalTiles = allReady ? newTiles : tiles;
      return {
        ...state,
        visibleTiles: { ...state.visibleTiles, [pageIndex]: finalTiles }
      };
    }
    default:
      return state;
  }
};

// src/lib/tiling-plugin.ts
import {
  BasePlugin,
  createBehaviorEmitter
} from "@embedpdf/core";
import { ignore } from "@embedpdf/models";

// src/lib/utils.ts
import { restoreRect, transformSize } from "@embedpdf/models";
function calculateTilesForPage({
  tileSize = 768,
  overlapPx = 2.5,
  extraRings = 0,
  scale,
  rotation,
  page,
  metric
}) {
  const pageW = page.size.width * scale;
  const pageH = page.size.height * scale;
  const step = tileSize - overlapPx;
  const containerSize = transformSize(page.size, rotation, scale);
  const rotatedVisRect = {
    origin: { x: metric.scaled.pageX, y: metric.scaled.pageY },
    size: { width: metric.scaled.visibleWidth, height: metric.scaled.visibleHeight }
  };
  const unrotatedVisRect = restoreRect(containerSize, rotatedVisRect, rotation, 1);
  const visLeft = unrotatedVisRect.origin.x;
  const visTop = unrotatedVisRect.origin.y;
  const visRight = visLeft + unrotatedVisRect.size.width;
  const visBottom = visTop + unrotatedVisRect.size.height;
  const maxCol = Math.floor((pageW - 1) / step);
  const maxRow = Math.floor((pageH - 1) / step);
  const startCol = Math.max(0, Math.floor(visLeft / step) - extraRings);
  const endCol = Math.min(maxCol, Math.floor((visRight - 1) / step) + extraRings);
  const startRow = Math.max(0, Math.floor(visTop / step) - extraRings);
  const endRow = Math.min(maxRow, Math.floor((visBottom - 1) / step) + extraRings);
  const tiles = [];
  for (let col = startCol; col <= endCol; col++) {
    const xScreen = col * step;
    const wScreen = Math.min(tileSize, pageW - xScreen);
    const xPage = xScreen / scale;
    const wPage = wScreen / scale;
    for (let row = startRow; row <= endRow; row++) {
      const yScreen = row * step;
      const hScreen = Math.min(tileSize, pageH - yScreen);
      const yPage = yScreen / scale;
      const hPage = hScreen / scale;
      tiles.push({
        id: `p${page.index}-${scale}-x${xScreen}-y${yScreen}-w${wScreen}-h${hScreen}`,
        col,
        row,
        pageRect: { origin: { x: xPage, y: yPage }, size: { width: wPage, height: hPage } },
        screenRect: {
          origin: { x: xScreen, y: yScreen },
          size: { width: wScreen, height: hScreen }
        },
        status: "queued",
        srcScale: scale,
        isFallback: false
      });
    }
  }
  return tiles;
}

// src/lib/tiling-plugin.ts
var TilingPlugin = class extends BasePlugin {
  constructor(id, registry, config) {
    super(id, registry);
    this.tileRendering$ = createBehaviorEmitter();
    this.config = config;
    this.renderCapability = this.registry.getPlugin("render").provides();
    this.scrollCapability = this.registry.getPlugin("scroll").provides();
    this.viewportCapability = this.registry.getPlugin("viewport").provides();
    this.scrollCapability.onScroll((scrollMetrics) => this.calculateVisibleTiles(scrollMetrics), {
      mode: "throttle",
      wait: 500,
      throttleMode: "trailing"
    });
  }
  async initialize() {
  }
  onCoreStoreUpdated(oldState, newState) {
    if (oldState.core.scale !== newState.core.scale) {
      this.calculateVisibleTiles(
        this.scrollCapability.getMetrics(this.viewportCapability.getMetrics())
      );
    }
  }
  calculateVisibleTiles(scrollMetrics) {
    if (!this.config.enabled) {
      this.dispatch(updateVisibleTiles([]));
      return;
    }
    const scale = this.coreState.core.scale;
    const rotation = this.coreState.core.rotation;
    const visibleTiles = {};
    for (const scrollMetric of scrollMetrics.pageVisibilityMetrics) {
      const pageIndex = scrollMetric.pageNumber - 1;
      const page = this.coreState.core.document?.pages[pageIndex];
      if (!page) continue;
      const tiles = calculateTilesForPage({
        page,
        metric: scrollMetric,
        scale,
        rotation,
        tileSize: this.config.tileSize,
        overlapPx: this.config.overlapPx,
        extraRings: this.config.extraRings
      });
      visibleTiles[pageIndex] = tiles;
    }
    this.dispatch(updateVisibleTiles(visibleTiles));
  }
  onStoreUpdated(_prevState, newState) {
    this.tileRendering$.emit(newState.visibleTiles);
  }
  buildCapability() {
    return {
      renderTile: this.renderTile.bind(this),
      onTileRendering: this.tileRendering$.on
    };
  }
  renderTile(options) {
    if (!this.renderCapability) {
      throw new Error("Render capability not available.");
    }
    this.dispatch(markTileStatus(options.pageIndex, options.tile.id, "rendering"));
    const task = this.renderCapability.renderPageRect({
      pageIndex: options.pageIndex,
      rect: options.tile.pageRect,
      scaleFactor: options.tile.srcScale,
      dpr: options.dpr
    });
    task.wait(() => {
      this.dispatch(markTileStatus(options.pageIndex, options.tile.id, "ready"));
    }, ignore);
    return task;
  }
};
TilingPlugin.id = "tiling";

// src/lib/index.ts
var TilingPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new TilingPlugin(TILING_PLUGIN_ID, registry, config),
  reducer: (state, action) => tilingReducer(state, action),
  initialState
};
export {
  TILING_PLUGIN_ID,
  TilingPlugin,
  TilingPluginPackage,
  manifest
};
//# sourceMappingURL=index.js.map