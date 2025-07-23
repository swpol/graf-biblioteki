"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  VerticalZoomFocus: () => VerticalZoomFocus,
  ZOOM_PLUGIN_ID: () => ZOOM_PLUGIN_ID,
  ZoomMode: () => ZoomMode,
  ZoomPlugin: () => ZoomPlugin,
  ZoomPluginPackage: () => ZoomPluginPackage,
  initialState: () => initialState,
  manifest: () => manifest
});
module.exports = __toCommonJS(index_exports);

// src/lib/types.ts
var ZoomMode = /* @__PURE__ */ ((ZoomMode2) => {
  ZoomMode2["Automatic"] = "automatic";
  ZoomMode2["FitPage"] = "fit-page";
  ZoomMode2["FitWidth"] = "fit-width";
  return ZoomMode2;
})(ZoomMode || {});
var VerticalZoomFocus = /* @__PURE__ */ ((VerticalZoomFocus2) => {
  VerticalZoomFocus2[VerticalZoomFocus2["Center"] = 0] = "Center";
  VerticalZoomFocus2[VerticalZoomFocus2["Top"] = 1] = "Top";
  return VerticalZoomFocus2;
})(VerticalZoomFocus || {});

// src/lib/manifest.ts
var ZOOM_PLUGIN_ID = "zoom";
var manifest = {
  id: ZOOM_PLUGIN_ID,
  name: "Zoom Plugin",
  version: "1.0.0",
  provides: ["zoom"],
  requires: ["viewport", "scroll"],
  optional: ["interaction-manager"],
  defaultConfig: {
    enabled: true,
    defaultZoomLevel: "automatic" /* Automatic */,
    minZoom: 0.2,
    maxZoom: 60,
    zoomStep: 0.1,
    zoomRanges: [
      {
        min: 0.2,
        max: 0.5,
        step: 0.05
      },
      {
        min: 0.5,
        max: 1,
        step: 0.1
      },
      {
        min: 1,
        max: 2,
        step: 0.2
      },
      {
        min: 2,
        max: 4,
        step: 0.4
      },
      {
        min: 4,
        max: 10,
        step: 0.8
      },
      {
        min: 10,
        max: 20,
        step: 1.6
      },
      {
        min: 20,
        max: 40,
        step: 3.2
      },
      {
        min: 40,
        max: 60,
        step: 6.4
      }
    ],
    presets: [
      {
        name: "Fit Page",
        value: "fit-page" /* FitPage */
      },
      {
        name: "Fit Width",
        value: "fit-width" /* FitWidth */
      },
      {
        name: "Automatic",
        value: "automatic" /* Automatic */
      },
      {
        name: "25%",
        value: 0.25
      },
      {
        name: "50%",
        value: 0.5
      },
      {
        name: "100%",
        value: 1
      },
      {
        name: "125%",
        value: 1.25
      },
      {
        name: "150%",
        value: 1.5
      },
      {
        name: "200%",
        value: 2
      },
      {
        name: "400%",
        value: 4
      },
      {
        name: "800%",
        value: 8
      },
      {
        name: "1600%",
        value: 16
      }
    ]
  }
};

// src/lib/actions.ts
var SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
var SET_INITIAL_ZOOM_LEVEL = "SET_INITIAL_ZOOM_LEVEL";
function setZoomLevel(zoomLevel, currentZoomLevel) {
  return {
    type: SET_ZOOM_LEVEL,
    payload: { zoomLevel, currentZoomLevel }
  };
}
function setInitialZoomLevel(zoomLevel) {
  return {
    type: SET_INITIAL_ZOOM_LEVEL,
    payload: { zoomLevel }
  };
}

// src/lib/reducer.ts
var initialState = {
  zoomLevel: "automatic" /* Automatic */,
  currentZoomLevel: 1
};
var zoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ZOOM_LEVEL:
      return {
        ...state,
        zoomLevel: action.payload.zoomLevel,
        currentZoomLevel: action.payload.currentZoomLevel
      };
    case SET_INITIAL_ZOOM_LEVEL:
      return {
        ...state,
        zoomLevel: action.payload.zoomLevel
      };
    default:
      return state;
  }
};

