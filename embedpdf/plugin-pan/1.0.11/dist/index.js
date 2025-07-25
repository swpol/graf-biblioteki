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

// ../plugin-interaction-manager/dist/reducer-Dda407Go.js
var M2 = "\xAD";
var H2 = "\u200B";
var T = "\u2060";
var $2 = "\uFEFF";
var R2 = "\uFFFE";
var I2 = "\uFFFF";
var P2 = Object.freeze([
  M2,
  H2,
  T,
  $2,
  R2,
  I2
]);
new RegExp(`[${P2.join("")}]`, "g");
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
  (o, t) => (o[t.id] = t, o),
  {}
);
y2.reduce((o, t) => (o[t.css] = t.id, o), {});
y2.map((o) => ({
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
  (o, [t, e]) => (o[e] = Number(t), o),
  {}
);
function g2(o, t, e) {
  if (o === t)
    return true;
  if (o == null || t == null)
    return o === t;
  const s = typeof o;
  if (s !== typeof t) return false;
  if (s === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i = O2(o, t);
    if (e.has(i))
      return true;
    e.add(i);
    const r = Array.isArray(o), a = Array.isArray(t);
    return r && a ? N2(o, t, e) : !r && !a ? U(o, t, e) : false;
  }
  return false;
}
function O2(o, t) {
  return `${C(o)}__${C(t)}`;
}
var F2 = 0;
var b2 = /* @__PURE__ */ new WeakMap();
function C(o) {
  return b2.has(o) || b2.set(o, ++F2), b2.get(o);
}
function N2(o, t, e) {
  if (o.length !== t.length) return false;
  const s = new Array(t.length).fill(false);
  t: for (let i = 0; i < o.length; i++) {
    const r = o[i];
    for (let a = 0; a < t.length; a++)
      if (!s[a] && g2(r, t[a], e)) {
        s[a] = true;
        continue t;
      }
    return false;
  }
  return true;
}
function U(o, t, e) {
  const s = Object.keys(o).sort(), i = Object.keys(t).sort();
  if (s.length !== i.length) return false;
  for (let r = 0; r < s.length; r++)
    if (s[r] !== i[r]) return false;
  for (const r of s) {
    const a = o[r], n = t[r];
    if (!g2(a, n, e))
      return false;
  }
  return true;
}
var _2 = class {
  constructor(t, e) {
    if (this.id = t, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s, i, r) => {
      this.onStoreUpdated(r, i);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s, i, r) => {
      this.onCoreStoreUpdated(r, i);
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
  debouncedDispatch(t, e = 100) {
    const s = Date.now(), i = this.debouncedActions[t.type] || 0;
    return s - i >= e ? (this.debouncedActions[t.type] = s, this.dispatch(t), true) : false;
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
var x = class {
  constructor(t, e) {
    this.handler = t, this.options = e, this.lastRun = 0, this.handle = (s) => {
      this.options.mode === "debounce" ? this.debounce(s) : this.throttle(s);
    };
  }
  debounce(t) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), s = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (s === "leading-trailing" && this.handler(t), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
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
function p2() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t = void 0) => o.forEach((e) => e(t)),
    on: (t) => (o.add(t), () => o.delete(t)),
    off: (t) => o.delete(t),
    clear: () => o.clear()
  };
}
function D(o, t = g2) {
  const e = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  let i = o;
  const r = (n) => e.forEach((c) => c(n)), a = (n, c) => {
    let u2 = n, h = () => {
    };
    if (c) {
      const l2 = new x(n, c);
      u2 = l2.handle, h = () => l2.destroy(), s.set(n, { wrapped: u2, destroy: h });
    }
    return i !== void 0 && u2(i), e.add(u2), () => {
      e.delete(u2), h(), s.delete(n);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return i;
    },
    emit(n = void 0) {
      (i === void 0 || !t(i, n)) && (i = n, r(n));
    },
    on: a,
    off(n) {
      const c = s.get(n);
      c ? (e.delete(c.wrapped), c.destroy(), s.delete(n)) : e.delete(n);
    },
    clear() {
      e.clear(), s.forEach((n) => n.destroy()), s.clear();
    },
    /* derived hook --------------------------------------------- */
    select(n, c = g2) {
      return (u2, h) => {
        let l2;
        if (i !== void 0) {
          const d = n(i);
          l2 = d, u2(d);
        }
        return a(
          (d) => {
            const f2 = n(d);
            (l2 === void 0 || !c(l2, f2)) && (l2 = f2, u2(f2));
          },
          h
        );
      };
    }
  };
}
var v2 = "INTERACTION/ACTIVATE_MODE";
var m2 = "INTERACTION/PAUSE";
var E2 = "INTERACTION/RESUME";
var A = "INTERACTION/SET_CURSOR";
var j2 = (o) => ({
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
var L2 = () => ({
  type: E2
});
function V2(o) {
  const t = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], e = {};
  for (const s of t)
    e[s] = (i, r, a) => {
      var n;
      for (const c of o) (n = c[s]) == null || n.call(c, i, r, a);
    };
  return e;
}
var S = class S2 extends _2 {
  constructor(t, e) {
    super(t, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p2(), this.onHandlerChange$ = p2(), this.onCursorChange$ = p2(), this.onStateChange$ = D(), this.registerMode({
      id: "default",
      scope: "page",
      exclusive: false,
      cursor: "auto"
    });
  }
  async initialize(t) {
  }
  buildCapability() {
    return {
      activate: (t) => this.activate(t),
      onModeChange: this.onModeChange$.on,
      onCursorChange: this.onCursorChange$.on,
      onHandlerChange: this.onHandlerChange$.on,
      onStateChange: this.onStateChange$.on,
      getActiveMode: () => this.state.activeMode,
      getActiveInteractionMode: () => this.getActiveInteractionMode(),
      finish: () => this.activate("default"),
      registerMode: (t) => this.registerMode(t),
      registerHandlers: (t) => this.registerHandlers(t),
      registerAlways: (t) => this.registerAlways(t),
      setCursor: (t, e, s = 0) => this.setCursor(t, e, s),
      removeCursor: (t) => this.removeCursor(t),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (t) => this.getHandlersForScope(t),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(G()),
      resume: () => this.dispatch(L2()),
      isPaused: () => this.state.paused
    };
  }
  activate(t) {
    if (!this.modes.has(t))
      throw new Error(`[interaction] unknown mode '${t}'`);
    if (t === this.state.activeMode) return;
    const e = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(e), this.dispatch(j2(t)), this.emitCursor(), this.notifyHandlersActive(t), this.onModeChange$.emit({ ...this.state, activeMode: t });
  }
  notifyHandlersActive(t) {
    this.alwaysGlobal.forEach((i) => {
      var r;
      (r = i.onHandlerActiveStart) == null || r.call(i, t);
    }), this.alwaysPage.forEach((i) => {
      i.forEach((r) => {
        var a;
        (a = r.onHandlerActiveStart) == null || a.call(r, t);
      });
    });
    const e = this.modes.get(t);
    if (!e) return;
    const s = this.buckets.get(t);
    s && (e.scope === "global" && s.global.forEach((i) => {
      var r;
      (r = i.onHandlerActiveStart) == null || r.call(i, t);
    }), e.scope === "page" && s.page.forEach((i, r) => {
      i.forEach((a) => {
        var n;
        (n = a.onHandlerActiveStart) == null || n.call(a, t);
      });
    }));
  }
  notifyHandlersInactive(t) {
    this.alwaysGlobal.forEach((i) => {
      var r;
      (r = i.onHandlerActiveEnd) == null || r.call(i, t);
    }), this.alwaysPage.forEach((i) => {
      i.forEach((r) => {
        var a;
        (a = r.onHandlerActiveEnd) == null || a.call(r, t);
      });
    });
    const e = this.modes.get(t);
    if (!e) return;
    const s = this.buckets.get(t);
    s && (e.scope === "global" && s.global.forEach((i) => {
      var r;
      (r = i.onHandlerActiveEnd) == null || r.call(i, t);
    }), e.scope === "page" && s.page.forEach((i, r) => {
      i.forEach((a) => {
        var n;
        (n = a.onHandlerActiveEnd) == null || n.call(a, t);
      });
    }));
  }
  registerMode(t) {
    this.modes.set(t.id, t), this.buckets.has(t.id) || this.buckets.set(t.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: t, handlers: e, pageIndex: s }) {
    const i = Array.isArray(t) ? t : [t], r = [];
    for (const a of i) {
      const n = this.buckets.get(a);
      if (!n) throw new Error(`unknown mode '${a}'`);
      if (s == null)
        n.global.add(e);
      else {
        const c = n.page.get(s) ?? /* @__PURE__ */ new Set();
        c.add(e), n.page.set(s, c);
      }
      r.push(() => {
        if (s == null)
          n.global.delete(e);
        else {
          const c = n.page.get(s);
          c && (c.delete(e), c.size === 0 && n.page.delete(s));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      r.forEach((a) => a()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: t, handlers: e }) {
    if (t.type === "global")
      return this.alwaysGlobal.add(e), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(e);
    const s = this.alwaysPage.get(t.pageIndex) ?? /* @__PURE__ */ new Set();
    return s.add(e), this.alwaysPage.set(t.pageIndex, s), this.onHandlerChange$.emit({ ...this.state }), () => {
      s.delete(e), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  /** Returns the *merged* handler set that should be active for the given
   *  provider (`global` wrapper or a single page wrapper).
   *  – `alwaysGlobal` / `alwaysPage` are **always** active.
   *  – Handlers that belong to the current mode are added on top **iff**
   *    the mode’s own scope matches the provider’s scope.            */
  getHandlersForScope(t) {
    if (!this.state) return null;
    const e = this.modes.get(this.state.activeMode);
    if (!e) return null;
    const s = this.buckets.get(e.id);
    if (!s) return null;
    const i = (n, c) => n.size || c.size ? V2([...n, ...c]) : null;
    if (t.type === "global") {
      const n = e.scope === "global" ? s.global : /* @__PURE__ */ new Set();
      return i(this.alwaysGlobal, n);
    }
    const r = this.alwaysPage.get(t.pageIndex) ?? /* @__PURE__ */ new Set(), a = e.scope === "page" ? s.page.get(t.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i(r, a);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(t, e, s = 0) {
    this.cursorClaims.set(t, { cursor: e, priority: s }), this.emitCursor();
  }
  removeCursor(t) {
    this.cursorClaims.delete(t), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t = [...this.cursorClaims.values()].sort((s, i) => i.priority - s.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t.cursor !== this.state.cursor && (this.dispatch(z2(t.cursor)), this.onCursorChange$.emit(t.cursor));
  }
  onStoreUpdated(t, e) {
    this.onStateChange$.emit(e);
  }
  activeModeIsExclusive() {
    const t = this.modes.get(this.state.activeMode);
    return !!(t != null && t.exclusive);
  }
  getActiveInteractionMode() {
    return this.modes.get(this.state.activeMode) ?? null;
  }
  // keep emitter clean
  async destroy() {
    this.onModeChange$.clear(), this.onCursorChange$.clear(), await super.destroy();
  }
};
S.id = "interaction-manager";
var w3 = S;

// src/lib/pan-plugin.ts
var PanPlugin = class extends w2 {
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
  async initialize(_3) {
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

// src/lib/manifest.ts
var PAN_PLUGIN_ID = "pan";
var manifest = {
  id: PAN_PLUGIN_ID,
  name: "Pan Plugin",
  version: "1.0.0",
  provides: ["pan"],
  requires: ["interaction-manager"],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

// src/lib/index.ts
var PanPluginPackage = {
  manifest,
  create: (registry) => new PanPlugin(PAN_PLUGIN_ID, registry),
  reducer: () => {
  },
  initialState: {}
};
export {
  PAN_PLUGIN_ID,
  PanPlugin,
  PanPluginPackage,
  manifest
};
//# sourceMappingURL=index.js.map