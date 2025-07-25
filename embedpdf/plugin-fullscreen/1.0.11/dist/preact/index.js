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
    const a2 = Array.isArray(i2), o = Array.isArray(e);
    return a2 && o ? U(i2, e, t2) : !a2 && !o ? B(i2, e, t2) : false;
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
  e: for (let s = 0; s < i2.length; s++) {
    const n = i2[s];
    for (let a2 = 0; a2 < e.length; a2++)
      if (!r[a2] && v2(n, e[a2], t2)) {
        r[a2] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i2, e, t2) {
  const r = Object.keys(i2).sort(), s = Object.keys(e).sort();
  if (r.length !== s.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s[n]) return false;
  for (const n of r) {
    const a2 = i2[n], o = e[n];
    if (!v2(a2, o, t2))
      return false;
  }
  return true;
}
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
  let s = o;
  const c = (r) => e.forEach((n) => n(r)), p2 = (r, n) => {
    let a2 = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a2 = u2.handle, d2 = () => u2.destroy(), i2.set(r, { wrapped: a2, destroy: d2 });
    }
    return s !== void 0 && a2(s), e.add(a2), () => {
      e.delete(a2), d2(), i2.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s;
    },
    emit(r = void 0) {
      (s === void 0 || !t2(s, r)) && (s = r, c(r));
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
      return (a2, d2) => {
        let u2;
        if (s !== void 0) {
          const h2 = r(s);
          u2 = h2, a2(h2);
        }
        return p2(
          (h2) => {
            const l2 = r(h2);
            (u2 === void 0 || !n(u2, l2)) && (u2 = l2, a2(l2));
          },
          d2
        );
      };
    }
  };
}
var SET_FULLSCREEN = "SET_FULLSCREEN";
function setFullscreen(payload) {
  return { type: SET_FULLSCREEN, payload };
}
var FullscreenPlugin = class extends w2 {
  constructor(id, registry) {
    super(id, registry);
    this.onStateChange$ = C();
    this.fullscreenRequest$ = E2();
  }
  async initialize(_22) {
  }
  buildCapability() {
    return {
      isFullscreen: () => this.state.isFullscreen,
      enableFullscreen: () => this.enableFullscreen(),
      exitFullscreen: () => this.exitFullscreen(),
      toggleFullscreen: () => this.toggleFullscreen(),
      onRequest: this.fullscreenRequest$.on,
      onStateChange: this.onStateChange$.on
    };
  }
  toggleFullscreen() {
    if (this.state.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enableFullscreen();
    }
  }
  enableFullscreen() {
    this.fullscreenRequest$.emit("enter");
  }
  exitFullscreen() {
    this.fullscreenRequest$.emit("exit");
  }
  onStoreUpdated(_22, newState) {
    this.onStateChange$.emit(newState);
  }
  setFullscreenState(isFullscreen) {
    this.dispatch(setFullscreen(isFullscreen));
  }
  async destroy() {
    this.fullscreenRequest$.clear();
    super.destroy();
  }
};
FullscreenPlugin.id = "fullscreen";
var initialState = {
  isFullscreen: false
};

// src/preact/hooks/use-fullscreen.ts
import { useState, useEffect } from "preact/hooks";
var useFullscreenPlugin = () => h(FullscreenPlugin.id);
var useFullscreenCapability = () => L2(FullscreenPlugin.id);
var useFullscreen = () => {
  const { provides } = useFullscreenCapability();
  const [state, setState] = useState(initialState);
  useEffect(() => {
    return provides?.onStateChange((state2) => {
      setState(state2);
    });
  }, [provides]);
  return {
    provides,
    state
  };
};

// src/preact/components/fullscreen.tsx
import { useEffect as useEffect2, useRef } from "preact/hooks";
import { jsx } from "preact/jsx-runtime";
function FullscreenProvider({ children, ...props }) {
  const { provides: fullscreenCapability } = useFullscreenCapability();
  const { plugin } = useFullscreenPlugin();
  const ref = useRef(null);
  useEffect2(() => {
    if (!fullscreenCapability) return;
    const unsub = fullscreenCapability.onRequest(async (action) => {
      if (action === "enter") {
        const el = ref.current;
        if (el && !document.fullscreenElement) await el.requestFullscreen();
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
      }
    });
    return unsub;
  }, [fullscreenCapability]);
  useEffect2(() => {
    if (!plugin) return;
    const handler = () => plugin.setFullscreenState(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [plugin]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      style: { position: "relative", width: "100%", height: "100%", ...props.style },
      ref,
      children
    }
  );
}
export {
  FullscreenProvider,
  useFullscreen,
  useFullscreenCapability,
  useFullscreenPlugin
};
//# sourceMappingURL=index.js.map