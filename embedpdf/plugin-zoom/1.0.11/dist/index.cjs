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

// ../core/dist/math-ChSRQF3r.js
var f = "SET_DOCUMENT";
var y = "SET_SCALE";
var w = "SET_ROTATION";
var E = "SET_PAGES";
var J = (i) => ({ type: y, payload: i });
function T(i) {
  const { width: e, height: t } = i;
  return {
    width: t,
    height: e
  };
}
function X(i, e, t) {
  return i = e % 2 === 0 ? i : T(i), {
    width: i.width * t,
    height: i.height * t
  };
}
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
function te(i, e, t) {
  return i < e ? e : i > t ? t : i;
}
function v(i, e, t) {
  if (i === e)
    return true;
  if (i == null || e == null)
    return i === e;
  const r = typeof i;
  if (r !== typeof e) return false;
  if (r === "object") {
    t || (t = /* @__PURE__ */ new Set());
    const n = x(i, e);
    if (t.has(n))
      return true;
    t.add(n);
    const a = Array.isArray(i), o = Array.isArray(e);
    return a && o ? U(i, e, t) : !a && !o ? B(i, e, t) : false;
  }
  return false;
}
function x(i, e) {
  return `${S(i)}__${S(e)}`;
}
var G = 0;
var d = /* @__PURE__ */ new WeakMap();
function S(i) {
  return d.has(i) || d.set(i, ++G), d.get(i);
}
function U(i, e, t) {
  if (i.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s = 0; s < i.length; s++) {
    const n = i[s];
    for (let a = 0; a < e.length; a++)
      if (!r[a] && v(n, e[a], t)) {
        r[a] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i, e, t) {
  const r = Object.keys(i).sort(), s = Object.keys(e).sort();
  if (r.length !== s.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s[n]) return false;
  for (const n of r) {
    const a = i[n], o = e[n];
    if (!v(a, o, t))
      return false;
  }
  return true;
}

// ../core/dist/index.js
var f2 = (o) => o.pages.map(
  (t) => t.map((e) => ({
    ...e,
    rotatedSize: X(e.size, o.rotation, 1)
  }))
);
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
var b2 = class {
  constructor(t, e) {
    this.handler = t, this.options = e, this.lastRun = 0, this.handle = (i) => {
      this.options.mode === "debounce" ? this.debounce(i) : this.throttle(i);
    };
  }
  debounce(t) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), i = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (i === "leading-trailing" && this.handler(t), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t), this.lastRun = Date.now(), this.timeoutId = void 0;
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
    emit: (e = void 0) => o.forEach((i) => i(e)),
    on: (e) => (o.add(e), () => o.delete(e)),
    off: (e) => o.delete(e),
    clear: () => o.clear()
  };
}
function C(o, t = v) {
  const e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let s = o;
  const c = (r) => e.forEach((n) => n(r)), p2 = (r, n) => {
    let a = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a = u2.handle, d2 = () => u2.destroy(), i.set(r, { wrapped: a, destroy: d2 });
    }
    return s !== void 0 && a(s), e.add(a), () => {
      e.delete(a), d2(), i.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s;
    },
    emit(r = void 0) {
      (s === void 0 || !t(s, r)) && (s = r, c(r));
    },
    on: p2,
    off(r) {
      const n = i.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i.forEach((r) => r.destroy()), i.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = v) {
      return (a, d2) => {
        let u2;
        if (s !== void 0) {
          const h = r(s);
          u2 = h, a(h);
        }
        return p2(
          (h) => {
            const l2 = r(h);
            (u2 === void 0 || !n(u2, l2)) && (u2 = l2, a(l2));
          },
          d2
        );
      };
    }
  };
}

// ../models/dist/index.js
function swap(size) {
  const { width, height } = size;
  return {
    width: height,
    height: width
  };
}
function rotateRect(containerSize, rect, rotation) {
  let x2 = rect.origin.x;
  let y2 = rect.origin.y;
  let size = rect.size;
  switch (rotation) {
    case 0:
      break;
    case 1:
      x2 = containerSize.height - rect.origin.y - rect.size.height;
      y2 = rect.origin.x;
      size = swap(rect.size);
      break;
    case 2:
      x2 = containerSize.width - rect.origin.x - rect.size.width;
      y2 = containerSize.height - rect.origin.y - rect.size.height;
      break;
    case 3:
      x2 = rect.origin.y;
      y2 = containerSize.width - rect.origin.x - rect.size.width;
      size = swap(rect.size);
      break;
  }
  return {
    origin: {
      x: x2,
      y: y2
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
  (m2, info) => {
    m2[info.id] = info;
    return m2;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m2, info) => {
  m2[info.css] = info.id;
  return m2;
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

// src/lib/zoom-plugin.ts
var ZoomPlugin = class extends w2 {
  /* ------------------------------------------------------------------ */
  constructor(id, registry, cfg) {
    super(id, registry);
    /* ------------------------------------------------------------------ */
    /* internals                                                           */
    /* ------------------------------------------------------------------ */
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
    this.viewport.onViewportResize(() => this.recalcAuto(1 /* Top */), {
      mode: "debounce",
      wait: 150
    });
    this.coreStore.onAction(w, () => this.recalcAuto(1 /* Top */));
    this.coreStore.onAction(E, () => this.recalcAuto(1 /* Top */));
    this.coreStore.onAction(f, () => this.recalcAuto(1 /* Top */));
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
    return [...ranges].filter((r) => r.step > 0 && r.max > r.min).sort((a, b3) => a.min - b3.min);
  }
  /** pick the step that applies to a given numeric zoom */
  stepFor(zoom) {
    const r = this.zoomRanges.find((r2) => zoom >= r2.min && zoom < r2.max);
    return r ? r.step : this.zoomStep;
  }
  /** clamp + round helper reused later */
  toZoom(v2) {
    return parseFloat(te(v2, this.minZoom, this.maxZoom).toFixed(2));
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
    const exactZoom = te(base + delta, this.minZoom, this.maxZoom);
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
    const spreads = f2(this.coreState.core);
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
      const contentW = spread.reduce((s, p2, i) => s + p2.rotatedSize.width + (i ? pgGap : 0), 0);
      const contentH = Math.max(...spread.map((p2) => p2.rotatedSize.height));
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
    const off = (avail, cw, z2) => cw * z2 < avail ? (avail - cw * z2) / 2 : 0;
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