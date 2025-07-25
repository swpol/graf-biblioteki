var w = "­", F = "​", v = "⁠", R = "\uFEFF", C = "￾", k = "￿", P = Object.freeze([
  w,
  F,
  v,
  R,
  C,
  k
]);
new RegExp(`[${P.join("")}]`, "g");
var g = Object.freeze([
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
g.reduce(
  (e, t) => (e[t.id] = t, e),
  {}
);
g.reduce((e, t) => (e[t.css] = t.id, e), {});
g.map((e) => ({
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
  (e, [t, r]) => (e[r] = Number(t), e),
  {}
);
const I = "SET_ROTATION", O = (e) => ({
  type: I,
  payload: e
});
class T {
  constructor(t, r) {
    if (this.id = t, this.registry = r, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((o, i, n) => {
      this.onStoreUpdated(n, i);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((o, i, n) => {
      this.onCoreStoreUpdated(n, i);
    }), this.readyPromise = new Promise((o) => {
      this.readyResolve = o;
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
  debouncedDispatch(t, r = 100) {
    const o = Date.now(), i = this.debouncedActions[t.type] || 0;
    return o - i >= r ? (this.debouncedActions[t.type] = o, this.dispatch(t), !0) : !1;
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
  onStoreUpdated(t, r) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t, r) {
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
class $ {
  constructor(t, r) {
    this.handler = t, this.options = r, this.lastRun = 0, this.handle = (o) => {
      this.options.mode === "debounce" ? this.debounce(o) : this.throttle(o);
    };
  }
  debounce(t) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t) {
    if (this.options.mode === "debounce") return;
    const r = Date.now(), o = this.options.throttleMode || "leading-trailing";
    r - this.lastRun >= this.options.wait && (o === "leading-trailing" && this.handler(t), this.lastRun = r), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (r - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
}
function b(e, t, r) {
  if (e === t)
    return !0;
  if (e == null || t == null)
    return e === t;
  const o = typeof e;
  if (o !== typeof t) return !1;
  if (o === "object") {
    r || (r = /* @__PURE__ */ new Set());
    const i = E(e, t);
    if (r.has(i))
      return !0;
    r.add(i);
    const n = Array.isArray(e), a = Array.isArray(t);
    return n && a ? D(e, t, r) : !n && !a ? N(e, t, r) : !1;
  }
  return !1;
}
function E(e, t) {
  return `${y(e)}__${y(t)}`;
}
let x = 0;
const p = /* @__PURE__ */ new WeakMap();
function y(e) {
  return p.has(e) || p.set(e, ++x), p.get(e);
}
function D(e, t, r) {
  if (e.length !== t.length) return !1;
  const o = new Array(t.length).fill(!1);
  t: for (let i = 0; i < e.length; i++) {
    const n = e[i];
    for (let a = 0; a < t.length; a++)
      if (!o[a] && b(n, t[a], r)) {
        o[a] = !0;
        continue t;
      }
    return !1;
  }
  return !0;
}
function N(e, t, r) {
  const o = Object.keys(e).sort(), i = Object.keys(t).sort();
  if (o.length !== i.length) return !1;
  for (let n = 0; n < o.length; n++)
    if (o[n] !== i[n]) return !1;
  for (const n of o) {
    const a = e[n], s = t[n];
    if (!b(a, s, r))
      return !1;
  }
  return !0;
}
function j(e, t = b) {
  const r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
  let i = e;
  const n = (s) => r.forEach((c) => c(s)), a = (s, c) => {
    let l = s, d = () => {
    };
    if (c) {
      const u = new $(s, c);
      l = u.handle, d = () => u.destroy(), o.set(s, { wrapped: l, destroy: d });
    }
    return i !== void 0 && l(i), r.add(l), () => {
      r.delete(l), d(), o.delete(s);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return i;
    },
    emit(s = void 0) {
      (i === void 0 || !t(i, s)) && (i = s, n(s));
    },
    on: a,
    off(s) {
      const c = o.get(s);
      c ? (r.delete(c.wrapped), c.destroy(), o.delete(s)) : r.delete(s);
    },
    clear() {
      r.clear(), o.forEach((s) => s.destroy()), o.clear();
    },
    /* derived hook --------------------------------------------- */
    select(s, c = b) {
      return (l, d) => {
        let u;
        if (i !== void 0) {
          const h = s(i);
          u = h, l(h);
        }
        return a(
          (h) => {
            const f = s(h);
            (u === void 0 || !c(u, f)) && (u = f, l(f));
          },
          d
        );
      };
    }
  };
}
function M(e, t, r, o = !0) {
  let i = 1, n = 0, a = 0, s = 1, c = 0, l = 0;
  switch (e) {
    case 1:
      i = 0, n = 1, a = -1, s = 0, c = r;
      break;
    case 2:
      i = -1, n = 0, a = 0, s = -1, c = t, l = r;
      break;
    case 3:
      i = 0, n = -1, a = 1, s = 0, l = t;
      break;
  }
  return o ? `matrix(${i},${n},${a},${s},${c},${l})` : [i, n, a, s, c, l];
}
function _(e) {
  return (e + 1) % 4;
}
function B(e) {
  return (e + 3) % 4;
}
const S = class S extends T {
  constructor(t, r, o) {
    super(t, r), this.rotate$ = j(), this.resetReady();
    const i = o.defaultRotation ?? this.coreState.core.rotation;
    this.setRotation(i), this.markReady();
  }
  async initialize(t) {
  }
  setRotation(t) {
    if (!this.coreState.core.pages)
      throw new Error("Pages not loaded");
    this.dispatchCoreAction(O(t));
  }
  rotateForward() {
    const t = _(this.coreState.core.rotation);
    this.setRotation(t);
  }
  rotateBackward() {
    const t = B(this.coreState.core.rotation);
    this.setRotation(t);
  }
  buildCapability() {
    return {
      onRotateChange: this.rotate$.on,
      setRotation: (t) => this.setRotation(t),
      getRotation: () => this.coreState.core.rotation,
      rotateForward: () => this.rotateForward(),
      rotateBackward: () => this.rotateBackward(),
      getMatrix: ({ w: t = 0, h: r = 0, asString: o = !0 } = {}) => M(this.coreState.core.rotation, t, r, o)
    };
  }
  async destroy() {
    this.rotate$.clear(), super.destroy();
  }
};
S.id = "rotate";
let m = S;
export {
  m as R
};
//# sourceMappingURL=rotate-plugin-BYCSul3M.js.map