// src/lib/zoom-plugin.ts
var import_core = require("@embedpdf/core");
var import_models = require("@embedpdf/models");
var ZoomPlugin = class extends import_core.BasePlugin {
  /* ------------------------------------------------------------------ */
  constructor(id, registry, cfg) {
    super(id, registry);
    /* ------------------------------------------------------------------ */
    /* internals                                                           */
    /* ------------------------------------------------------------------ */
    this.zoom$ = (0, import_core.createEmitter)();
    this.state$ = (0, import_core.createBehaviorEmitter)();
    this.viewportPlugin = registry.getPlugin("viewport");
    this.viewport = this.viewportPlugin.provides();
    this.scroll = registry.getPlugin("scroll").provides();
    const interactionManager = registry.getPlugin("interaction-manager");
    this.interactionManager = interactionManager?.provides() ?? null;
    this.minZoom = cfg.minZoom ?? 0.25;
    this.maxZoom = cfg.maxZoom ?? 10;
    this.zoomStep = cfg.zoomStep ?? 0.1;
    this.presets = cfg.presets ?? [];
    this.zoomRanges = this.normalizeRanges(cfg.zoomRanges ?? []);
    this.dispatch(setInitialZoomLevel(cfg.defaultZoomLevel));
    this.viewport.onViewportResize(() => this.recalcAuto(1 /* Top */), {
      mode: "debounce",
      wait: 150
    });
    this.coreStore.onAction(import_core.SET_ROTATION, () => this.recalcAuto(1 /* Top */));
    this.coreStore.onAction(import_core.SET_PAGES, () => this.recalcAuto(1 /* Top */));
    this.coreStore.onAction(import_core.SET_DOCUMENT, () => this.recalcAuto(1 /* Top */));
    this.interactionManager?.registerMode({
      id: "marqueeZoom",
      scope: "page",
      exclusive: true,
      cursor: "zoom-in"
    });
    this.resetReady();
  }
  /* ------------------------------------------------------------------ */
  /* capability                                                          */
  /* ------------------------------------------------------------------ */
  buildCapability() {
    return {
      onZoomChange: this.zoom$.on,
      onStateChange: this.state$.on,
      zoomIn: () => {
        const cur = this.state.currentZoomLevel;
        return this.handleRequest({ level: cur, delta: this.stepFor(cur) });
      },
      zoomOut: () => {
        const cur = this.state.currentZoomLevel;
        return this.handleRequest({ level: cur, delta: -this.stepFor(cur) });
      },
      zoomToArea: (pageIndex, rect) => this.handleZoomToArea(pageIndex, rect),
      requestZoom: (level, c) => this.handleRequest({ level, center: c }),
      requestZoomBy: (d, c) => {
        const cur = this.state.currentZoomLevel;
        const target = this.toZoom(cur + d);
        return this.handleRequest({ level: target, center: c });
      },
      enableMarqueeZoom: () => {
        this.interactionManager?.activate("marqueeZoom");
      },
      disableMarqueeZoom: () => {
        this.interactionManager?.activate("default");
      },
      toggleMarqueeZoom: () => {
        if (this.interactionManager?.getActiveMode() === "marqueeZoom") {
          this.interactionManager?.activate("default");
        } else {
          this.interactionManager?.activate("marqueeZoom");
        }
      },
      isMarqueeZoomActive: () => this.interactionManager?.getActiveMode() === "marqueeZoom",
      getState: () => this.state,
      getPresets: () => this.presets
    };
  }
  /* ------------------------------------------------------------------ */
  /* plugin life‑cycle                                                   */
  /* ------------------------------------------------------------------ */
  async initialize() {
  }
  async destroy() {
    this.zoom$.clear();
  }
  /**
   * Sort ranges once, make sure they are sane
   */
  normalizeRanges(ranges) {
    return [...ranges].filter((r) => r.step > 0 && r.max > r.min).sort((a, b) => a.min - b.min);
  }
  /** pick the step that applies to a given numeric zoom */
  stepFor(zoom) {
    const r = this.zoomRanges.find((r2) => zoom >= r2.min && zoom < r2.max);
    return r ? r.step : this.zoomStep;
  }
  /** clamp + round helper reused later */
  toZoom(v) {
    return parseFloat((0, import_core.clamp)(v, this.minZoom, this.maxZoom).toFixed(2));
  }
  /* ------------------------------------------------------------------ */
  /* main entry – handles **every** zoom request                          */
  /* ------------------------------------------------------------------ */
  handleRequest({
    level,
    delta = 0,
    center,
    focus = 0 /* Center */,
    align = "keep"
  }) {
    const metrics = this.viewport.getMetrics();
    const oldZoom = this.state.currentZoomLevel;
    if (metrics.clientWidth === 0 || metrics.clientHeight === 0) {
      return;
    }
    const base = typeof level === "number" ? level : this.computeZoomForMode(level, metrics);
    if (base === false) {
      return;
    }
    const exactZoom = (0, import_core.clamp)(base + delta, this.minZoom, this.maxZoom);
    const newZoom = Math.floor(exactZoom * 100) / 100;
    const focusPoint = center ?? {
      vx: metrics.clientWidth / 2,
      vy: focus === 1 /* Top */ ? 0 : metrics.clientHeight / 2
    };
    const { desiredScrollLeft, desiredScrollTop } = this.computeScrollForZoomChange(
      metrics,
      oldZoom,
      newZoom,
      focusPoint,
      align
    );
    if (!isNaN(desiredScrollLeft) && !isNaN(desiredScrollTop)) {
      this.viewportPlugin.setViewportScrollMetrics({
        scrollLeft: desiredScrollLeft,
        scrollTop: desiredScrollTop
      });
    }
    this.dispatch(setZoomLevel(typeof level === "number" ? newZoom : level, newZoom));
    this.dispatchCoreAction((0, import_core.setScale)(newZoom));
    this.markReady();
    this.viewport.scrollTo({
      x: desiredScrollLeft,
      y: desiredScrollTop,
      behavior: "instant"
    });
    const evt = {
      oldZoom,
      newZoom,
      level,
      center: focusPoint,
      desiredScrollLeft,
      desiredScrollTop,
      viewport: metrics
    };
    this.zoom$.emit(evt);
  }
  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */
  /** numeric zoom for Automatic / FitPage / FitWidth */
  computeZoomForMode(mode, vp) {
    const spreads = (0, import_core.getPagesWithRotatedSize)(this.coreState.core);
    if (!spreads.length) return false;
    const pgGap = this.scroll.getPageGap();
    const vpGap = this.viewport.getViewportGap();
    if (vp.clientWidth === 0 || vp.clientHeight === 0) {
      return false;
    }
    const availableWidth = vp.clientWidth - 2 * vpGap;
    const availableHeight = vp.clientHeight - 2 * vpGap;
    if (availableWidth <= 0 || availableHeight <= 0) {
      return false;
    }
    let maxContentW = 0, maxContentH = 0;
    spreads.forEach((spread) => {
      const contentW = spread.reduce((s, p, i) => s + p.rotatedSize.width + (i ? pgGap : 0), 0);
      const contentH = Math.max(...spread.map((p) => p.rotatedSize.height));
      maxContentW = Math.max(maxContentW, contentW);
      maxContentH = Math.max(maxContentH, contentH);
    });
    switch (mode) {
      case "fit-width" /* FitWidth */:
        return availableWidth / maxContentW;
      case "fit-page" /* FitPage */:
        return Math.min(availableWidth / maxContentW, availableHeight / maxContentH);
      case "automatic" /* Automatic */:
        return Math.min(availableWidth / maxContentW, 1);
      /* istanbul ignore next */
      default:
        return 1;
    }
  }
  /** where to scroll so that *focus* stays stable after scaling          */
  computeScrollForZoomChange(vp, oldZoom, newZoom, focus, align = "keep") {
    const layout = this.scroll.getLayout();
    const vpGap = this.viewport.getViewportGap();
    const contentW = layout.totalContentSize.width;
    const contentH = layout.totalContentSize.height;
    const availableWidth = vp.clientWidth - 2 * vpGap;
    const availableHeight = vp.clientHeight - 2 * vpGap;
    const off = (availableSpace, cw, zoom) => cw * zoom < availableSpace ? (availableSpace - cw * zoom) / 2 : 0;
    const offXold = off(availableWidth, contentW, oldZoom);
    const offYold = off(availableHeight, contentH, oldZoom);
    const offXnew = off(availableWidth, contentW, newZoom);
    const offYnew = off(availableHeight, contentH, newZoom);
    const cx = (vp.scrollLeft + focus.vx - vpGap - offXold) / oldZoom;
    const cy = (vp.scrollTop + focus.vy - vpGap - offYold) / oldZoom;
    const baseLeft = cx * newZoom + vpGap + offXnew;
    const baseTop = cy * newZoom + vpGap + offYnew;
    const desiredScrollLeft = align === "center" ? baseLeft - vp.clientWidth / 2 : baseLeft - focus.vx;
    const desiredScrollTop = align === "center" ? baseTop - vp.clientHeight / 2 : baseTop - focus.vy;
    return {
      desiredScrollLeft: Math.max(0, desiredScrollLeft),
      desiredScrollTop: Math.max(0, desiredScrollTop)
    };
  }
  handleZoomToArea(pageIndex, rect) {
    const rotation = this.coreState.core.rotation;
    const vp = this.viewport.getMetrics();
    const vpGap = this.viewport.getViewportGap();
    const oldZ = this.state.currentZoomLevel;
    const availableW = vp.clientWidth - 2 * vpGap;
    const availableH = vp.clientHeight - 2 * vpGap;
    const layout = this.scroll.getLayout();
    const vItem = layout.virtualItems.find(
      (it) => it.pageLayouts.some((p) => p.pageIndex === pageIndex)
    );
    if (!vItem) return;
    const pageRel = vItem.pageLayouts.find((p) => p.pageIndex === pageIndex);
    const rotatedRect = (0, import_models.rotateRect)(
      {
        width: pageRel.width,
        height: pageRel.height
      },
      rect,
      rotation
    );
    const targetZoom = this.toZoom(
      Math.min(availableW / rotatedRect.size.width, availableH / rotatedRect.size.height)
    );
    const pageAbsX = vItem.x + pageRel.x;
    const pageAbsY = vItem.y + pageRel.y;
    const cxContent = pageAbsX + rotatedRect.origin.x + rotatedRect.size.width / 2;
    const cyContent = pageAbsY + rotatedRect.origin.y + rotatedRect.size.height / 2;
    const off = (avail, cw, z) => cw * z < avail ? (avail - cw * z) / 2 : 0;
    const offXold = off(availableW, layout.totalContentSize.width, oldZ);
    const offYold = off(availableH, layout.totalContentSize.height, oldZ);
    const centerVX = vpGap + offXold + cxContent * oldZ - vp.scrollLeft;
    const centerVY = vpGap + offYold + cyContent * oldZ - vp.scrollTop;
    this.handleRequest({
      level: targetZoom,
      center: { vx: centerVX, vy: centerVY },
      align: "center"
    });
  }
  /** recalculates Automatic / Fit* when viewport or pages change */
  recalcAuto(focus) {
    const s = this.state;
    if (s.zoomLevel === "automatic" /* Automatic */ || s.zoomLevel === "fit-page" /* FitPage */ || s.zoomLevel === "fit-width" /* FitWidth */)
      this.handleRequest({ level: s.zoomLevel, focus });
  }
  onStoreUpdated(_prevState, newState) {
    this.state$.emit(newState);
  }
};
ZoomPlugin.id = "zoom";

// src/lib/index.ts
var ZoomPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new ZoomPlugin(ZOOM_PLUGIN_ID, registry, config),
  reducer: zoomReducer,
  initialState
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VerticalZoomFocus,
  ZOOM_PLUGIN_ID,
  ZoomMode,
  ZoomPlugin,
  ZoomPluginPackage,
  initialState,
  manifest
});
//# sourceMappingURL=index.cjs.map