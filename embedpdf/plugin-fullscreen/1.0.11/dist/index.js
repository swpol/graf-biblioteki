// src/lib/manifest.ts
var FULLSCREEN_PLUGIN_ID = "fullscreen";
var manifest = {
  id: FULLSCREEN_PLUGIN_ID,
  name: "Fullscreen Plugin",
  version: "1.0.0",
  provides: ["fullscreen"],
  requires: [],
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

// src/lib/actions.ts
var SET_FULLSCREEN = "SET_FULLSCREEN";
function setFullscreen(payload) {
  return { type: SET_FULLSCREEN, payload };
}

// src/lib/fullscreen-plugin.ts
var FullscreenPlugin = class extends w2 {
  constructor(id, registry) {
    super(id, registry);
    this.onStateChange$ = C();
    this.fullscreenRequest$ = E2();
  }
  async initialize(_2) {
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
  onStoreUpdated(_2, newState) {
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

// src/lib/reducer.ts
var initialState = {
  isFullscreen: false
};
var reducer = (state, action) => {
  switch (action.type) {
    case SET_FULLSCREEN:
      return { ...state, isFullscreen: action.payload };
    default:
      return state;
  }
};

// src/lib/index.ts
var FullscreenPluginPackage = {
  manifest,
  create: (registry) => new FullscreenPlugin(FULLSCREEN_PLUGIN_ID, registry),
  reducer,
  initialState
};
export {
  FULLSCREEN_PLUGIN_ID,
  FullscreenPlugin,
  FullscreenPluginPackage,
  SET_FULLSCREEN,
  initialState,
  manifest,
  setFullscreen
};
//# sourceMappingURL=index.js.map