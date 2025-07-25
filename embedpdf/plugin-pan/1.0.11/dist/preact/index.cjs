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

// src/preact/index.ts
var preact_exports = {};
__export(preact_exports, {
  PanMode: () => PanMode,
  usePan: () => usePan,
  usePanCapability: () => usePanCapability,
  usePanPlugin: () => usePanPlugin
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

// ../plugin-interaction-manager/dist/jsxRuntime.module-D89ud_rY.js
var import_preact3 = require("preact");

// ../plugin-interaction-manager/dist/preact/index.js
var import_hooks2 = require("preact/hooks");

// ../plugin-interaction-manager/dist/index-Q-vI1_iw.js
var C = "\xAD";
var M2 = "\u200B";
var E = "\u2060";
var O = "\uFEFF";
var w = "\uFFFE";
var H = "\uFFFF";
var L3 = Object.freeze([
  C,
  M2,
  E,
  O,
  w,
  H
]);
new RegExp(`[${L3.join("")}]`, "g");
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
var N2 = Object.freeze({
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
  N2
).reduce(
  (e, [r, o]) => (e[o] = Number(r), e),
  {}
);

// ../plugin-interaction-manager/dist/preact/index.js
var import_preact4 = require("preact");

// ../plugin-interaction-manager/dist/reducer-Dda407Go.js
var M3 = "\xAD";
var H2 = "\u200B";
var T = "\u2060";
var $2 = "\uFEFF";
var R = "\uFFFE";
var I = "\uFFFF";
var P3 = Object.freeze([
  M3,
  H2,
  T,
  $2,
  R,
  I
]);
new RegExp(`[${P3.join("")}]`, "g");
var y = Object.freeze([
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
y.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y.map((o) => ({
  value: o.id,
  label: o.label
}));
var k2 = Object.freeze({
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
  k2
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
    const r = Array.isArray(o), a6 = Array.isArray(t2);
    return r && a6 ? N3(o, t2, e) : !r && !a6 ? U(o, t2, e) : false;
  }
  return false;
}
function O2(o, t2) {
  return `${C2(o)}__${C2(t2)}`;
}
var F2 = 0;
var b2 = /* @__PURE__ */ new WeakMap();
function C2(o) {
  return b2.has(o) || b2.set(o, ++F2), b2.get(o);
}
function N3(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s2 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a6 = 0; a6 < t2.length; a6++)
      if (!s2[a6] && g2(r, t2[a6], e)) {
        s2[a6] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U(o, t2, e) {
  const s2 = Object.keys(o).sort(), i2 = Object.keys(t2).sort();
  if (s2.length !== i2.length) return false;
  for (let r = 0; r < s2.length; r++)
    if (s2[r] !== i2[r]) return false;
  for (const r of s2) {
    const a6 = o[r], n = t2[r];
    if (!g2(a6, n, e))
      return false;
  }
  return true;
}
var _2 = class {
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
var x = class {
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
  const r = (n) => e.forEach((c) => c(n)), a6 = (n, c) => {
    let u3 = n, h3 = () => {
    };
    if (c) {
      const l3 = new x(n, c);
      u3 = l3.handle, h3 = () => l3.destroy(), s2.set(n, { wrapped: u3, destroy: h3 });
    }
    return i2 !== void 0 && u3(i2), e.add(u3), () => {
      e.delete(u3), h3(), s2.delete(n);
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
    on: a6,
    off(n) {
      const c = s2.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s2.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s2.forEach((n) => n.destroy()), s2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g2) {
      return (u3, h3) => {
        let l3;
        if (i2 !== void 0) {
          const d = n(i2);
          l3 = d, u3(d);
        }
        return a6(
          (d) => {
            const f4 = n(d);
            (l3 === void 0 || !c(l3, f4)) && (l3 = f4, u3(f4));
          },
          h3
        );
      };
    }
  };
}
var v2 = "INTERACTION/ACTIVATE_MODE";
var m2 = "INTERACTION/PAUSE";
var E2 = "INTERACTION/RESUME";
var A = "INTERACTION/SET_CURSOR";
var j = (o) => ({
  type: v2,
  payload: { mode: o }
});
var z2 = (o) => ({
  type: A,
  payload: { cursor: o }
});
var G = () => ({
  type: m2
});
var L4 = () => ({
  type: E2
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
    e[s2] = (i2, r, a6) => {
      var n;
      for (const c of o) (n = c[s2]) == null || n.call(c, i2, r, a6);
    };
  return e;
}
var S2 = class S3 extends _2 {
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
      pause: () => this.dispatch(G()),
      resume: () => this.dispatch(L4()),
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
        var a6;
        (a6 = r.onHandlerActiveStart) == null || a6.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a6) => {
        var n;
        (n = a6.onHandlerActiveStart) == null || n.call(a6, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a6;
        (a6 = r.onHandlerActiveEnd) == null || a6.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a6) => {
        var n;
        (n = a6.onHandlerActiveEnd) == null || n.call(a6, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s2 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a6 of i2) {
      const n = this.buckets.get(a6);
      if (!n) throw new Error(`unknown mode '${a6}'`);
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
      r.forEach((a6) => a6()), this.onHandlerChange$.emit({ ...this.state });
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
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a6 = e.scope === "page" ? s2.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a6);
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
    t2.cursor !== this.state.cursor && (this.dispatch(z2(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
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
S2.id = "interaction-manager";
var w2 = S2;

// ../plugin-interaction-manager/dist/preact/index.js
var A2 = (0, import_preact4.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function R2() {
  const e = (0, import_hooks2.useContext)(A2);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t2 } = e;
  if (t2)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function x2(e) {
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
  const { plugin: n, isLoading: t2, ready: r } = x2(e);
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
var s = () => D2(w2.id);
function j3() {
  const { provides: e } = s();
  return {
    setCursor: (n, t2, r = 0) => {
      e == null || e.setCursor(n, t2, r);
    },
    removeCursor: (n) => {
      e == null || e.removeCursor(n);
    }
  };
}
function q({ modeId: e, pageIndex: n }) {
  const { provides: t2 } = s();
  return {
    register: (r, i2) => {
      const u3 = (i2 == null ? void 0 : i2.modeId) ?? e, o = (i2 == null ? void 0 : i2.pageIndex) ?? n;
      return u3 ? t2 == null ? void 0 : t2.registerHandlers({
        modeId: u3,
        handlers: r,
        pageIndex: o
      }) : t2 == null ? void 0 : t2.registerAlways({
        scope: o !== void 0 ? { type: "page", pageIndex: o } : { type: "global" },
        handlers: r
      });
    }
  };
}

// dist/index.js
var z4 = "\xAD";
var M5 = "\u200B";
var L5 = "\u2060";
var $3 = "\uFEFF";
var F3 = "\uFFFE";
var N4 = "\uFFFF";
var k4 = Object.freeze([
  z4,
  M5,
  L5,
  $3,
  F3,
  N4
]);
new RegExp(`[${k4.join("")}]`, "g");
var P5 = Object.freeze([
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
P5.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P5.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P5.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _3 = Object.freeze({
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
  _3
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);
var w22 = class {
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
var M22 = "\xAD";
var H22 = "\u200B";
var T2 = "\u2060";
var $22 = "\uFEFF";
var R22 = "\uFFFE";
var I2 = "\uFFFF";
var P22 = Object.freeze([
  M22,
  H22,
  T2,
  $22,
  R22,
  I2
]);
new RegExp(`[${P22.join("")}]`, "g");
var y22 = Object.freeze([
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
y22.reduce(
  (o, t2) => (o[t2.id] = t2, o),
  {}
);
y22.reduce((o, t2) => (o[t2.css] = t2.id, o), {});
y22.map((o) => ({
  value: o.id,
  label: o.label
}));
var k22 = Object.freeze({
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
  k22
).reduce(
  (o, [t2, e]) => (o[e] = Number(t2), o),
  {}
);
function g22(o, t2, e) {
  if (o === t2)
    return true;
  if (o == null || t2 == null)
    return o === t2;
  const s2 = typeof o;
  if (s2 !== typeof t2) return false;
  if (s2 === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i2 = O22(o, t2);
    if (e.has(i2))
      return true;
    e.add(i2);
    const r = Array.isArray(o), a6 = Array.isArray(t2);
    return r && a6 ? N22(o, t2, e) : !r && !a6 ? U2(o, t2, e) : false;
  }
  return false;
}
function O22(o, t2) {
  return `${C3(o)}__${C3(t2)}`;
}
var F22 = 0;
var b22 = /* @__PURE__ */ new WeakMap();
function C3(o) {
  return b22.has(o) || b22.set(o, ++F22), b22.get(o);
}
function N22(o, t2, e) {
  if (o.length !== t2.length) return false;
  const s2 = new Array(t2.length).fill(false);
  t: for (let i2 = 0; i2 < o.length; i2++) {
    const r = o[i2];
    for (let a6 = 0; a6 < t2.length; a6++)
      if (!s2[a6] && g22(r, t2[a6], e)) {
        s2[a6] = true;
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
    const a6 = o[r], n = t2[r];
    if (!g22(a6, n, e))
      return false;
  }
  return true;
}
var _22 = class {
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
var x3 = class {
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
function p2() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => o.forEach((e) => e(t2)),
    on: (t2) => (o.add(t2), () => o.delete(t2)),
    off: (t2) => o.delete(t2),
    clear: () => o.clear()
  };
}
function D3(o, t2 = g22) {
  const e = /* @__PURE__ */ new Set(), s2 = /* @__PURE__ */ new Map();
  let i2 = o;
  const r = (n) => e.forEach((c) => c(n)), a6 = (n, c) => {
    let u22 = n, h3 = () => {
    };
    if (c) {
      const l22 = new x3(n, c);
      u22 = l22.handle, h3 = () => l22.destroy(), s2.set(n, { wrapped: u22, destroy: h3 });
    }
    return i2 !== void 0 && u22(i2), e.add(u22), () => {
      e.delete(u22), h3(), s2.delete(n);
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
    on: a6,
    off(n) {
      const c = s2.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s2.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s2.forEach((n) => n.destroy()), s2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g22) {
      return (u22, h3) => {
        let l22;
        if (i2 !== void 0) {
          const d = n(i2);
          l22 = d, u22(d);
        }
        return a6(
          (d) => {
            const f22 = n(d);
            (l22 === void 0 || !c(l22, f22)) && (l22 = f22, u22(f22));
          },
          h3
        );
      };
    }
  };
}
var v22 = "INTERACTION/ACTIVATE_MODE";
var m22 = "INTERACTION/PAUSE";
var E22 = "INTERACTION/RESUME";
var A3 = "INTERACTION/SET_CURSOR";
var j22 = (o) => ({
  type: v22,
  payload: { mode: o }
});
var z22 = (o) => ({
  type: A3,
  payload: { cursor: o }
});
var G2 = () => ({
  type: m22
});
var L22 = () => ({
  type: E22
});
function V2(o) {
  const t2 = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], e = {};
  for (const s2 of t2)
    e[s2] = (i2, r, a6) => {
      var n;
      for (const c of o) (n = c[s2]) == null || n.call(c, i2, r, a6);
    };
  return e;
}
var S4 = class S22 extends _22 {
  constructor(t2, e) {
    super(t2, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p2(), this.onHandlerChange$ = p2(), this.onCursorChange$ = p2(), this.onStateChange$ = D3(), this.registerMode({
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
      resume: () => this.dispatch(L22()),
      isPaused: () => this.state.paused
    };
  }
  activate(t2) {
    if (!this.modes.has(t2))
      throw new Error(`[interaction] unknown mode '${t2}'`);
    if (t2 === this.state.activeMode) return;
    const e = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(e), this.dispatch(j22(t2)), this.emitCursor(), this.notifyHandlersActive(t2), this.onModeChange$.emit({ ...this.state, activeMode: t2 });
  }
  notifyHandlersActive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a6;
        (a6 = r.onHandlerActiveStart) == null || a6.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveStart) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a6) => {
        var n;
        (n = a6.onHandlerActiveStart) == null || n.call(a6, t2);
      });
    }));
  }
  notifyHandlersInactive(t2) {
    this.alwaysGlobal.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), this.alwaysPage.forEach((i2) => {
      i2.forEach((r) => {
        var a6;
        (a6 = r.onHandlerActiveEnd) == null || a6.call(r, t2);
      });
    });
    const e = this.modes.get(t2);
    if (!e) return;
    const s2 = this.buckets.get(t2);
    s2 && (e.scope === "global" && s2.global.forEach((i2) => {
      var r;
      (r = i2.onHandlerActiveEnd) == null || r.call(i2, t2);
    }), e.scope === "page" && s2.page.forEach((i2, r) => {
      i2.forEach((a6) => {
        var n;
        (n = a6.onHandlerActiveEnd) == null || n.call(a6, t2);
      });
    }));
  }
  registerMode(t2) {
    this.modes.set(t2.id, t2), this.buckets.has(t2.id) || this.buckets.set(t2.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t2, handlers: e, pageIndex: s2 }) {
    const i2 = Array.isArray(t2) ? t2 : [t2], r = [];
    for (const a6 of i2) {
      const n = this.buckets.get(a6);
      if (!n) throw new Error(`unknown mode '${a6}'`);
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
      r.forEach((a6) => a6()), this.onHandlerChange$.emit({ ...this.state });
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
    const i2 = (n, c) => n.size || c.size ? V2([...n, ...c]) : null;
    if (t2.type === "global") {
      const n = e.scope === "global" ? s2.global : /* @__PURE__ */ new Set();
      return i2(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t2.pageIndex) ?? /* @__PURE__ */ new Set(), a6 = e.scope === "page" ? s2.page.get(t2.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i2(r, a6);
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
    t2.cursor !== this.state.cursor && (this.dispatch(z22(t2.cursor)), this.onCursorChange$.emit(t2.cursor));
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
S4.id = "interaction-manager";
var w3 = S4;
var PanPlugin = class extends w22 {
  constructor(id, registry) {
    super(id, registry);
    this.interactionManager = registry.getPlugin(w3.id)?.provides();
    this.interactionManager.registerMode({
      id: "panMode",
      scope: "global",
      exclusive: false,
      cursor: "grab"
    });
  }
  async initialize(_32) {
  }
  buildCapability() {
    return {
      enablePan: () => this.interactionManager.activate("panMode"),
      disablePan: () => this.interactionManager.activate("default"),
      togglePan: () => {
        if (this.interactionManager.getActiveMode() === "panMode") {
          this.interactionManager.activate("default");
        } else {
          this.interactionManager.activate("panMode");
        }
      }
    };
  }
};
PanPlugin.id = "pan";

// src/preact/hooks/use-pan.ts
var import_hooks3 = require("preact/hooks");
var usePanPlugin = () => h(PanPlugin.id);
var usePanCapability = () => L2(PanPlugin.id);
var usePan = () => {
  const { provides } = usePanCapability();
  const { provides: interactionManager } = s();
  const [isPanning, setIsPanning] = (0, import_hooks3.useState)(false);
  (0, import_hooks3.useEffect)(() => {
    if (!interactionManager) return;
    return interactionManager.onStateChange((state) => {
      setIsPanning(state.activeMode === "panMode");
    });
  }, [interactionManager]);
  return {
    provides,
    isPanning
  };
};

// src/preact/components/pan-mode.tsx
var import_hooks5 = require("preact/hooks");

// ../plugin-viewport/dist/preact/index.js
var import_preact8 = require("preact");
var import_hooks4 = require("preact/hooks");

// ../plugin-viewport/dist/viewport-plugin-CewlD1yp.js
var v3 = "SET_VIEWPORT_METRICS";
var T3 = "SET_VIEWPORT_SCROLL_METRICS";
var R3 = "SET_VIEWPORT_GAP";
var E4 = "SET_SCROLL_ACTIVITY";
function C4(e) {
  return {
    type: R3,
    payload: e
  };
}
function $4(e) {
  return {
    type: v3,
    payload: e
  };
}
function I3(e) {
  return {
    type: T3,
    payload: e
  };
}
function M6(e) {
  return { type: E4, payload: e };
}
var _4 = "\xAD";
var A4 = "\u200B";
var P6 = "\u2060";
var O3 = "\uFEFF";
var L6 = "\uFFFE";
var V3 = "\uFFFF";
var F4 = Object.freeze([
  _4,
  A4,
  P6,
  O3,
  L6,
  V3
]);
new RegExp(`[${F4.join("")}]`, "g");
var y3 = Object.freeze([
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
y3.reduce(
  (e, t2) => (e[t2.id] = t2, e),
  {}
);
y3.reduce((e, t2) => (e[t2.css] = t2.id, e), {});
y3.map((e) => ({
  value: e.id,
  label: e.label
}));
var z5 = Object.freeze({
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
  z5
).reduce(
  (e, [t2, i2]) => (e[i2] = Number(t2), e),
  {}
);
function b3(e, t2, i2) {
  if (e === t2)
    return true;
  if (e == null || t2 == null)
    return e === t2;
  const s2 = typeof e;
  if (s2 !== typeof t2) return false;
  if (s2 === "object") {
    i2 || (i2 = /* @__PURE__ */ new Set());
    const r = D4(e, t2);
    if (i2.has(r))
      return true;
    i2.add(r);
    const l3 = Array.isArray(e), n = Array.isArray(t2);
    return l3 && n ? x4(e, t2, i2) : !l3 && !n ? k5(e, t2, i2) : false;
  }
  return false;
}
function D4(e, t2) {
  return `${m3(e)}__${m3(t2)}`;
}
var j4 = 0;
var f2 = /* @__PURE__ */ new WeakMap();
function m3(e) {
  return f2.has(e) || f2.set(e, ++j4), f2.get(e);
}
function x4(e, t2, i2) {
  if (e.length !== t2.length) return false;
  const s2 = new Array(t2.length).fill(false);
  t: for (let r = 0; r < e.length; r++) {
    const l3 = e[r];
    for (let n = 0; n < t2.length; n++)
      if (!s2[n] && b3(l3, t2[n], i2)) {
        s2[n] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function k5(e, t2, i2) {
  const s2 = Object.keys(e).sort(), r = Object.keys(t2).sort();
  if (s2.length !== r.length) return false;
  for (let l3 = 0; l3 < s2.length; l3++)
    if (s2[l3] !== r[l3]) return false;
  for (const l3 of s2) {
    const n = e[l3], o = t2[l3];
    if (!b3(n, o, i2))
      return false;
  }
  return true;
}
var G3 = class {
  constructor(t2, i2) {
    if (this.id = t2, this.registry = i2, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s2, r, l3) => {
      this.onStoreUpdated(l3, r);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s2, r, l3) => {
      this.onCoreStoreUpdated(l3, r);
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
  debouncedDispatch(t2, i2 = 100) {
    const s2 = Date.now(), r = this.debouncedActions[t2.type] || 0;
    return s2 - r >= i2 ? (this.debouncedActions[t2.type] = s2, this.dispatch(t2), true) : false;
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
var W = class {
  constructor(t2, i2) {
    this.handler = t2, this.options = i2, this.lastRun = 0, this.handle = (s2) => {
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
    const i2 = Date.now(), s2 = this.options.throttleMode || "leading-trailing";
    i2 - this.lastRun >= this.options.wait && (s2 === "leading-trailing" && this.handler(t2), this.lastRun = i2), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t2), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (i2 - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function q2() {
  const e = /* @__PURE__ */ new Set();
  return {
    emit: (t2 = void 0) => e.forEach((i2) => i2(t2)),
    on: (t2) => (e.add(t2), () => e.delete(t2)),
    off: (t2) => e.delete(t2),
    clear: () => e.clear()
  };
}
function p3(e, t2 = b3) {
  const i2 = /* @__PURE__ */ new Set(), s2 = /* @__PURE__ */ new Map();
  let r = e;
  const l3 = (o) => i2.forEach((c) => c(o)), n = (o, c) => {
    let a6 = o, d = () => {
    };
    if (c) {
      const h3 = new W(o, c);
      a6 = h3.handle, d = () => h3.destroy(), s2.set(o, { wrapped: a6, destroy: d });
    }
    return r !== void 0 && a6(r), i2.add(a6), () => {
      i2.delete(a6), d(), s2.delete(o);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return r;
    },
    emit(o = void 0) {
      (r === void 0 || !t2(r, o)) && (r = o, l3(o));
    },
    on: n,
    off(o) {
      const c = s2.get(o);
      c ? (i2.delete(c.wrapped), c.destroy(), s2.delete(o)) : i2.delete(o);
    },
    clear() {
      i2.clear(), s2.forEach((o) => o.destroy()), s2.clear();
    },
    /* derived hook --------------------------------------------- */
    select(o, c = b3) {
      return (a6, d) => {
        let h3;
        if (r !== void 0) {
          const u3 = o(r);
          h3 = u3, a6(u3);
        }
        return n(
          (u3) => {
            const S5 = o(u3);
            (h3 === void 0 || !c(h3, S5)) && (h3 = S5, a6(S5));
          },
          d
        );
      };
    }
  };
}
var g3 = class g4 extends G3 {
  constructor(t2, i2, s2) {
    super(t2, i2), this.id = t2, this.viewportResize$ = p3(), this.viewportMetrics$ = p3(), this.scrollMetrics$ = p3(), this.scrollReq$ = q2(), this.scrollActivity$ = p3(), this.rectProvider = null, s2.viewportGap && this.dispatch(C4(s2.viewportGap)), this.scrollEndDelay = s2.scrollEndDelay || 300;
  }
  buildCapability() {
    return {
      getViewportGap: () => this.state.viewportGap,
      getMetrics: () => this.state.viewportMetrics,
      getBoundingRect: () => {
        var t2;
        return ((t2 = this.rectProvider) == null ? void 0 : t2.call(this)) ?? {
          origin: { x: 0, y: 0 },
          size: { width: 0, height: 0 }
        };
      },
      scrollTo: (t2) => this.scrollTo(t2),
      isScrolling: () => this.state.isScrolling,
      onScrollChange: this.scrollMetrics$.on,
      onViewportChange: this.viewportMetrics$.on,
      onViewportResize: this.viewportResize$.on,
      onScrollActivity: this.scrollActivity$.on
    };
  }
  setViewportResizeMetrics(t2) {
    this.dispatch($4(t2)), this.viewportResize$.emit(this.state.viewportMetrics);
  }
  setViewportScrollMetrics(t2) {
    (t2.scrollTop !== this.state.viewportMetrics.scrollTop || t2.scrollLeft !== this.state.viewportMetrics.scrollLeft) && (this.dispatch(I3(t2)), this.bumpScrollActivity(), this.scrollMetrics$.emit({
      scrollTop: t2.scrollTop,
      scrollLeft: t2.scrollLeft
    }));
  }
  onScrollRequest(t2) {
    return this.scrollReq$.on(t2);
  }
  registerBoundingRectProvider(t2) {
    this.rectProvider = t2;
  }
  bumpScrollActivity() {
    this.debouncedDispatch(M6(false), this.scrollEndDelay);
  }
  scrollTo(t2) {
    const { x: i2, y: s2, center: r, behavior: l3 = "auto" } = t2;
    if (r) {
      const n = this.state.viewportMetrics, o = i2 - n.clientWidth / 2, c = s2 - n.clientHeight / 2;
      this.scrollReq$.emit({
        x: o,
        y: c,
        behavior: l3
      });
    } else
      this.scrollReq$.emit({
        x: i2,
        y: s2,
        behavior: l3
      });
  }
  // Subscribe to store changes to notify onViewportChange
  onStoreUpdated(t2, i2) {
    t2 !== i2 && (this.viewportMetrics$.emit(i2.viewportMetrics), t2.isScrolling !== i2.isScrolling && this.scrollActivity$.emit(i2.isScrolling));
  }
  async initialize(t2) {
  }
  async destroy() {
    super.destroy(), this.viewportMetrics$.clear(), this.viewportResize$.clear(), this.scrollMetrics$.clear(), this.scrollReq$.clear(), this.scrollActivity$.clear(), this.rectProvider = null, this.scrollEndTimer && clearTimeout(this.scrollEndTimer);
  }
};
g3.id = "viewport";
var w4 = g3;

// ../plugin-viewport/dist/jsxRuntime.module-D89ud_rY.js
var import_preact7 = require("preact");

// ../plugin-viewport/dist/preact/index.js
var P7 = (0, import_preact8.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function m4() {
  const t2 = (0, import_hooks4.useContext)(P7);
  if (t2 === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t2;
  if (e)
    return t2;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t2;
}
function u2(t2) {
  const { registry: r } = m4();
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
function L7(t2) {
  const { plugin: r, isLoading: e, ready: o } = u2(t2);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: o
    };
  if (!r.provides)
    throw new Error(`Plugin ${t2} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: o
  };
}
var b4 = () => L7(w4.id);

// src/preact/components/pan-mode.tsx
var import_jsx_runtime = require("preact/jsx-runtime");
var PanMode = () => {
  const { register } = q({ modeId: "panMode" });
  const { setCursor, removeCursor } = j3();
  const { provides: viewport } = b4();
  const dragRef = (0, import_hooks5.useRef)(null);
  const handlers = (0, import_hooks5.useMemo)(
    () => ({
      onPointerDown: (_5, pe) => {
        if (!viewport) return;
        const metrics = viewport.getMetrics();
        dragRef.current = {
          startX: pe.clientX,
          startY: pe.clientY,
          startLeft: metrics.scrollLeft,
          startTop: metrics.scrollTop
        };
        setCursor("panMode", "grabbing", 10);
      },
      onPointerMove: (_5, pe) => {
        const drag = dragRef.current;
        if (!drag || !viewport) return;
        const dx = pe.clientX - drag.startX;
        const dy = pe.clientY - drag.startY;
        viewport.scrollTo({
          x: drag.startLeft - dx,
          y: drag.startTop - dy
        });
      },
      onPointerUp: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      },
      onPointerLeave: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      },
      onPointerCancel: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      }
    }),
    [viewport, setCursor, removeCursor]
  );
  (0, import_hooks5.useEffect)(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PanMode,
  usePan,
  usePanCapability,
  usePanPlugin
});
//# sourceMappingURL=index.cjs.map