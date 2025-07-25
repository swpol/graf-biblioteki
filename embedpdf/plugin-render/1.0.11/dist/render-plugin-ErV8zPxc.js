var m = "­", d = "​", F = "⁠", y = "\uFEFF", w = "￾", D = "￿", v = Object.freeze([
  m,
  d,
  F,
  y,
  w,
  D
]);
new RegExp(`[${v.join("")}]`, "g");
var h = Object.freeze([
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
h.reduce(
  (e, t) => (e[t.id] = t, e),
  {}
);
h.reduce((e, t) => (e[t.css] = t.id, e), {});
h.map((e) => ({
  value: e.id,
  label: e.label
}));
var A = Object.freeze({
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
  A
).reduce(
  (e, [t, i]) => (e[i] = Number(t), e),
  {}
);
class k {
  constructor(t, i) {
    if (this.id = t, this.registry = i, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
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
      const t = this.buildCapability();
      this._capability = Object.freeze(t);
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
  dispatchCoreAction(t) {
    return this.coreStore.dispatchToCore(t);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t) {
    return this.coreStore.dispatch(t);
  }
  /**
   * Dispatch an action
   */
  dispatch(t) {
    return this.pluginStore.dispatch(t);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t, i = 100) {
    const s = Date.now(), n = this.debouncedActions[t.type] || 0;
    return s - n >= i ? (this.debouncedActions[t.type] = s, this.dispatch(t), !0) : !1;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t) {
    return this.pluginStore.subscribeToState(t);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t) {
    return this.coreStore.subscribe(t);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t, i) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t, i) {
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
    this.readyPromise = new Promise((t) => {
      this.readyResolve = t;
    });
  }
}
var u = /* @__PURE__ */ ((e) => (e[e.Degree0 = 0] = "Degree0", e[e.Degree90 = 1] = "Degree90", e[e.Degree180 = 2] = "Degree180", e[e.Degree270 = 3] = "Degree270", e))(u || {}), N = "­", O = "​", L = "⁠", x = "\uFEFF", R = "￾", z = "￿", j = Object.freeze([
  N,
  O,
  L,
  x,
  R,
  z
]);
new RegExp(`[${j.join("")}]`, "g");
var b = Object.freeze([
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
b.reduce(
  (e, t) => (e[t.id] = t, e),
  {}
);
b.reduce((e, t) => (e[t.css] = t.id, e), {});
b.map((e) => ({
  value: e.id,
  label: e.label
}));
var I = Object.freeze({
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
  I
).reduce(
  (e, [t, i]) => (e[i] = Number(t), e),
  {}
);
var T = /* @__PURE__ */ ((e) => (e[e.Ok = 0] = "Ok", e[e.Unknown = 1] = "Unknown", e[e.NotFound = 2] = "NotFound", e[e.WrongFormat = 3] = "WrongFormat", e[e.Password = 4] = "Password", e[e.Security = 5] = "Security", e[e.PageError = 6] = "PageError", e[e.XFALoad = 7] = "XFALoad", e[e.XFALayout = 8] = "XFALayout", e[e.Cancelled = 9] = "Cancelled", e[e.Initialization = 10] = "Initialization", e[e.NotReady = 11] = "NotReady", e[e.NotSupport = 12] = "NotSupport", e[e.LoadDoc = 13] = "LoadDoc", e[e.DocNotOpen = 14] = "DocNotOpen", e[e.CantCloseDoc = 15] = "CantCloseDoc", e[e.CantCreateNewDoc = 16] = "CantCreateNewDoc", e[e.CantImportPages = 17] = "CantImportPages", e[e.CantCreateAnnot = 18] = "CantCreateAnnot", e[e.CantSetAnnotRect = 19] = "CantSetAnnotRect", e[e.CantSetAnnotContent = 20] = "CantSetAnnotContent", e[e.CantRemoveInkList = 21] = "CantRemoveInkList", e[e.CantAddInkStoke = 22] = "CantAddInkStoke", e[e.CantReadAttachmentSize = 23] = "CantReadAttachmentSize", e[e.CantReadAttachmentContent = 24] = "CantReadAttachmentContent", e[e.CantFocusAnnot = 25] = "CantFocusAnnot", e[e.CantSelectText = 26] = "CantSelectText", e[e.CantSelectOption = 27] = "CantSelectOption", e[e.CantCheckField = 28] = "CantCheckField", e))(T || {});
function U() {
}
const g = class g extends k {
  constructor(t, i, s) {
    super(t, i), this.engine = s;
  }
  async initialize(t) {
  }
  buildCapability() {
    return {
      renderPage: this.renderPage.bind(this),
      renderPageRect: this.renderPageRect.bind(this)
    };
  }
  renderPage({
    pageIndex: t,
    scaleFactor: i = 1,
    dpr: s = 1,
    rotation: n = u.Degree0,
    options: a = { withAnnotations: !1 },
    imageType: r = "image/webp"
  }) {
    const l = this.coreState.core;
    if (!l.document)
      throw new Error("document does not open");
    const c = l.document.pages.find((o) => o.index === t);
    if (!c)
      throw new Error("page does not exist");
    return this.engine.renderPage(
      l.document,
      c,
      i,
      n,
      s,
      a,
      r
    );
  }
  renderPageRect({
    pageIndex: t,
    scaleFactor: i = 1,
    dpr: s = 1,
    rect: n,
    rotation: a = u.Degree0,
    options: r = { withAnnotations: !1 },
    imageType: l = "image/webp"
  }) {
    const c = this.coreState.core;
    if (!c.document)
      throw new Error("document does not open");
    const o = c.document.pages.find((p) => p.index === t);
    if (!o)
      throw new Error("page does not exist");
    return this.engine.renderPageRect(
      c.document,
      o,
      i,
      a,
      s,
      n,
      r,
      l
    );
  }
};
g.id = "render";
let S = g;
export {
  T as P,
  S as R,
  U as i
};
//# sourceMappingURL=render-plugin-ErV8zPxc.js.map
