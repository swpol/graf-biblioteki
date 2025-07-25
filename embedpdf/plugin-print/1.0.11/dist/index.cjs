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
  PRINT_PLUGIN_ID: () => PRINT_PLUGIN_ID,
  PageRangeType: () => PageRangeType,
  PrintPlugin: () => PrintPlugin,
  PrintPluginPackage: () => PrintPluginPackage,
  PrintQuality: () => PrintQuality,
  manifest: () => manifest
});
module.exports = __toCommonJS(index_exports);

// src/lib/manifest.ts
var PRINT_PLUGIN_ID = "print";
var manifest = {
  id: PRINT_PLUGIN_ID,
  name: "Print Plugin",
  version: "1.0.0",
  provides: ["print"],
  requires: ["render"],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

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
  (i, e) => (i[e.id] = e, i),
  {}
);
P.reduce((i, e) => (i[e.css] = e.id, i), {});
P.map((i) => ({
  value: i.id,
  label: i.label
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
  (i, [e, t]) => (i[t] = Number(e), i),
  {}
);

// ../core/dist/index.js
var w2 = class {
  constructor(t, e) {
    if (this.id = t, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i, s, c) => {
      this.onStoreUpdated(c, s);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i, s, c) => {
      this.onCoreStoreUpdated(c, s);
    }), this.readyPromise = new Promise((i) => {
      this.readyResolve = i;
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
  debouncedDispatch(t, e = 100) {
    const i = Date.now(), s = this.debouncedActions[t.type] || 0;
    return i - s >= e ? (this.debouncedActions[t.type] = i, this.dispatch(t), true) : false;
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
  onStoreUpdated(t, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t, e) {
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
};

// ../plugin-render/dist/render-plugin-ErV8zPxc.js
var m2 = "\xAD";
var d = "\u200B";
var F2 = "\u2060";
var y2 = "\uFEFF";
var w3 = "\uFFFE";
var D = "\uFFFF";
var v2 = Object.freeze([
  m2,
  d,
  F2,
  y2,
  w3,
  D
]);
new RegExp(`[${v2.join("")}]`, "g");
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
var k2 = class {
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
    return s - n >= i ? (this.debouncedActions[t.type] = s, this.dispatch(t), true) : false;
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
};
var u2 = /* @__PURE__ */ ((e) => (e[e.Degree0 = 0] = "Degree0", e[e.Degree90 = 1] = "Degree90", e[e.Degree180 = 2] = "Degree180", e[e.Degree270 = 3] = "Degree270", e))(u2 || {});
var N2 = "\xAD";
var O2 = "\u200B";
var L2 = "\u2060";
var x = "\uFEFF";
var R2 = "\uFFFE";
var z2 = "\uFFFF";
var j2 = Object.freeze([
  N2,
  O2,
  L2,
  x,
  R2,
  z2
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
  (e, t) => (e[t.id] = t, e),
  {}
);
b2.reduce((e, t) => (e[t.css] = t.id, e), {});
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
  (e, [t, i]) => (e[i] = Number(t), e),
  {}
);
var g2 = class g3 extends k2 {
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
    rotation: n = u2.Degree0,
    options: a = { withAnnotations: false },
    imageType: r = "image/webp"
  }) {
    const l2 = this.coreState.core;
    if (!l2.document)
      throw new Error("document does not open");
    const c = l2.document.pages.find((o) => o.index === t);
    if (!c)
      throw new Error("page does not exist");
    return this.engine.renderPage(
      l2.document,
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
    rotation: a = u2.Degree0,
    options: r = { withAnnotations: false },
    imageType: l2 = "image/webp"
  }) {
    const c = this.coreState.core;
    if (!c.document)
      throw new Error("document does not open");
    const o = c.document.pages.find((p2) => p2.index === t);
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
      l2
    );
  }
};
g2.id = "render";
var S = g2;

// src/lib/types.ts
var PrintQuality = /* @__PURE__ */ ((PrintQuality2) => {
  PrintQuality2["Normal"] = "normal";
  PrintQuality2["High"] = "high";
  return PrintQuality2;
})(PrintQuality || {});
var PageRangeType = /* @__PURE__ */ ((PageRangeType2) => {
  PageRangeType2["Current"] = "current";
  PageRangeType2["All"] = "all";
  PageRangeType2["Custom"] = "custom";
  return PageRangeType2;
})(PageRangeType || {});

// ../models/dist/index.js
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

// src/lib/print-plugin.ts
var PrintPlugin = class extends w2 {
  constructor(id, registry, config) {
    super(id, registry);
    this.config = config;
    this.renderCapability = this.registry.getPlugin(S.id)?.provides();
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
      case "high" /* High */:
        return 1.5;
      // Higher resolution for better print quality
      case "normal" /* Normal */:
      default:
        return 1;
    }
  }
  getPagesToPrint(options, totalPages) {
    const { pageRange } = options;
    switch (pageRange.type) {
      case "current" /* Current */:
        return pageRange.currentPage !== void 0 ? [pageRange.currentPage] : [0];
      case "all" /* All */:
        return Array.from({ length: totalPages }, (_2, i) => i);
      case "custom" /* Custom */:
        if (!pageRange.pages) return [0];
        return pageRange.pages.filter((page) => page >= 0 && page < totalPages).sort((a, b3) => a - b3);
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
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) {
              pages.push(i - 1);
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
      const uniquePages = [...new Set(pages)].sort((a, b3) => a - b3);
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

// src/lib/index.ts
var PrintPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new PrintPlugin(PRINT_PLUGIN_ID, registry, config),
  reducer: () => {
  },
  initialState: {}
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PRINT_PLUGIN_ID,
  PageRangeType,
  PrintPlugin,
  PrintPluginPackage,
  PrintQuality,
  manifest
});
//# sourceMappingURL=index.cjs.map