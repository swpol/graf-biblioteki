// ../core/dist/preact/index.js
import { createContext as b } from "preact";

// ../core/dist/jsxRuntime.module-Bzuv3cXw.js
import { options as i } from "preact";

// ../core/dist/preact/index.js
import { useState as a, useRef as m, useEffect as f, useContext as S } from "preact/hooks";

// ../core/dist/math-ChSRQF3r.js
var z = "\xAD";
var M = "\u200B";
var L = "\u2060";
var $ = "\uFEFF";
var F = "\uFFFE";
var N = "\uFFFF";
var k = Object.freeze([
  z,
  M,
  L,
  $,
  F,
  N
]);
new RegExp(`[${k.join("")}]`, "g");
var P = Object.freeze([
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
P.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _ = Object.freeze({
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
  _
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);

// ../core/dist/preact/index.js
var P2 = b({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function g() {
  const t2 = S(P2);
  if (t2 === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t2;
  if (e)
    return t2;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t2;
}
function h(t2) {
  const { registry: r } = g();
  if (r === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(t2);
  if (!e)
    throw new Error(`Plugin ${t2} not found`);
  return {
    plugin: e,
    isLoading: false,
    ready: e.ready()
  };
}
function L2(t2) {
  const { plugin: r, isLoading: e, ready: i2 } = h(t2);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: i2
    };
  if (!r.provides)
    throw new Error(`Plugin ${t2} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: i2
  };
}

// dist/index.js
var z2 = "\xAD";
var M2 = "\u200B";
var L3 = "\u2060";
var $2 = "\uFEFF";
var F2 = "\uFFFE";
var N2 = "\uFFFF";
var k2 = Object.freeze([
  z2,
  M2,
  L3,
  $2,
  F2,
  N2
]);
new RegExp(`[${k2.join("")}]`, "g");
var P3 = Object.freeze([
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
P3.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P3.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P3.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _2 = Object.freeze({
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
  _2
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);
var w2 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s, c) => {
      this.onStoreUpdated(c, s);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s, c) => {
      this.onCoreStoreUpdated(c, s);
    }), this.readyPromise = new Promise((i2) => {
      this.readyResolve = i2;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
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
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, e = 100) {
    const i2 = Date.now(), s = this.debouncedActions[t2.type] || 0;
    return i2 - s >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, e) {
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
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
var m2 = "\xAD";
var d = "\u200B";
var F22 = "\u2060";
var y2 = "\uFEFF";
var w3 = "\uFFFE";
var D = "\uFFFF";
var v2 = Object.freeze([
  m2,
  d,
  F22,
  y2,
  w3,
  D
]);
new RegExp(`[${v2.join("")}]`, "g");
var h2 = Object.freeze([
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
h2.reduce(
  (e, t2) => (e[t2.id] = t2, e),
  {}
);
h2.reduce((e, t2) => (e[t2.css] = t2.id, e), {});
h2.map((e) => ({
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
  (e, [t2, i2]) => (e[i2] = Number(t2), e),
  {}
);
var k22 = class {
  constructor(t2, i2) {
    if (this.id = t2, this.registry = i2, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s, n, a2) => {
      this.onStoreUpdated(a2, n);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s, n, a2) => {
      this.onCoreStoreUpdated(a2, n);
    }), this.readyPromise = new Promise((s) => {
      this.readyResolve = s;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
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
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, i2 = 100) {
    const s = Date.now(), n = this.debouncedActions[t2.type] || 0;
    return s - n >= i2 ? (this.debouncedActions[t2.type] = s, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, i2) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, i2) {
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
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
var u2 = /* @__PURE__ */ ((e) => (e[e.Degree0 = 0] = "Degree0", e[e.Degree90 = 1] = "Degree90", e[e.Degree180 = 2] = "Degree180", e[e.Degree270 = 3] = "Degree270", e))(u2 || {});
var N22 = "\xAD";
var O2 = "\u200B";
var L22 = "\u2060";
var x = "\uFEFF";
var R2 = "\uFFFE";
var z22 = "\uFFFF";
var j2 = Object.freeze([
  N22,
  O2,
  L22,
  x,
  R2,
  z22
]);
new RegExp(`[${j2.join("")}]`, "g");
var b2 = Object.freeze([
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
b2.reduce(
  (e, t2) => (e[t2.id] = t2, e),
  {}
);
b2.reduce((e, t2) => (e[t2.css] = t2.id, e), {});
b2.map((e) => ({
  value: e.id,
  label: e.label
}));
var I2 = Object.freeze({
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
  I2
).reduce(
  (e, [t2, i2]) => (e[i2] = Number(t2), e),
  {}
);
var g2 = class g3 extends k22 {
  constructor(t2, i2, s) {
    super(t2, i2), this.engine = s;
  }
  async initialize(t2) {
  }
  buildCapability() {
    return {
      renderPage: this.renderPage.bind(this),
      renderPageRect: this.renderPageRect.bind(this)
    };
  }
  renderPage({
    pageIndex: t2,
    scaleFactor: i2 = 1,
    dpr: s = 1,
    rotation: n = u2.Degree0,
    options: a2 = { withAnnotations: false },
    imageType: r = "image/webp"
  }) {
    const l2 = this.coreState.core;
    if (!l2.document)
      throw new Error("document does not open");
    const c = l2.document.pages.find((o) => o.index === t2);
    if (!c)
      throw new Error("page does not exist");
    return this.engine.renderPage(
      l2.document,
      c,
      i2,
      n,
      s,
      a2,
      r
    );
  }
  renderPageRect({
    pageIndex: t2,
    scaleFactor: i2 = 1,
    dpr: s = 1,
    rect: n,
    rotation: a2 = u2.Degree0,
    options: r = { withAnnotations: false },
    imageType: l2 = "image/webp"
  }) {
    const c = this.coreState.core;
    if (!c.document)
      throw new Error("document does not open");
    const o = c.document.pages.find((p2) => p2.index === t2);
    if (!o)
      throw new Error("page does not exist");
    return this.engine.renderPageRect(
      c.document,
      o,
      i2,
      a2,
      s,
      n,
      r,
      l2
    );
  }
};
g2.id = "render";
var S2 = g2;
var Rotation = /* @__PURE__ */ ((Rotation2) => {
  Rotation2[Rotation2["Degree0"] = 0] = "Degree0";
  Rotation2[Rotation2["Degree90"] = 1] = "Degree90";
  Rotation2[Rotation2["Degree180"] = 2] = "Degree180";
  Rotation2[Rotation2["Degree270"] = 3] = "Degree270";
  return Rotation2;
})(Rotation || {});
var PdfSoftHyphenMarker = "\xAD";
var PdfZeroWidthSpace = "\u200B";
var PdfWordJoiner = "\u2060";
var PdfBomOrZwnbsp = "\uFEFF";
var PdfNonCharacterFFFE = "\uFFFE";
var PdfNonCharacterFFFF = "\uFFFF";
var PdfUnwantedTextMarkers = Object.freeze([
  PdfSoftHyphenMarker,
  PdfZeroWidthSpace,
  PdfWordJoiner,
  PdfBomOrZwnbsp,
  PdfNonCharacterFFFE,
  PdfNonCharacterFFFF
]);
var PdfUnwantedTextRegex = new RegExp(`[${PdfUnwantedTextMarkers.join("")}]`, "g");
var MixedBlendMode = Symbol("mixed");
var BLEND_MODE_INFOS = Object.freeze([
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
var enumToInfo = BLEND_MODE_INFOS.reduce(
  (m3, info) => {
    m3[info.id] = info;
    return m3;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m3, info) => {
  m3[info.css] = info.id;
  return m3;
}, {});
var blendModeSelectOptions = BLEND_MODE_INFOS.map((info) => ({
  value: info.id,
  label: info.label
}));
var PdfAnnotationFlagName = Object.freeze({
  [
    1
    /* INVISIBLE */
  ]: "invisible",
  [
    2
    /* HIDDEN */
  ]: "hidden",
  [
    4
    /* PRINT */
  ]: "print",
  [
    8
    /* NO_ZOOM */
  ]: "noZoom",
  [
    16
    /* NO_ROTATE */
  ]: "noRotate",
  [
    32
    /* NO_VIEW */
  ]: "noView",
  [
    64
    /* READ_ONLY */
  ]: "readOnly",
  [
    128
    /* LOCKED */
  ]: "locked",
  [
    256
    /* TOGGLE_NOVIEW */
  ]: "toggleNoView"
});
var PdfAnnotationFlagValue = Object.entries(
  PdfAnnotationFlagName
).reduce(
  (acc, [bit, name]) => {
    acc[name] = Number(bit);
    return acc;
  },
  {}
);
var PrintPlugin = class extends w2 {
  constructor(id, registry, config) {
    super(id, registry);
    this.config = config;
    this.renderCapability = this.registry.getPlugin(S2.id)?.provides();
  }
  async initialize(_config) {
  }
  buildCapability() {
    return {
      preparePrint: this.preparePrint.bind(this),
      parsePageRange: this.parsePageRange.bind(this)
    };
  }
  async preparePrint(options, onProgress, onPageReady) {
    const coreState = this.coreState.core;
    if (!coreState.document) {
      throw new Error("No document loaded");
    }
    const pagesToPrint = this.getPagesToPrint(options, coreState.document.pages.length);
    const totalPages = pagesToPrint.length;
    const batchSize = this.config?.batchSize || 3;
    onProgress?.({
      current: 0,
      total: totalPages,
      status: "preparing",
      message: `Preparing to render ${totalPages} page${totalPages !== 1 ? "s" : ""}...`
    });
    const scaleFactor = this.getScaleFactor(options.quality);
    const dpr = 1;
    for (let batchStart = 0; batchStart < pagesToPrint.length; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize, pagesToPrint.length);
      const batch = pagesToPrint.slice(batchStart, batchEnd);
      const batchPromises = batch.map(async (pageIndex, batchIndex) => {
        const overallIndex = batchStart + batchIndex;
        onProgress?.({
          current: overallIndex,
          total: totalPages,
          status: "rendering",
          message: `Rendering page ${pageIndex + 1}...`
        });
        const blob = await this.renderPage(pageIndex, scaleFactor, dpr, options.includeAnnotations);
        onPageReady?.({
          pageIndex,
          blob
        });
        return;
      });
      await Promise.all(batchPromises);
    }
    onProgress?.({
      current: totalPages,
      total: totalPages,
      status: "complete",
      message: "All pages rendered successfully"
    });
  }
  async renderPage(pageIndex, scaleFactor, dpr, withAnnotations) {
    return new Promise((resolve, reject) => {
      const renderTask = this.renderCapability.renderPage({
        pageIndex,
        scaleFactor,
        dpr,
        rotation: Rotation.Degree0,
        options: {
          withAnnotations
        }
      });
      renderTask.wait(
        (blob) => resolve(blob),
        (error) => reject(
          new Error(
            `Failed to render page ${pageIndex + 1}: ${error.reason.message || "Unknown error"}`
          )
        )
      );
    });
  }
  getScaleFactor(quality) {
    switch (quality) {
      case "high":
        return 1.5;
      // Higher resolution for better print quality
      case "normal":
      default:
        return 1;
    }
  }
  getPagesToPrint(options, totalPages) {
    const { pageRange } = options;
    switch (pageRange.type) {
      case "current":
        return pageRange.currentPage !== void 0 ? [pageRange.currentPage] : [0];
      case "all":
        return Array.from({ length: totalPages }, (_22, i2) => i2);
      case "custom":
        if (!pageRange.pages) return [0];
        return pageRange.pages.filter((page) => page >= 0 && page < totalPages).sort((a2, b3) => a2 - b3);
      default:
        return [0];
    }
  }
  parsePageRange(rangeString) {
    try {
      const totalPages = this.coreState.core.document?.pages.length || 0;
      const pages = [];
      const parts = rangeString.split(",").map((s) => s.trim());
      for (const part of parts) {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map((s) => parseInt(s.trim()));
          if (isNaN(start) || isNaN(end)) {
            return { pages: [], isValid: false, error: `Invalid range: ${part}` };
          }
          if (start > end) {
            return { pages: [], isValid: false, error: `Invalid range: ${part} (start > end)` };
          }
          for (let i2 = start; i2 <= end; i2++) {
            if (i2 >= 1 && i2 <= totalPages) {
              pages.push(i2 - 1);
            }
          }
        } else {
          const pageNum = parseInt(part);
          if (isNaN(pageNum)) {
            return { pages: [], isValid: false, error: `Invalid page number: ${part}` };
          }
          if (pageNum >= 1 && pageNum <= totalPages) {
            pages.push(pageNum - 1);
          }
        }
      }
      const uniquePages = [...new Set(pages)].sort((a2, b3) => a2 - b3);
      return {
        pages: uniquePages,
        isValid: true
      };
    } catch (error) {
      return {
        pages: [],
        isValid: false,
        error: `Parsing error: ${error instanceof Error ? error.message : "Unknown error"}`
      };
    }
  }
};
PrintPlugin.id = "print";

// src/preact/hooks/use-print.ts
var usePrintPlugin = () => h(PrintPlugin.id);
var usePrintCapability = () => L2(PrintPlugin.id);

// src/preact/components/print.tsx
import { createContext, render } from "preact";
import { useContext, useRef, useEffect, useState } from "preact/hooks";
import { jsx, jsxs } from "preact/jsx-runtime";
var PrintContext = createContext(null);
var PrintPage = ({ pageResult }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const url = URL.createObjectURL(pageResult.blob);
    setImageUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [pageResult.blob]);
  const handleLoad = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        pageBreakAfter: "always",
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        background: "white",
        position: "relative"
      },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imageUrl,
          onLoad: handleLoad,
          alt: `Page ${pageResult.pageIndex + 1}`,
          style: {
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain"
          }
        }
      )
    }
  );
};
var PrintLayout = ({ pages }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.4",
        color: "#000",
        backgroundColor: "#fff"
      },
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        @media print {
          body { margin: 0; padding: 0; }
        }
      ` }),
        pages.map((pageResult) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PrintPage, { pageResult }) }, pageResult.pageIndex))
      ]
    }
  );
};
function PrintProvider({ children }) {
  const { provides: printCapability } = usePrintCapability();
  const iframeRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pages, setPages] = useState([]);
  const executePrint = async (options) => {
    if (!printCapability) {
      throw new Error("Print capability not available");
    }
    if (!iframeRef.current?.contentWindow) {
      throw new Error("Print iframe not ready");
    }
    setIsPrinting(true);
    setProgress(null);
    setPages([]);
    setIsReady(false);
    try {
      const collectedPages = [];
      await printCapability.preparePrint(
        options,
        // Progress callback
        (progressUpdate) => {
          setProgress(progressUpdate);
        },
        // Page ready callback
        (pageResult) => {
          collectedPages.push(pageResult);
          setPages([...collectedPages]);
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      const printWindow = iframeRef.current.contentWindow;
      printWindow.focus();
      printWindow.print();
      setProgress({
        current: progress?.total || 0,
        total: progress?.total || 0,
        status: "complete",
        message: "Print dialog opened"
      });
    } catch (error) {
      setProgress({
        current: 0,
        total: 0,
        status: "error",
        message: `Print failed: ${error instanceof Error ? error.message : "Unknown error"}`
      });
      throw error;
    } finally {
      setIsPrinting(false);
    }
  };
  useEffect(() => {
    const iframe = iframeRef.current;
    const mountNode = iframe?.contentWindow?.document?.body;
    if (mountNode && pages.length > 0) {
      render(/* @__PURE__ */ jsx(PrintLayout, { pages }), mountNode);
      setIsReady(true);
      return () => {
        if (mountNode) {
          render(null, mountNode);
        }
      };
    }
  }, [pages]);
  const contextValue = {
    parsePageRange: printCapability?.parsePageRange || (() => ({ pages: [], isValid: false })),
    executePrint,
    progress,
    isReady,
    isPrinting
  };
  return /* @__PURE__ */ jsxs(PrintContext.Provider, { value: contextValue, children: [
    children,
    /* @__PURE__ */ jsx(
      "iframe",
      {
        ref: iframeRef,
        style: {
          display: "none",
          width: "210mm",
          height: "297mm"
        },
        title: "Print Preview"
      }
    )
  ] });
}
function usePrintContext() {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error("usePrintContext must be used within a PrintProvider");
  }
  return context;
}

// src/preact/hooks/use-print-action.ts
var usePrintAction = () => {
  const { executePrint, progress, isReady, isPrinting, parsePageRange } = usePrintContext();
  return {
    executePrint,
    progress,
    isReady,
    isPrinting,
    parsePageRange
  };
};
export {
  PrintProvider,
  usePrintAction,
  usePrintCapability,
  usePrintContext,
  usePrintPlugin
};
//# sourceMappingURL=index.js.map