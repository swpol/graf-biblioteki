var w = "­", C = "​", E = "⁠", M = "\uFEFF", A = "￾", I = "￿", $ = Object.freeze([
  w,
  C,
  E,
  M,
  A,
  I
]);
new RegExp(`[${$.join("")}]`, "g");
var m = Object.freeze([
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
m.reduce(
  (s, e) => (s[e.id] = e, s),
  {}
);
m.reduce((s, e) => (s[e.css] = e.id, s), {});
m.map((s) => ({
  value: s.id,
  label: s.label
}));
var H = Object.freeze({
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
  H
).reduce(
  (s, [e, t]) => (s[t] = Number(e), s),
  {}
);
function g(s, e, t) {
  if (s === e)
    return !0;
  if (s == null || e == null)
    return s === e;
  const r = typeof s;
  if (r !== typeof e) return !1;
  if (r === "object") {
    t || (t = /* @__PURE__ */ new Set());
    const i = O(s, e);
    if (t.has(i))
      return !0;
    t.add(i);
    const o = Array.isArray(s), n = Array.isArray(e);
    return o && n ? R(s, e, t) : !o && !n ? T(s, e, t) : !1;
  }
  return !1;
}
function O(s, e) {
  return `${v(s)}__${v(e)}`;
}
let P = 0;
const p = /* @__PURE__ */ new WeakMap();
function v(s) {
  return p.has(s) || p.set(s, ++P), p.get(s);
}
function R(s, e, t) {
  if (s.length !== e.length) return !1;
  const r = new Array(e.length).fill(!1);
  e: for (let i = 0; i < s.length; i++) {
    const o = s[i];
    for (let n = 0; n < e.length; n++)
      if (!r[n] && g(o, e[n], t)) {
        r[n] = !0;
        continue e;
      }
    return !1;
  }
  return !0;
}
function T(s, e, t) {
  const r = Object.keys(s).sort(), i = Object.keys(e).sort();
  if (r.length !== i.length) return !1;
  for (let o = 0; o < r.length; o++)
    if (r[o] !== i[o]) return !1;
  for (const o of r) {
    const n = s[o], a = e[o];
    if (!g(n, a, t))
      return !1;
  }
  return !0;
}
class k {
  constructor(e, t) {
    if (this.id = e, this.registry = t, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, e !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${e} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((r, i, o) => {
      this.onStoreUpdated(o, i);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((r, i, o) => {
      this.onCoreStoreUpdated(o, i);
    }), this.readyPromise = new Promise((r) => {
      this.readyResolve = r;
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
  debouncedDispatch(e, t = 100) {
    const r = Date.now(), i = this.debouncedActions[e.type] || 0;
    return r - i >= t ? (this.debouncedActions[e.type] = r, this.dispatch(e), !0) : !1;
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
  onStoreUpdated(e, t) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(e, t) {
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
class F {
  constructor(e, t) {
    this.handler = e, this.options = t, this.lastRun = 0, this.handle = (r) => {
      this.options.mode === "debounce" ? this.debounce(r) : this.throttle(r);
    };
  }
  debounce(e) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(e), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(e) {
    if (this.options.mode === "debounce") return;
    const t = Date.now(), r = this.options.throttleMode || "leading-trailing";
    t - this.lastRun >= this.options.wait && (r === "leading-trailing" && this.handler(e), this.lastRun = t), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(e), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (t - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
}
function f() {
  const s = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => s.forEach((t) => t(e)),
    on: (e) => (s.add(e), () => s.delete(e)),
    off: (e) => s.delete(e),
    clear: () => s.clear()
  };
}
function x(s, e = g) {
  const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  let i = s;
  const o = (a) => t.forEach((l) => l(a)), n = (a, l) => {
    let c = a, h = () => {
    };
    if (l) {
      const d = new F(a, l);
      c = d.handle, h = () => d.destroy(), r.set(a, { wrapped: c, destroy: h });
    }
    return i !== void 0 && c(i), t.add(c), () => {
      t.delete(c), h(), r.delete(a);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return i;
    },
    emit(a = void 0) {
      (i === void 0 || !e(i, a)) && (i = a, o(a));
    },
    on: n,
    off(a) {
      const l = r.get(a);
      l ? (t.delete(l.wrapped), l.destroy(), r.delete(a)) : t.delete(a);
    },
    clear() {
      t.clear(), r.forEach((a) => a.destroy()), r.clear();
    },
    /* derived hook --------------------------------------------- */
    select(a, l = g) {
      return (c, h) => {
        let d;
        if (i !== void 0) {
          const u = a(i);
          d = u, c(u);
        }
        return n(
          (u) => {
            const b = a(u);
            (d === void 0 || !l(d, b)) && (d = b, c(b));
          },
          h
        );
      };
    }
  };
}
const N = "INTERACTION/ACTIVATE_MODE", j = "INTERACTION/PAUSE", D = "INTERACTION/RESUME", z = "INTERACTION/SET_CURSOR", L = (s) => ({
  type: N,
  payload: { mode: s }
}), U = (s) => ({
  type: z,
  payload: { cursor: s }
}), _ = () => ({
  type: j
}), G = () => ({
  type: D
});
function V(s) {
  const e = [
    "onPointerDown",
    "onPointerUp",
    "onPointerMove",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerCancel"
  ], t = {};
  for (const r of e)
    t[r] = (i, o, n) => {
      var a;
      for (const l of s) (a = l[r]) == null || a.call(l, i, o, n);
    };
  return t;
}
const S = class extends k {
  constructor(e, t) {
    super(e, t), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = f(), this.onHandlerChange$ = f(), this.onCursorChange$ = f(), this.onStateChange$ = x(), this.registerMode({
      id: "default",
      scope: "page",
      exclusive: !1,
      cursor: "auto"
    });
  }
  async initialize(e) {
  }
  buildCapability() {
    return {
      activate: (e) => this.activate(e),
      onModeChange: this.onModeChange$.on,
      onCursorChange: this.onCursorChange$.on,
      onHandlerChange: this.onHandlerChange$.on,
      onStateChange: this.onStateChange$.on,
      getActiveMode: () => this.state.activeMode,
      getActiveInteractionMode: () => this.getActiveInteractionMode(),
      finish: () => this.activate("default"),
      registerMode: (e) => this.registerMode(e),
      registerHandlers: (e) => this.registerHandlers(e),
      registerAlways: (e) => this.registerAlways(e),
      setCursor: (e, t, r = 0) => this.setCursor(e, t, r),
      removeCursor: (e) => this.removeCursor(e),
      getCurrentCursor: () => this.state.cursor,
      getHandlersForScope: (e) => this.getHandlersForScope(e),
      activeModeIsExclusive: () => this.activeModeIsExclusive(),
      pause: () => this.dispatch(_()),
      resume: () => this.dispatch(G()),
      isPaused: () => this.state.paused
    };
  }
  activate(e) {
    if (!this.modes.has(e))
      throw new Error(`[interaction] unknown mode '${e}'`);
    if (e === this.state.activeMode) return;
    const t = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(t), this.dispatch(L(e)), this.emitCursor(), this.notifyHandlersActive(e), this.onModeChange$.emit({ ...this.state, activeMode: e });
  }
  notifyHandlersActive(e) {
    this.alwaysGlobal.forEach((i) => {
      var o;
      (o = i.onHandlerActiveStart) == null || o.call(i, e);
    }), this.alwaysPage.forEach((i) => {
      i.forEach((o) => {
        var n;
        (n = o.onHandlerActiveStart) == null || n.call(o, e);
      });
    });
    const t = this.modes.get(e);
    if (!t) return;
    const r = this.buckets.get(e);
    r && (t.scope === "global" && r.global.forEach((i) => {
      var o;
      (o = i.onHandlerActiveStart) == null || o.call(i, e);
    }), t.scope === "page" && r.page.forEach((i, o) => {
      i.forEach((n) => {
        var a;
        (a = n.onHandlerActiveStart) == null || a.call(n, e);
      });
    }));
  }
  notifyHandlersInactive(e) {
    this.alwaysGlobal.forEach((i) => {
      var o;
      (o = i.onHandlerActiveEnd) == null || o.call(i, e);
    }), this.alwaysPage.forEach((i) => {
      i.forEach((o) => {
        var n;
        (n = o.onHandlerActiveEnd) == null || n.call(o, e);
      });
    });
    const t = this.modes.get(e);
    if (!t) return;
    const r = this.buckets.get(e);
    r && (t.scope === "global" && r.global.forEach((i) => {
      var o;
      (o = i.onHandlerActiveEnd) == null || o.call(i, e);
    }), t.scope === "page" && r.page.forEach((i, o) => {
      i.forEach((n) => {
        var a;
        (a = n.onHandlerActiveEnd) == null || a.call(n, e);
      });
    }));
  }
  registerMode(e) {
    this.modes.set(e.id, e), this.buckets.has(e.id) || this.buckets.set(e.id, { global: /* @__PURE__ */ new Set(), page: /* @__PURE__ */ new Map() });
  }
  /** ---------- pointer-handler handling ------------ */
  registerHandlers({ modeId: e, handlers: t, pageIndex: r }) {
    const i = Array.isArray(e) ? e : [e], o = [];
    for (const n of i) {
      const a = this.buckets.get(n);
      if (!a) throw new Error(`unknown mode '${n}'`);
      if (r == null)
        a.global.add(t);
      else {
        const l = a.page.get(r) ?? /* @__PURE__ */ new Set();
        l.add(t), a.page.set(r, l);
      }
      o.push(() => {
        if (r == null)
          a.global.delete(t);
        else {
          const l = a.page.get(r);
          l && (l.delete(t), l.size === 0 && a.page.delete(r));
        }
      });
    }
    return this.onHandlerChange$.emit({ ...this.state }), () => {
      o.forEach((n) => n()), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  registerAlways({ scope: e, handlers: t }) {
    if (e.type === "global")
      return this.alwaysGlobal.add(t), this.onHandlerChange$.emit({ ...this.state }), () => this.alwaysGlobal.delete(t);
    const r = this.alwaysPage.get(e.pageIndex) ?? /* @__PURE__ */ new Set();
    return r.add(t), this.alwaysPage.set(e.pageIndex, r), this.onHandlerChange$.emit({ ...this.state }), () => {
      r.delete(t), this.onHandlerChange$.emit({ ...this.state });
    };
  }
  /** Returns the *merged* handler set that should be active for the given
   *  provider (`global` wrapper or a single page wrapper).
   *  – `alwaysGlobal` / `alwaysPage` are **always** active.
   *  – Handlers that belong to the current mode are added on top **iff**
   *    the mode’s own scope matches the provider’s scope.            */
  getHandlersForScope(e) {
    if (!this.state) return null;
    const t = this.modes.get(this.state.activeMode);
    if (!t) return null;
    const r = this.buckets.get(t.id);
    if (!r) return null;
    const i = (a, l) => a.size || l.size ? V([...a, ...l]) : null;
    if (e.type === "global") {
      const a = t.scope === "global" ? r.global : /* @__PURE__ */ new Set();
      return i(this.alwaysGlobal, a);
    }
    const o = this.alwaysPage.get(e.pageIndex) ?? /* @__PURE__ */ new Set(), n = t.scope === "page" ? r.page.get(e.pageIndex) ?? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set();
    return i(o, n);
  }
  /** ---------- cursor handling --------------------- */
  setCursor(e, t, r = 0) {
    this.cursorClaims.set(e, { cursor: t, priority: r }), this.emitCursor();
  }
  removeCursor(e) {
    this.cursorClaims.delete(e), this.emitCursor();
  }
  emitCursor() {
    var e;
    const t = [...this.cursorClaims.values()].sort((r, i) => i.priority - r.priority)[0] ?? {
      cursor: ((e = this.modes.get(this.state.activeMode)) == null ? void 0 : e.cursor) ?? "auto"
    };
    t.cursor !== this.state.cursor && (this.dispatch(U(t.cursor)), this.onCursorChange$.emit(t.cursor));
  }
  onStoreUpdated(e, t) {
    this.onStateChange$.emit(t);
  }
  activeModeIsExclusive() {
    const e = this.modes.get(this.state.activeMode);
    return !!(e != null && e.exclusive);
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
let ee = S;
var B = "­", Z = "​", W = "⁠", q = "\uFEFF", J = "￾", K = "￿", Q = Object.freeze([
  B,
  Z,
  W,
  q,
  J,
  K
]);
new RegExp(`[${Q.join("")}]`, "g");
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
  (s, e) => (s[e.id] = e, s),
  {}
);
y.reduce((s, e) => (s[e.css] = e.id, s), {});
y.map((s) => ({
  value: s.id,
  label: s.label
}));
var X = Object.freeze({
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
  X
).reduce(
  (s, [e, t]) => (s[t] = Number(e), s),
  {}
);
export {
  ee as w
};
//# sourceMappingURL=index-Q-vI1_iw-B7e7p3tz.js.map
