var M = "­", H = "​", T = "⁠", $ = "\uFEFF", R = "￾", I = "￿", P = Object.freeze([
  M,
  H,
  T,
  $,
  R,
  I
]);
new RegExp(`[${P.join("")}]`, "g");
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
  (o, t) => (o[t.id] = t, o),
  {}
);
y.reduce((o, t) => (o[t.css] = t.id, o), {});
y.map((o) => ({
  value: o.id,
  label: o.label
}));
var k = Object.freeze({
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
  k
).reduce(
  (o, [t, e]) => (o[e] = Number(t), o),
  {}
);
function g(o, t, e) {
  if (o === t)
    return !0;
  if (o == null || t == null)
    return o === t;
  const s = typeof o;
  if (s !== typeof t) return !1;
  if (s === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const i = O(o, t);
    if (e.has(i))
      return !0;
    e.add(i);
    const r = Array.isArray(o), a = Array.isArray(t);
    return r && a ? N(o, t, e) : !r && !a ? U(o, t, e) : !1;
  }
  return !1;
}
function O(o, t) {
  return `${C(o)}__${C(t)}`;
}
let F = 0;
const b = /* @__PURE__ */ new WeakMap();
function C(o) {
  return b.has(o) || b.set(o, ++F), b.get(o);
}
function N(o, t, e) {
  if (o.length !== t.length) return !1;
  const s = new Array(t.length).fill(!1);
  t: for (let i = 0; i < o.length; i++) {
    const r = o[i];
    for (let a = 0; a < t.length; a++)
      if (!s[a] && g(r, t[a], e)) {
        s[a] = !0;
        continue t;
      }
    return !1;
  }
  return !0;
}
function U(o, t, e) {
  const s = Object.keys(o).sort(), i = Object.keys(t).sort();
  if (s.length !== i.length) return !1;
  for (let r = 0; r < s.length; r++)
    if (s[r] !== i[r]) return !1;
  for (const r of s) {
    const a = o[r], n = t[r];
    if (!g(a, n, e))
      return !1;
  }
  return !0;
}
class _ {
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
    return s - i >= e ? (this.debouncedActions[t.type] = s, this.dispatch(t), !0) : !1;
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
}
class x {
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
}
function p() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (t = void 0) => o.forEach((e) => e(t)),
    on: (t) => (o.add(t), () => o.delete(t)),
    off: (t) => o.delete(t),
    clear: () => o.clear()
  };
}
function D(o, t = g) {
  const e = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  let i = o;
  const r = (n) => e.forEach((c) => c(n)), a = (n, c) => {
    let u = n, h = () => {
    };
    if (c) {
      const l = new x(n, c);
      u = l.handle, h = () => l.destroy(), s.set(n, { wrapped: u, destroy: h });
    }
    return i !== void 0 && u(i), e.add(u), () => {
      e.delete(u), h(), s.delete(n);
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
    select(n, c = g) {
      return (u, h) => {
        let l;
        if (i !== void 0) {
          const d = n(i);
          l = d, u(d);
        }
        return a(
          (d) => {
            const f = n(d);
            (l === void 0 || !c(l, f)) && (l = f, u(f));
          },
          h
        );
      };
    }
  };
}
const v = "INTERACTION/ACTIVATE_MODE", m = "INTERACTION/PAUSE", E = "INTERACTION/RESUME", A = "INTERACTION/SET_CURSOR", j = (o) => ({
  type: v,
  payload: { mode: o }
}), z = (o) => ({
  type: A,
  payload: { cursor: o }
}), G = () => ({
  type: m
}), L = () => ({
  type: E
});
function V(o) {
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
const S = class S extends _ {
  constructor(t, e) {
    super(t, e), this.modes = /* @__PURE__ */ new Map(), this.cursorClaims = /* @__PURE__ */ new Map(), this.buckets = /* @__PURE__ */ new Map(), this.alwaysGlobal = /* @__PURE__ */ new Set(), this.alwaysPage = /* @__PURE__ */ new Map(), this.onModeChange$ = p(), this.onHandlerChange$ = p(), this.onCursorChange$ = p(), this.onStateChange$ = D(), this.registerMode({
      id: "default",
      scope: "page",
      exclusive: !1,
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
      resume: () => this.dispatch(L()),
      isPaused: () => this.state.paused
    };
  }
  activate(t) {
    if (!this.modes.has(t))
      throw new Error(`[interaction] unknown mode '${t}'`);
    if (t === this.state.activeMode) return;
    const e = this.state.activeMode;
    this.cursorClaims.clear(), this.notifyHandlersInactive(e), this.dispatch(j(t)), this.emitCursor(), this.notifyHandlersActive(t), this.onModeChange$.emit({ ...this.state, activeMode: t });
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
    const i = (n, c) => n.size || c.size ? V([...n, ...c]) : null;
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
    t.cursor !== this.state.cursor && (this.dispatch(z(t.cursor)), this.onCursorChange$.emit(t.cursor));
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
let w = S;
const B = {
  activeMode: "default",
  cursor: "auto",
  paused: !1
}, W = (o, t) => {
  switch (t.type) {
    case v:
      return {
        ...o,
        activeMode: t.payload.mode
      };
    case A:
      return {
        ...o,
        cursor: t.payload.cursor
      };
    case m:
      return {
        ...o,
        paused: !0
      };
    case E:
      return {
        ...o,
        paused: !1
      };
    default:
      return o;
  }
};
export {
  w as I,
  B as i,
  W as r
};
//# sourceMappingURL=reducer-Dda407Go.js.map
