"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/preact/index.ts
var preact_exports = {};
__export(preact_exports, {
  MarqueeZoom: () => MarqueeZoom,
  PinchWrapper: () => PinchWrapper,
  usePinch: () => usePinch,
  useZoom: () => useZoom,
  useZoomCapability: () => useZoomCapability,
  useZoomPlugin: () => useZoomPlugin
});
module.exports = __toCommonJS(preact_exports);

// ../core/dist/preact/index.js
var import_preact2 = require("preact");

// ../core/dist/jsxRuntime.module-Bzuv3cXw.js
var import_preact = require("preact");

// ../core/dist/preact/index.js
var import_hooks = require("preact/hooks");

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
var P2 = (0, import_preact2.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function g() {
  const t2 = (0, import_hooks.useContext)(P2);
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
var initialState = {
  zoomLevel: "automatic",
  currentZoomLevel: 1
};
var f2 = "SET_DOCUMENT";
var y = "SET_SCALE";
var w = "SET_ROTATION";
var E = "SET_PAGES";
var J = (i2) => ({ type: y, payload: i2 });
function T(i2) {
  const { width: e, height: t2 } = i2;
  return {
    width: t2,
    height: e
  };
}
function X(i2, e, t2) {
  return i2 = e % 2 === 0 ? i2 : T(i2), {
    width: i2.width * t2,
    height: i2.height * t2
  };
}
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
function te(i2, e, t2) {
  return i2 < e ? e : i2 > t2 ? t2 : i2;
}
function v2(i2, e, t2) {
  if (i2 === e)
    return true;
  if (i2 == null || e == null)
    return i2 === e;
  const r = typeof i2;
  if (r !== typeof e) return false;
  if (r === "object") {
    t2 || (t2 = /* @__PURE__ */ new Set());
    const n = x(i2, e);
    if (t2.has(n))
      return true;
    t2.add(n);
    const a4 = Array.isArray(i2), o = Array.isArray(e);
    return a4 && o ? U(i2, e, t2) : !a4 && !o ? B(i2, e, t2) : false;
  }
  return false;
}
function x(i2, e) {
  return `${S2(i2)}__${S2(e)}`;
}
var G = 0;
var d = /* @__PURE__ */ new WeakMap();
function S2(i2) {
  return d.has(i2) || d.set(i2, ++G), d.get(i2);
}
function U(i2, e, t2) {
  if (i2.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s2 = 0; s2 < i2.length; s2++) {
    const n = i2[s2];
    for (let a4 = 0; a4 < e.length; a4++)
      if (!r[a4] && v2(n, e[a4], t2)) {
        r[a4] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i2, e, t2) {
  const r = Object.keys(i2).sort(), s2 = Object.keys(e).sort();
  if (r.length !== s2.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s2[n]) return false;
  for (const n of r) {
    const a4 = i2[n], o = e[n];
    if (!v2(a4, o, t2))
      return false;
  }
  return true;
}
var f22 = (o) => o.pages.map(
  (t2) => t2.map((e) => ({
    ...e,
    rotatedSize: X(e.size, o.rotation, 1)
  }))
);
var w2 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s2, c) => {
      this.onStoreUpdated(c, s2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s2, c) => {
      this.onCoreStoreUpdated(c, s2);
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
    const i2 = Date.now(), s2 = this.debouncedActions[t2.type] || 0;
    return i2 - s2 >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
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
var b2 = class {
  constructor(t2, e) {
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (i2) => {
      this.options.mode === "debounce" ? this.debounce(i2) : this.throttle(i2);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), i2 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (i2 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (e - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function E2() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => o.forEach((i2) => i2(e)),
    on: (e) => (o.add(e), () => o.delete(e)),
    off: (e) => o.delete(e),
    clear: () => o.clear()
  };
}
function C(o, t2 = v2) {
  const e = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Map();
  let s2 = o;
  const c = (r) => e.forEach((n) => n(r)), p2 = (r, n) => {
    let a4 = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a4 = u2.handle, d2 = () => u2.destroy(), i2.set(r, { wrapped: a4, destroy: d2 });
    }
    return s2 !== void 0 && a4(s2), e.add(a4), () => {
      e.delete(a4), d2(), i2.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s2;
    },
    emit(r = void 0) {
      (s2 === void 0 || !t2(s2, r)) && (s2 = r, c(r));
    },
    on: p2,
    off(r) {
      const n = i2.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i2.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i2.forEach((r) => r.destroy()), i2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = v2) {
      return (a4, d2) => {
        let u2;
        if (s2 !== void 0) {
          const h2 = r(s2);
          u2 = h2, a4(h2);
        }
        return p2(
          (h2) => {
            const l2 = r(h2);
            (u2 === void 0 || !n(u2, l2)) && (u2 = l2, a4(l2));
          },
          d2
        );
      };
    }
  };
}
function swap(size) {
  const { width, height } = size;
  return {
    width: height,
    height: width
  };
}
function rotateRect(containerSize, rect, rotation) {
  let x22 = rect.origin.x;
  let y22 = rect.origin.y;
  let size = rect.size;
  switch (rotation) {
    case 0:
      break;
    case 1:
      x22 = containerSize.height - rect.origin.y - rect.size.height;
      y22 = rect.origin.x;
      size = swap(rect.size);
      break;
    case 2:
      x22 = containerSize.width - rect.origin.x - rect.size.width;
      y22 = containerSize.height - rect.origin.y - rect.size.height;
      break;
    case 3:
      x22 = rect.origin.y;
      y22 = containerSize.width - rect.origin.x - rect.size.width;
      size = swap(rect.size);
      break;
  }
  return {
    origin: {
      x: x22,
      y: y22
    },
    size: {
      width: size.width,
      height: size.height
    }
  };
}
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
  (m22, info) => {
    m22[info.id] = info;
    return m22;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m22, info) => {
  m22[info.css] = info.id;
  return m22;
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
var ZoomPlugin = class extends w2 {
  /* ------------------------------------------------------------------ */
  constructor(id, registry, cfg) {
    super(id, registry);
    this.zoom$ = E2();
    this.state$ = C();
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
    this.viewport.onViewportResize(() => this.recalcAuto(
      1
      /* Top */
    ), {
      mode: "debounce",
      wait: 150
    });
    this.coreStore.onAction(w, () => this.recalcAuto(
      1
      /* Top */
    ));
    this.coreStore.onAction(E, () => this.recalcAuto(
      1
      /* Top */
    ));
    this.coreStore.onAction(f2, () => this.recalcAuto(
      1
      /* Top */
    ));
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
      requestZoomBy: (d2, c) => {
        const cur = this.state.currentZoomLevel;
        const target = this.toZoom(cur + d2);
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
    return [...ranges].filter((r) => r.step > 0 && r.max > r.min).sort((a4, b32) => a4.min - b32.min);
  }
  /** pick the step that applies to a given numeric zoom */
  stepFor(zoom) {
    const r = this.zoomRanges.find((r2) => zoom >= r2.min && zoom < r2.max);
    return r ? r.step : this.zoomStep;
  }
  /** clamp + round helper reused later */
  toZoom(v22) {
    return parseFloat(te(v22, this.minZoom, this.maxZoom).toFixed(2));
  }
  /* ------------------------------------------------------------------ */
  /* main entry – handles **every** zoom request                          */
  /* ------------------------------------------------------------------ */
  handleRequest({
    level,
    delta = 0,
    center,
    focus = 0,
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
    const exactZoom = te(base + delta, this.minZoom, this.maxZoom);
    const newZoom = Math.floor(exactZoom * 100) / 100;
    const focusPoint = center ?? {
      vx: metrics.clientWidth / 2,
      vy: focus === 1 ? 0 : metrics.clientHeight / 2
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
    this.dispatchCoreAction(J(newZoom));
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
    const spreads = f22(this.coreState.core);
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
      const contentW = spread.reduce((s2, p2, i2) => s2 + p2.rotatedSize.width + (i2 ? pgGap : 0), 0);
      const contentH = Math.max(...spread.map((p2) => p2.rotatedSize.height));
      maxContentW = Math.max(maxContentW, contentW);
      maxContentH = Math.max(maxContentH, contentH);
    });
    switch (mode) {
      case "fit-width":
        return availableWidth / maxContentW;
      case "fit-page":
        return Math.min(availableWidth / maxContentW, availableHeight / maxContentH);
      case "automatic":
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
      (it) => it.pageLayouts.some((p2) => p2.pageIndex === pageIndex)
    );
    if (!vItem) return;
    const pageRel = vItem.pageLayouts.find((p2) => p2.pageIndex === pageIndex);
    const rotatedRect = rotateRect(
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
    const off = (avail, cw, z22) => cw * z22 < avail ? (avail - cw * z22) / 2 : 0;
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
    const s2 = this.state;
    if (s2.zoomLevel === "automatic" || s2.zoomLevel === "fit-page" || s2.zoomLevel === "fit-width")
      this.handleRequest({ level: s2.zoomLevel, focus });
  }
  onStoreUpdated(_prevState, newState) {
    this.state$.emit(newState);
  }
};
ZoomPlugin.id = "zoom";

// src/preact/hooks/use-zoom.ts
var import_hooks2 = require("preact/hooks");
var useZoomCapability = () => L2(ZoomPlugin.id);
var useZoomPlugin = () => h(ZoomPlugin.id);
var useZoom = () => {
  const { provides } = useZoomCapability();
  const [state, setState] = (0, import_hooks2.useState)(initialState);
  (0, import_hooks2.useEffect)(() => {
    return provides?.onStateChange((action) => {
      setState(action);
    });
  }, [provides]);
  return {
    state,
    provides
  };
};

// src/preact/hooks/use-pinch-zoom.ts
var import_hooks3 = require("preact/hooks");
function usePinch() {
  const { provides: viewportProvides } = L2("viewport");
  const { provides: zoomProvides } = useZoomCapability();
  const elementRef = (0, import_hooks3.useRef)(null);
  (0, import_hooks3.useEffect)(() => {
    const element = elementRef.current;
    if (!element || !viewportProvides || !zoomProvides) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    let hammer;
    let initialZoom = 0;
    let lastCenter = { x: 0, y: 0 };
    const getState = () => zoomProvides.getState();
    const updateTransform = (scale) => {
      element.style.transform = `scale(${scale})`;
    };
    const resetTransform = () => {
      element.style.transform = "none";
      element.style.transformOrigin = "0 0";
    };
    const pinchStart = (e) => {
      initialZoom = getState().currentZoomLevel;
      const contRect = viewportProvides.getBoundingRect();
      lastCenter = {
        x: e.center.x - contRect.origin.x,
        y: e.center.y - contRect.origin.y
      };
      const innerRect = element.getBoundingClientRect();
      element.style.transformOrigin = `${e.center.x - innerRect.left}px ${e.center.y - innerRect.top}px`;
      if (e.srcEvent?.cancelable) {
        e.srcEvent.preventDefault();
        e.srcEvent.stopPropagation();
      }
    };
    const pinchMove = (e) => {
      updateTransform(e.scale);
      if (e.srcEvent?.cancelable) {
        e.srcEvent.preventDefault();
        e.srcEvent.stopPropagation();
      }
    };
    const pinchEnd = (e) => {
      const delta = (e.scale - 1) * initialZoom;
      zoomProvides.requestZoomBy(delta, { vx: lastCenter.x, vy: lastCenter.y });
      resetTransform();
      initialZoom = 0;
    };
    const setupHammer = async () => {
      try {
        const Hammer = (await import("hammerjs")).default;
        const inputClass = (() => {
          const MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
          const SUPPORT_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0;
          const SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
          if (SUPPORT_ONLY_TOUCH) return Hammer.TouchInput;
          if (!SUPPORT_TOUCH) return Hammer.MouseInput;
          return Hammer.TouchMouseInput;
        })();
        hammer = new Hammer(element, {
          touchAction: "pan-x pan-y",
          // allow scroll in every direction
          inputClass
        });
        hammer.get("pinch").set({ enable: true, pointers: 2, threshold: 0.1 });
        hammer.on("pinchstart", pinchStart);
        hammer.on("pinchmove", pinchMove);
        hammer.on("pinchend", pinchEnd);
      } catch (error) {
        console.warn("Failed to load HammerJS:", error);
      }
    };
    setupHammer();
    return () => {
      hammer?.destroy();
      resetTransform();
    };
  }, [viewportProvides, zoomProvides]);
  return { elementRef };
}

// src/preact/components/pinch-wrapper.tsx
var import_jsx_runtime = require("preact/jsx-runtime");
function PinchWrapper({ children, style, ...props }) {
  const { elementRef } = usePinch();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: elementRef,
      ...props,
      style: {
        ...style,
        display: "block",
        width: "fit-content",
        overflow: "visible",
        boxSizing: "border-box",
        margin: "0px auto"
      },
      children
    }
  );
}

// src/preact/components/marquee-zoom.tsx
var import_hooks6 = require("preact/hooks");

// ../plugin-interaction-manager/dist/jsxRuntime.module-D89ud_rY.js
var import_preact5 = require("preact");

// ../plugin-interaction-manager/dist/preact/index.js
var import_hooks5 = require("preact/hooks");

// ../plugin-interaction-manager/dist/index-Q-vI1_iw.js
var C2 = "\xAD";
var M3 = "\u200B";
var E3 = "\u2060";
var O = "\uFEFF";
var w3 = "\uFFFE";
var H = "\uFFFF";
var L4 = Object.freeze([
  C2,
  M3,
  E3,
  O,
  w3,
  H
]);
new RegExp(`[${L4.join("")}]`, "g");
var u = Object.freeze([
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
u.reduce(
  (e, r) => (e[r.id] = r, e),
  {}
);
u.reduce((e, r) => (e[r.css] = r.id, e), {});
u.map((e) => ({
  value: e.id,
  label: e.label
}));
var N3 = Object.freeze({
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
  N3
).reduce(
  (e, [r, o]) => (e[o] = Number(r), e),
  {}
);

// ../plugin-interaction-manager/dist/preact/index.js
var import_preact6 = require("preact");

// ../plugin-interaction-manager/dist/reducer-Dda407Go.js
var M4 = "\xAD";
var H2 = "\u200B";
var T2 = "\u2060";
var $3 = "\uFEFF";
var R = "\uFFFE";
var I = "\uFFFF";
var P4 = Object.freeze([
  M4,
  H2,
  T2,
  $3,
  R,
  I
]);
new RegExp(`[${P4.join("")}]`, "g");
var y2 = Object.freeze([
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
y2.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y2.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y2.map((o) => ({
  value: o.id,
  label: o.label
}));
var k3 = Object.freeze({
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
  k3
).reduce(
  (o, [t2, e]) => (o[e] = Number(t2), o),
  {}
);
function g2(o, t2, e) {
  if (o === t2)
    return true;
  if (o == null || t2 == null)
    return o === t2;
  const s2 = typeof o;
  if (s2 !== typeof t2) return false;
  if (s2 === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i2 = O2(o, t2);
    if (e.has(i2))
      return true;
    e.add(i2);
    const r = Array.isArray(o), a4 = Array.isArray(t2);
    return r && a4 ? N4(o, t2, e) : !r && !a4 ? U2(o, t2, e) : false;
  }
  return false;
}
function O2(o, t2) {
  return `${C3(o)}__${C3(t2)}`;
}
var F3 = 0;
var b3 = /* @__PURE__ */ new WeakMap();
function C3(o) {
  return b3.has(o) || b3.set(o, ++F3), b3.get(o);
}
function N4(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s2 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a4 = 0; a4 < t2.length; a4++)
      if (!s2[a4] && g2(r, t2[a4], e)) {
        s2[a4] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U2(o, t2, e) {
  const s2 = Object.keys(o).sort(), i2 = Object.keys(t2).sort();
  if (s2.length !== i2.length) return false;
  for (let r = 0; r < s2.length; r++)
    if (s2[r] !== i2[r]) return false;
  for (const r of s2) {
    const a4 = o[r], n = t2[r];
    if (!g2(a4, n, e))
      return false;
  }
  return true;
}
var _3 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s2, i2, r) => {
      this.onStoreUpdated(r, i2);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s2, i2, r) => {
      this.onCoreStoreUpdated(r, i2);
    }), this.readyPromise = new Promise((s2) => {
      this.readyResolve = s2;
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
    const s2 = Date.now(), i2 = this.debouncedActions[t2.type] || 0;
    return s2 - i2 >= e ? (this.debouncedActions[t2.type] = s2, this.dispatch(t2), true) : false;
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
var x2 = class {
  constructor(t2, e) {
    this.handler = t2, this.options = e, this.lastRun = 0, this.handle = (s2) => {
      this.options.mode === "debounce" ? this.debounce(s2) : this.throttle(s2);
    };
  }
  debounce(t2) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t2), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t2) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), s2 = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (s2 === "leading-trailing" && this.handler(t2), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (e - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function p() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => o.forEach((e) => e(t2)),
    on: (t2) => (o.add(t2), () => o.delete(t2)),
    off: (t2) => o.delete(t2),
    clear: () => o.clear()
  };
}
function D(o, t2 = g2) {
  const e = /* @__PURE__ */ new Set(), s2 = /* @__PURE__ */ new Map();
  let i2 = o;
  const r = (n) => e.forEach((c) => c(n)), a4 = (n, c) => {
    let u2 = n, h2 = () => {
    };
    if (c) {
      const l2 = new x2(n, c);
      u2 = l2.handle, h2 = () => l2.destroy(), s2.set(n, { wrapped: u2, destroy: h2 });
    }
    return i2 !== void 0 && u2(i2), e.add(u2), () => {
      e.delete(u2), h2(), s2.delete(n);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return i2;
    },
    emit(n = void 0) {
      (i2 === void 0 || !t2(i2, n)) && (i2 = n, r(n));
    },
    on: a4,
    off(n) {
      const c = s2.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s2.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s2.forEach((n) => n.destroy()), s2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g2) {
      return (u2, h2) => {
        let l2;
        if (i2 !== void 0) {
          const d2 = n(i2);
          l2 = d2, u2(d2);
        }
        return a4(
          (d2) => {
            const f3 = n(d2);
            (l2 === void 0 || !c(l2, f3)) && (l2 = f3, u2(f3));
          },
          h2
        );
      };
    }
  };
}
var v3 = "INTERACTION/ACTIVATE_MODE";
var m2 = "INTERACTION/PAUSE";
var E4 = "INTERACTION/RESUME";
var A = "INTERACTION/SET_CURSOR";
var j = (o) => ({
  type: v3,
  payload: { mode: o }
});
var z3 = (o) => ({
  type: A,
  payload: { cursor: o }
});
var G2 = () => ({
  type: m2
});
var L5 = () => ({
  type: E4
});
function V(o) {
  const t2 = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], e = {};
  for (const s2 of t2)
    e[s2] = (i2, r, a4) => {
      var n;
      for (const c of o) (n = c[s2]) == null || n.call(c, i2, r, a4);
    };
  return e;
}
var S3 = class S4 extends _3 {
  constructor(t2, e) {
    super(t2, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p(), this.onHandlerChange$ = p(), this.onCursorChange$ = p(), this.onStateChange$ = D(), this.registerMode({
      id: "default",
      scope: "page",
      exclusive: false,
      cursor: "auto"
    });
  }
  async initialize(t2) {
  }
  buildCapability() {
    return {
      activate: (t2) => this.activate(t2),
      onModeChange: this.onModeChange$.on,
      onCursorChange: this.onCursorChange$.on,
      onHandlerChange: this.onHandlerChange$.on,
      onStateChange: this.onStateChange$.on,
      getActiveMode: () => this.state.activeMode,
      getActiveInteractionMode: () => this.getActiveInteractionMode(),
      finish: () => this.activate("default"),
      registerMode: (t2) => this.registerMode(t2),
      registerHandlers: (t2) => this.registerHandlers(t2),
      registerAlways: (t2) => this.registerAlways(t2),
      setCursor: (t2, e, s2 = 0) => this.setCursor(t2, e, s2),
      removeCursor: (t2) => this.removeCursor(t2),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (t2) => this.getHandlersForScope(t2),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(G2()),
      resume: () => this.dispatch(L5()),
      isPaused: () => this.state.paused
    };
  }
  activate(t2) {
    if (!this.modes.has(t2))
      throw new Error(`[interaction] unknown mode '${t2}'`);
    if (t2 === this.state.activeMode) return;
    const e = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(e), this.dispatch(j(t2)), this.emitCursor(), this.notifyHandlersActive(t2), this.onModeChange$.emit({ ...this.state, activeMode: t2 });
  }
  notifyHandlersActive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a4;
        (a4 = r.onHandlerActiveStart) == null || a4.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a4) => {
        var n;
        (n = a4.onHandlerActiveStart) == null || n.call(a4, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a4;
        (a4 = r.onHandlerActiveEnd) == null || a4.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a4) => {
        var n;
        (n = a4.onHandlerActiveEnd) == null || n.call(a4, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s2 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a4 of i2) {
      const n = this.buckets.get(a4);
      if (!n) throw new Error(`unknown mode '${a4}'`);
      if (s2 == null)
        n.global.add(e);
      else {
        const c = n.page.get(s2) ?? /* @__PURE__ */ new Set();
        c.add(e), n.page.set(s2, c);
      }
      r.push(() => {
        if (s2 == null)
          n.global.delete(e);
        else {
          const c = n.page.get(s2);
          c && (c.delete(e), c.size === 0 && n.page.delete(s2));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      r.forEach((a4) => a4()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: t2, handlers: e }) {
    if (t2.type === "global")
      return this.alwaysGlobal.add(e), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(e);
    const s2 = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set();
    return s2.add(e), this.alwaysPage.set(t2.pageIndex, s2), this.onHandlerChange$.emit({ ...this.state }), () => {
      s2.delete(e), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  /** Returns the *merged* handler set that should be active for the given
   *  provider (`global` wrapper or a single page wrapper).
   *  – `alwaysGlobal` / `alwaysPage` are **always** active.
   *  – Handlers that belong to the current mode are added on top **iff**
   *    the mode’s own scope matches the provider’s scope.            */
  getHandlersForScope(t2) {
    if (!this.state) return null;
    const e = this.modes.get(this.state.activeMode);
    if (!e) return null;
    const s2 = this.buckets.get(e.id);
    if (!s2) return null;
    const i2 = (n, c) => n.size || c.size ? V([...n, ...c]) : null;
    if (t2.type === "global") {
      const n = e.scope === "global" ? s2.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a4 = e.scope === "page" ? s2.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a4);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(t2, e, s2 = 0) {
    this.cursorClaims.set(t2, { cursor: e, priority: s2 }), this.emitCursor();
  }
  removeCursor(t2) {
    this.cursorClaims.delete(t2), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t2 = [...this.cursorClaims.values()].sort((s2, i2) => i2.priority - s2.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t2.cursor !== this.state.cursor && (this.dispatch(z3(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
  }
  onStoreUpdated(t2, e) {
    this.onStateChange$.emit(e);
  }
  activeModeIsExclusive() {
    const t2 = this.modes.get(this.state.activeMode);
    return !!(t2 != null && t2.exclusive);
  }
  getActiveInteractionMode() {
    return this.modes.get(this.state.activeMode) ?? null;
  }
  // keep emitter clean
  async destroy() {
    this.onModeChange$.clear(), this.onCursorChange$.clear(), await super.destroy();
  }
};
S3.id = "interaction-manager";
var w4 = S3;

// ../plugin-interaction-manager/dist/preact/index.js
var A2 = (0, import_preact6.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function R2() {
  const e = (0, import_hooks5.useContext)(A2);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function x3(e) {
  const { registry: n } = R2();
  if (n === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const t2 = n.getPlugin(e);
  if (!t2)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t2,
    isLoading: false,
    ready: t2.ready()
  };
}
function D2(e) {
  const { plugin: n, isLoading: t2, ready: r } = x3(e);
  if (!n)
    return {
      provides: null,
      isLoading: t2,
      ready: r
    };
  if (!n.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: n.provides(),
    isLoading: t2,
    ready: r
  };
}
var s = () => D2(w4.id);
function q({ modeId: e, pageIndex: n }) {
  const { provides: t2 } = s();
  return {
    register: (r, i2) => {
      const u2 = (i2 == null ? void 0 : i2.modeId) ?? e, o = (i2 == null ? void 0 : i2.pageIndex) ?? n;
      return u2 ? t2 == null ? void 0 : t2.registerHandlers({
        modeId: u2,
        handlers: r,
        pageIndex: o
      }) : t2 == null ? void 0 : t2.registerAlways({
        scope: o !== void 0 ? { type: "page", pageIndex: o } : { type: "global" },
        handlers: r
      });
    }
  };
}

// src/preact/components/marquee-zoom.tsx
var import_jsx_runtime2 = require("preact/jsx-runtime");
var MarqueeZoom = ({
  pageIndex,
  scale,
  pageWidth,
  pageHeight,
  className,
  stroke = "rgba(33,150,243,0.8)",
  fill = "rgba(33,150,243,0.15)"
}) => {
  const { provides: zoom } = useZoomCapability();
  const { register } = q({ modeId: "marqueeZoom", pageIndex });
  const clamp = (v4, min, max) => Math.max(min, Math.min(max, v4));
  const startRef = (0, import_hooks6.useRef)(null);
  const [rect, setRect] = (0, import_hooks6.useState)(null);
  const pageWidthPDF = pageWidth / scale;
  const pageHeightPDF = pageHeight / scale;
  const handlers = (0, import_hooks6.useMemo)(
    () => ({
      onPointerDown: (pos, evt) => {
        startRef.current = pos;
        setRect({ origin: { x: pos.x, y: pos.y }, size: { width: 0, height: 0 } });
        evt.target?.setPointerCapture?.(evt.pointerId);
      },
      onPointerMove: (pos) => {
        if (!startRef.current) return;
        const curX = clamp(pos.x, 0, pageWidthPDF);
        const curY = clamp(pos.y, 0, pageHeightPDF);
        const { x: sx, y: sy } = startRef.current;
        const left = Math.min(sx, curX);
        const top = Math.min(sy, curY);
        const width = Math.abs(curX - sx);
        const height = Math.abs(curY - sy);
        setRect({ origin: { x: left, y: top }, size: { width, height } });
      },
      onPointerUp: (_4, evt) => {
        if (rect && zoom) {
          const dragPx = Math.max(rect.size.width, rect.size.height) * scale;
          if (dragPx > 5) {
            zoom.zoomToArea(pageIndex, rect);
          } else {
            zoom.zoomIn();
          }
        }
        startRef.current = null;
        setRect(null);
        evt.target?.releasePointerCapture?.(evt.pointerId);
      },
      onPointerCancel: (_4, evt) => {
        startRef.current = null;
        setRect(null);
        evt.target?.releasePointerCapture?.(evt.pointerId);
      }
    }),
    [pageWidthPDF, pageWidthPDF, zoom, scale, rect, pageIndex]
  );
  (0, import_hooks6.useEffect)(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  if (!rect) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      style: {
        position: "absolute",
        pointerEvents: "none",
        // ignore hits – underlying page still gets events
        left: rect.origin.x * scale,
        top: rect.origin.y * scale,
        width: rect.size.width * scale,
        height: rect.size.height * scale,
        border: `1px solid ${stroke}`,
        background: fill,
        boxSizing: "border-box"
      },
      className
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarqueeZoom,
  PinchWrapper,
  usePinch,
  useZoom,
  useZoomCapability,
  useZoomPlugin
});
//# sourceMappingURL=index.cjs.map