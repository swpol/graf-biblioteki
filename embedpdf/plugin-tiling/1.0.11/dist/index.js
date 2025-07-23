import { BasePlugin as D, createBehaviorEmitter as q } from "@embedpdf/core";
import { transformSize as G, restoreRect as H, ignore as K } from "@embedpdf/models";
const C = "tiling", W = {
  id: C,
  name: "Tiling Plugin",
  version: "1.0.0",
  provides: ["tiling"],
  requires: ["render", "scroll", "viewport"],
  optional: [],
  defaultConfig: {
    enabled: !0,
    tileSize: 768,
    overlapPx: 2.5,
    extraRings: 0
  }
}, z = "UPDATE_VISIBLE_TILES", k = "MARK_TILE_STATUS", M = (t) => ({
  type: z,
  payload: t
}), P = (t, e, i) => ({ type: k, payload: { pageIndex: t, tileId: e, status: i } }), X = {
  visibleTiles: {}
}, Y = (t, e) => {
  var i, s;
  switch (e.type) {
    case z: {
      const a = e.payload, o = { ...t.visibleTiles };
      for (const h in a) {
        const r = Number(h), l = a[r], n = o[r] ?? [], u = (i = n.find((p) => !p.isFallback)) == null ? void 0 : i.srcScale, g = l[0].srcScale;
        if (u !== void 0 && u !== g) {
          const p = n.filter((d) => !d.isFallback && d.status === "ready").map((d) => ({ ...d, isFallback: !0 })), f = p.length > 0 ? [] : n.filter((d) => d.isFallback);
          o[r] = [...f, ...p, ...l];
        } else {
          const p = new Set(l.map((c) => c.id)), f = [], d = /* @__PURE__ */ new Set();
          for (const c of n)
            (c.isFallback || p.has(c.id)) && (f.push(c), d.add(c.id));
          for (const c of l)
            d.has(c.id) || f.push(c);
          o[r] = f;
        }
      }
      return { ...t, visibleTiles: o };
    }
    case k: {
      const { pageIndex: a, tileId: o, status: h } = e.payload, r = ((s = t.visibleTiles[a]) == null ? void 0 : s.map(
        (g) => g.id === o ? { ...g, status: h } : g
      )) ?? [], l = r.filter((g) => !g.isFallback), u = l.every((g) => g.status === "ready") ? l : r;
      return {
        ...t,
        visibleTiles: { ...t.visibleTiles, [a]: u }
      };
    }
    default:
      return t;
  }
};
function j({
  tileSize: t = 768,
  overlapPx: e = 2.5,
  extraRings: i = 0,
  scale: s,
  rotation: a,
  page: o,
  metric: h
}) {
  const r = o.size.width * s, l = o.size.height * s, n = t - e, u = G(o.size, a, s), g = {
    origin: { x: h.scaled.pageX, y: h.scaled.pageY },
    size: { width: h.scaled.visibleWidth, height: h.scaled.visibleHeight }
  }, b = H(u, g, a, 1), p = b.origin.x, f = b.origin.y, d = p + b.size.width, c = f + b.size.height, _ = Math.floor((r - 1) / n), E = Math.floor((l - 1) / n), F = Math.max(0, Math.floor(p / n) - i), L = Math.min(_, Math.floor((d - 1) / n) + i), V = Math.max(0, Math.floor(f / n) - i), $ = Math.min(E, Math.floor((c - 1) / n) + i), R = [];
  for (let y = F; y <= L; y++) {
    const T = y * n, m = Math.min(t, r - T), U = T / s, A = m / s;
    for (let v = V; v <= $; v++) {
      const S = v * n, w = Math.min(t, l - S), B = S / s, N = w / s;
      R.push({
        id: `p${o.index}-${s}-x${T}-y${S}-w${m}-h${w}`,
        col: y,
        row: v,
        pageRect: { origin: { x: U, y: B }, size: { width: A, height: N } },
        screenRect: {
          origin: { x: T, y: S },
          size: { width: m, height: w }
        },
        status: "queued",
        srcScale: s,
        isFallback: !1
      });
    }
  }
  return R;
}
const I = class I extends D {
  constructor(e, i, s) {
    super(e, i), this.tileRendering$ = q(), this.config = s, this.renderCapability = this.registry.getPlugin("render").provides(), this.scrollCapability = this.registry.getPlugin("scroll").provides(), this.viewportCapability = this.registry.getPlugin("viewport").provides(), this.scrollCapability.onScroll((a) => this.calculateVisibleTiles(a), {
      mode: "throttle",
      wait: 500,
      throttleMode: "trailing"
    });
  }
  async initialize() {
  }
  onCoreStoreUpdated(e, i) {
    e.core.scale !== i.core.scale && this.calculateVisibleTiles(
      this.scrollCapability.getMetrics(this.viewportCapability.getMetrics())
    );
  }
  calculateVisibleTiles(e) {
    var o;
    if (!this.config.enabled) {
      this.dispatch(M([]));
      return;
    }
    const i = this.coreState.core.scale, s = this.coreState.core.rotation, a = {};
    for (const h of e.pageVisibilityMetrics) {
      const r = h.pageNumber - 1, l = (o = this.coreState.core.document) == null ? void 0 : o.pages[r];
      if (!l) continue;
      const n = j({
        page: l,
        metric: h,
        scale: i,
        rotation: s,
        tileSize: this.config.tileSize,
        overlapPx: this.config.overlapPx,
        extraRings: this.config.extraRings
      });
      a[r] = n;
    }
    this.dispatch(M(a));
  }
  onStoreUpdated(e, i) {
    this.tileRendering$.emit(i.visibleTiles);
  }
  buildCapability() {
    return {
      renderTile: this.renderTile.bind(this),
      onTileRendering: this.tileRendering$.on
    };
  }
  renderTile(e) {
    if (!this.renderCapability)
      throw new Error("Render capability not available.");
    this.dispatch(P(e.pageIndex, e.tile.id, "rendering"));
    const i = this.renderCapability.renderPageRect({
      pageIndex: e.pageIndex,
      rect: e.tile.pageRect,
      scaleFactor: e.tile.srcScale,
      dpr: e.dpr
    });
    return i.wait(() => {
      this.dispatch(P(e.pageIndex, e.tile.id, "ready"));
    }, K), i;
  }
};
I.id = "tiling";
let x = I;
const Q = {
  manifest: W,
  create: (t, e, i) => new x(C, t, i),
  reducer: (t, e) => Y(t, e),
  initialState: X
};
export {
  C as TILING_PLUGIN_ID,
  x as TilingPlugin,
  Q as TilingPluginPackage,
  W as manifest
};
//# sourceMappingURL=index.js.map
