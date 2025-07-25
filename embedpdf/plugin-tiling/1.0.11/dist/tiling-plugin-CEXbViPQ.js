const X = "UPDATE_VISIBLE_TILES", Z = "MARK_TILE_STATUS", k = (t) => ({
  type: X,
  payload: t
}), M = (t, e, i) => ({ type: Z, payload: { pageIndex: t, tileId: e, status: i } });
var K = "­", q = "​", G = "⁠", J = "\uFEFF", Y = "￾", Q = "￿", P = Object.freeze([
  K,
  q,
  G,
  J,
  Y,
  Q
]);
new RegExp(`[${P.join("")}]`, "g");
var f = Object.freeze([
  { id: 0, label: "Normal", css: "normal" },
  { id: 1, label: "Multiply", css: "multiply" },
  { id: 2, label: "Screen", css: "screen" },
  { id: 3, label: "Overlay", css: "overlay" },
  { id: 4, label: "Darken", css: "darken" },
  { id: 5, label: "Lighten", css: "lighten" },
  { id: 6, label: "Color Dodge", css: "color-dodge" },
  { id: 7, label: "Color Burn", css: "color-burn" },
  { id: 8, label: "Hard Light", css: "hard-light" },
  { id: 9, label: "Soft Light", css: "soft-light" },
  { id: 10, label: "Difference", css: "difference" },
  { id: 11, label: "Exclusion", css: "exclusion" },
  { id: 12, label: "Hue", css: "hue" },
  { id: 13, label: "Saturation", css: "saturation" },
  { id: 14, label: "Color", css: "color" },
  { id: 15, label: "Luminosity", css: "luminosity" }
]);
f.reduce(
  (t, e) => (t[e.id] = e, t),
  {}
);
f.reduce((t, e) => (t[e.css] = e.id, t), {});
f.map((t) => ({
  value: t.id,
  label: t.label
}));
var E = Object.freeze({
  1: "invisible",
  2: "hidden",
  4: "print",
  8: "noZoom",
  16: "noRotate",
  32: "noView",
  64: "readOnly",
  128: "locked",
  256: "toggleNoView"
});
Object.entries(
  E
).reduce(
  (t, [e, i]) => (t[i] = Number(e), t),
  {}
);
function w(t, e, i) {
  if (t === e)
    return !0;
  if (t == null || e == null)
    return t === e;
  const s = typeof t;
  if (s !== typeof e) return !1;
  if (s === "object") {
    i || (i = /* @__PURE__ */ new Set());
    const n = tt(t, e);
    if (i.has(n))
      return !0;
    i.add(n);
    const a = Array.isArray(t), l = Array.isArray(e);
    return a && l ? it(t, e, i) : !a && !l ? st(t, e, i) : !1;
  }
  return !1;
}
function tt(t, e) {
  return `${z(t)}__${z(e)}`;
}
let et = 0;
const F = /* @__PURE__ */ new WeakMap();
function z(t) {
  return F.has(t) || F.set(t, ++et), F.get(t);
}
function it(t, e, i) {
  if (t.length !== e.length) return !1;
  const s = new Array(e.length).fill(!1);
  t: for (let n = 0; n < t.length; n++) {
    const a = t[n];
    for (let l = 0; l < e.length; l++)
      if (!s[l] && w(a, e[l], i)) {
        s[l] = !0;
        continue t;
      }
    return !1;
  }
  return !0;
}
function st(t, e, i) {
  const s = Object.keys(t).sort(), n = Object.keys(e).sort();
  if (s.length !== n.length) return !1;
  for (let a = 0; a < s.length; a++)
    if (s[a] !== n[a]) return !1;
  for (const a of s) {
    const l = t[a], o = e[a];
    if (!w(l, o, i))
      return !1;
  }
  return !0;
}
class nt {
  constructor(e, i) {
    if (this.id = e, this.registry = i, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, e !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${e} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s, n, a) => {
      this.onStoreUpdated(a, n);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s, n, a) => {
      this.onCoreStoreUpdated(a, n);
    }), this.readyPromise = new Promise((s) => {
      this.readyResolve = s;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const e = this.buildCapability();
      this._capability = Object.freeze(e);
    }
    return this._capability;
  }
  /**
   *  Get a copy of the current state
   */
  get state() {
    return this.pluginStore.getState();
  }
  /**
   *  Get a copy of the current core state
   */
  get coreState() {
    return this.coreStore.getState();
  }
  /**
   * @deprecated  use `this.state` Get a copy of the current state
   */
  getState() {
    return this.pluginStore.getState();
  }
  /**
   * @deprecated  use `this.coreState` Get a copy of the current core state
   */
  getCoreState() {
    return this.coreStore.getState();
  }
  /**
   * Core Dispatch
   */
  dispatchCoreAction(e) {
    return this.coreStore.dispatchToCore(e);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(e) {
    return this.coreStore.dispatch(e);
  }
  /**
   * Dispatch an action
   */
  dispatch(e) {
    return this.pluginStore.dispatch(e);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(e, i = 100) {
    const s = Date.now(), n = this.debouncedActions[e.type] || 0;
    return s - n >= i ? (this.debouncedActions[e.type] = s, this.dispatch(e), !0) : !1;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(e) {
    return this.pluginStore.subscribeToState(e);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(e) {
    return this.coreStore.subscribe(e);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(e, i) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(e, i) {
  }
  /**
   * Cleanup method to be called when plugin is being destroyed
   */
  destroy() {
    this.unsubscribeFromState && (this.unsubscribeFromState(), this.unsubscribeFromState = null), this.unsubscribeFromCoreStore && (this.unsubscribeFromCoreStore(), this.unsubscribeFromCoreStore = null);
  }
  /**
   * Returns a promise that resolves when the plugin is ready
   */
  ready() {
    return this.readyPromise;
  }
  /**
   * Mark the plugin as ready
   */
  markReady() {
    this.readyResolve();
  }
  /**
   * Reset the ready state (useful for plugins that need to reinitialize)
   */
  resetReady() {
    this.readyPromise = new Promise((e) => {
      this.readyResolve = e;
    });
  }
}
class at {
  constructor(e, i) {
    this.handler = e, this.options = i, this.lastRun = 0, this.handle = (s) => {
      this.options.mode === "debounce" ? this.debounce(s) : this.throttle(s);
    };
  }
  debounce(e) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(e), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(e) {
    if (this.options.mode === "debounce") return;
    const i = Date.now(), s = this.options.throttleMode || "leading-trailing";
    i - this.lastRun >= this.options.wait && (s === "leading-trailing" && this.handler(e), this.lastRun = i), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(e), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (i - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
}
function ot(t, e = w) {
  const i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  let n = t;
  const a = (o) => i.forEach((r) => r(o)), l = (o, r) => {
    let c = o, d = () => {
    };
    if (r) {
      const h = new at(o, r);
      c = h.handle, d = () => h.destroy(), s.set(o, { wrapped: c, destroy: d });
    }
    return n !== void 0 && c(n), i.add(c), () => {
      i.delete(c), d(), s.delete(o);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return n;
    },
    emit(o = void 0) {
      (n === void 0 || !e(n, o)) && (n = o, a(o));
    },
    on: l,
    off(o) {
      const r = s.get(o);
      r ? (i.delete(r.wrapped), r.destroy(), s.delete(o)) : i.delete(o);
    },
    clear() {
      i.clear(), s.forEach((o) => o.destroy()), s.clear();
    },
    /* derived hook --------------------------------------------- */
    select(o, r = w) {
      return (c, d) => {
        let h;
        if (n !== void 0) {
          const u = o(n);
          h = u, c(u);
        }
        return l(
          (u) => {
            const g = o(u);
            (h === void 0 || !r(h, g)) && (h = g, c(g));
          },
          d
        );
      };
    }
  };
}
function R(t) {
  const { width: e, height: i } = t;
  return {
    width: i,
    height: e
  };
}
function lt(t, e, i) {
  return t = e % 2 === 0 ? t : R(t), {
    width: t.width * i,
    height: t.height * i
  };
}
function ct(t, e, i) {
  let s = e.origin.x, n = e.origin.y, a = e.size;
  switch (i) {
    case 0:
      break;
    case 1:
      s = t.height - e.origin.y - e.size.height, n = e.origin.x, a = R(e.size);
      break;
    case 2:
      s = t.width - e.origin.x - e.size.width, n = t.height - e.origin.y - e.size.height;
      break;
    case 3:
      s = e.origin.y, n = t.width - e.origin.x - e.size.width, a = R(e.size);
      break;
  }
  return {
    origin: {
      x: s,
      y: n
    },
    size: {
      width: a.width,
      height: a.height
    }
  };
}
function rt(t, e) {
  return {
    origin: {
      x: t.origin.x * e,
      y: t.origin.y * e
    },
    size: {
      width: t.size.width * e,
      height: t.size.height * e
    }
  };
}
function ht(t, e, i, s) {
  return rt(ct(t, e, (4 - i) % 4), 1 / s);
}
var ut = "­", dt = "​", gt = "⁠", bt = "\uFEFF", pt = "￾", St = "￿", yt = Object.freeze([
  ut,
  dt,
  gt,
  bt,
  pt,
  St
]);
new RegExp(`[${yt.join("")}]`, "g");
var x = Object.freeze([
  { id: 0, label: "Normal", css: "normal" },
  { id: 1, label: "Multiply", css: "multiply" },
  { id: 2, label: "Screen", css: "screen" },
  { id: 3, label: "Overlay", css: "overlay" },
  { id: 4, label: "Darken", css: "darken" },
  { id: 5, label: "Lighten", css: "lighten" },
  { id: 6, label: "Color Dodge", css: "color-dodge" },
  { id: 7, label: "Color Burn", css: "color-burn" },
  { id: 8, label: "Hard Light", css: "hard-light" },
  { id: 9, label: "Soft Light", css: "soft-light" },
  { id: 10, label: "Difference", css: "difference" },
  { id: 11, label: "Exclusion", css: "exclusion" },
  { id: 12, label: "Hue", css: "hue" },
  { id: 13, label: "Saturation", css: "saturation" },
  { id: 14, label: "Color", css: "color" },
  { id: 15, label: "Luminosity", css: "luminosity" }
]);
x.reduce(
  (t, e) => (t[e.id] = e, t),
  {}
);
x.reduce((t, e) => (t[e.css] = e.id, t), {});
x.map((t) => ({
  value: t.id,
  label: t.label
}));
var wt = Object.freeze({
  1: "invisible",
  2: "hidden",
  4: "print",
  8: "noZoom",
  16: "noRotate",
  32: "noView",
  64: "readOnly",
  128: "locked",
  256: "toggleNoView"
});
Object.entries(
  wt
).reduce(
  (t, [e, i]) => (t[i] = Number(e), t),
  {}
);
var mt = /* @__PURE__ */ ((t) => (t[t.Ok = 0] = "Ok", t[t.Unknown = 1] = "Unknown", t[t.NotFound = 2] = "NotFound", t[t.WrongFormat = 3] = "WrongFormat", t[t.Password = 4] = "Password", t[t.Security = 5] = "Security", t[t.PageError = 6] = "PageError", t[t.XFALoad = 7] = "XFALoad", t[t.XFALayout = 8] = "XFALayout", t[t.Cancelled = 9] = "Cancelled", t[t.Initialization = 10] = "Initialization", t[t.NotReady = 11] = "NotReady", t[t.NotSupport = 12] = "NotSupport", t[t.LoadDoc = 13] = "LoadDoc", t[t.DocNotOpen = 14] = "DocNotOpen", t[t.CantCloseDoc = 15] = "CantCloseDoc", t[t.CantCreateNewDoc = 16] = "CantCreateNewDoc", t[t.CantImportPages = 17] = "CantImportPages", t[t.CantCreateAnnot = 18] = "CantCreateAnnot", t[t.CantSetAnnotRect = 19] = "CantSetAnnotRect", t[t.CantSetAnnotContent = 20] = "CantSetAnnotContent", t[t.CantRemoveInkList = 21] = "CantRemoveInkList", t[t.CantAddInkStoke = 22] = "CantAddInkStoke", t[t.CantReadAttachmentSize = 23] = "CantReadAttachmentSize", t[t.CantReadAttachmentContent = 24] = "CantReadAttachmentContent", t[t.CantFocusAnnot = 25] = "CantFocusAnnot", t[t.CantSelectText = 26] = "CantSelectText", t[t.CantSelectOption = 27] = "CantSelectOption", t[t.CantCheckField = 28] = "CantCheckField", t))(mt || {});
function vt() {
}
function Ft({
  tileSize: t = 768,
  overlapPx: e = 2.5,
  extraRings: i = 0,
  scale: s,
  rotation: n,
  page: a,
  metric: l
}) {
  const o = a.size.width * s, r = a.size.height * s, c = t - e, d = lt(a.size, n, s), h = {
    origin: { x: l.scaled.pageX, y: l.scaled.pageY },
    size: { width: l.scaled.visibleWidth, height: l.scaled.visibleHeight }
  }, u = ht(d, h, n, 1), g = u.origin.x, T = u.origin.y, D = g + u.size.width, O = T + u.size.height, N = Math.floor((o - 1) / c), C = Math.floor((r - 1) / c), _ = Math.max(0, Math.floor(g / c) - i), $ = Math.min(N, Math.floor((D - 1) / c) + i), U = Math.max(0, Math.floor(T / c) - i), j = Math.min(C, Math.floor((O - 1) / c) + i), I = [];
  for (let b = _; b <= $; b++) {
    const p = b * c, m = Math.min(t, o - p), V = p / s, B = m / s;
    for (let S = U; S <= j; S++) {
      const y = S * c, v = Math.min(t, r - y), H = y / s, W = v / s;
      I.push({
        id: `p${a.index}-${s}-x${p}-y${y}-w${m}-h${v}`,
        col: b,
        row: S,
        pageRect: { origin: { x: V, y: H }, size: { width: B, height: W } },
        screenRect: {
          origin: { x: p, y },
          size: { width: m, height: v }
        },
        status: "queued",
        srcScale: s,
        isFallback: !1
      });
    }
  }
  return I;
}
const A = class A extends nt {
  constructor(e, i, s) {
    super(e, i), this.tileRendering$ = ot(), this.config = s, this.renderCapability = this.registry.getPlugin("render").provides(), this.scrollCapability = this.registry.getPlugin("scroll").provides(), this.viewportCapability = this.registry.getPlugin("viewport").provides(), this.scrollCapability.onScroll((n) => this.calculateVisibleTiles(n), {
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
    var a;
    if (!this.config.enabled) {
      this.dispatch(k([]));
      return;
    }
    const i = this.coreState.core.scale, s = this.coreState.core.rotation, n = {};
    for (const l of e.pageVisibilityMetrics) {
      const o = l.pageNumber - 1, r = (a = this.coreState.core.document) == null ? void 0 : a.pages[o];
      if (!r) continue;
      const c = Ft({
        page: r,
        metric: l,
        scale: i,
        rotation: s,
        tileSize: this.config.tileSize,
        overlapPx: this.config.overlapPx,
        extraRings: this.config.extraRings
      });
      n[o] = c;
    }
    this.dispatch(k(n));
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
    this.dispatch(M(e.pageIndex, e.tile.id, "rendering"));
    const i = this.renderCapability.renderPageRect({
      pageIndex: e.pageIndex,
      rect: e.tile.pageRect,
      scaleFactor: e.tile.srcScale,
      dpr: e.dpr
    });
    return i.wait(() => {
      this.dispatch(M(e.pageIndex, e.tile.id, "ready"));
    }, vt), i;
  }
};
A.id = "tiling";
let L = A;
export {
  Z as M,
  mt as P,
  L as T,
  X as U,
  vt as i
};
//# sourceMappingURL=tiling-plugin-CEXbViPQ.js.map
