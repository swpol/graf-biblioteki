const v = "SET_VIEWPORT_METRICS", T = "SET_VIEWPORT_SCROLL_METRICS", R = "SET_VIEWPORT_GAP", E = "SET_SCROLL_ACTIVITY";
function C(e) {
  return {
    type: R,
    payload: e
  };
}
function $(e) {
  return {
    type: v,
    payload: e
  };
}
function I(e) {
  return {
    type: T,
    payload: e
  };
}
function M(e) {
  return { type: E, payload: e };
}
var _ = "­", A = "​", P = "⁠", O = "\uFEFF", L = "￾", V = "￿", F = Object.freeze([
  _,
  A,
  P,
  O,
  L,
  V
]);
new RegExp(`[${F.join("")}]`, "g");
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
  (e, t) => (e[t.id] = t, e),
  {}
);
y.reduce((e, t) => (e[t.css] = t.id, e), {});
y.map((e) => ({
  value: e.id,
  label: e.label
}));
var z = Object.freeze({
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
  z
).reduce(
  (e, [t, i]) => (e[i] = Number(t), e),
  {}
);
function b(e, t, i) {
  if (e === t)
    return !0;
  if (e == null || t == null)
    return e === t;
  const s = typeof e;
  if (s !== typeof t) return !1;
  if (s === "object") {
    i || (i = /* @__PURE__ */ new Set());
    const r = D(e, t);
    if (i.has(r))
      return !0;
    i.add(r);
    const l = Array.isArray(e), n = Array.isArray(t);
    return l && n ? x(e, t, i) : !l && !n ? k(e, t, i) : !1;
  }
  return !1;
}
function D(e, t) {
  return `${m(e)}__${m(t)}`;
}
let j = 0;
const f = /* @__PURE__ */ new WeakMap();
function m(e) {
  return f.has(e) || f.set(e, ++j), f.get(e);
}
function x(e, t, i) {
  if (e.length !== t.length) return !1;
  const s = new Array(t.length).fill(!1);
  t: for (let r = 0; r < e.length; r++) {
    const l = e[r];
    for (let n = 0; n < t.length; n++)
      if (!s[n] && b(l, t[n], i)) {
        s[n] = !0;
        continue t;
      }
    return !1;
  }
  return !0;
}
function k(e, t, i) {
  const s = Object.keys(e).sort(), r = Object.keys(t).sort();
  if (s.length !== r.length) return !1;
  for (let l = 0; l < s.length; l++)
    if (s[l] !== r[l]) return !1;
  for (const l of s) {
    const n = e[l], o = t[l];
    if (!b(n, o, i))
      return !1;
  }
  return !0;
}
class G {
  constructor(t, i) {
    if (this.id = t, this.registry = i, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((s, r, l) => {
      this.onStoreUpdated(l, r);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((s, r, l) => {
      this.onCoreStoreUpdated(l, r);
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
    const s = Date.now(), r = this.debouncedActions[t.type] || 0;
    return s - r >= i ? (this.debouncedActions[t.type] = s, this.dispatch(t), !0) : !1;
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
}
class W {
  constructor(t, i) {
    this.handler = t, this.options = i, this.lastRun = 0, this.handle = (s) => {
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
    const i = Date.now(), s = this.options.throttleMode || "leading-trailing";
    i - this.lastRun >= this.options.wait && (s === "leading-trailing" && this.handler(t), this.lastRun = i), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (i - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
}
function q() {
  const e = /* @__PURE__ */ new Set();
  return {
    emit: (t = void 0) => e.forEach((i) => i(t)),
    on: (t) => (e.add(t), () => e.delete(t)),
    off: (t) => e.delete(t),
    clear: () => e.clear()
  };
}
function p(e, t = b) {
  const i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  let r = e;
  const l = (o) => i.forEach((c) => c(o)), n = (o, c) => {
    let a = o, d = () => {
    };
    if (c) {
      const h = new W(o, c);
      a = h.handle, d = () => h.destroy(), s.set(o, { wrapped: a, destroy: d });
    }
    return r !== void 0 && a(r), i.add(a), () => {
      i.delete(a), d(), s.delete(o);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return r;
    },
    emit(o = void 0) {
      (r === void 0 || !t(r, o)) && (r = o, l(o));
    },
    on: n,
    off(o) {
      const c = s.get(o);
      c ? (i.delete(c.wrapped), c.destroy(), s.delete(o)) : i.delete(o);
    },
    clear() {
      i.clear(), s.forEach((o) => o.destroy()), s.clear();
    },
    /* derived hook --------------------------------------------- */
    select(o, c = b) {
      return (a, d) => {
        let h;
        if (r !== void 0) {
          const u = o(r);
          h = u, a(u);
        }
        return n(
          (u) => {
            const S = o(u);
            (h === void 0 || !c(h, S)) && (h = S, a(S));
          },
          d
        );
      };
    }
  };
}
const g = class g extends G {
  constructor(t, i, s) {
    super(t, i), this.id = t, this.viewportResize$ = p(), this.viewportMetrics$ = p(), this.scrollMetrics$ = p(), this.scrollReq$ = q(), this.scrollActivity$ = p(), this.rectProvider = null, s.viewportGap && this.dispatch(C(s.viewportGap)), this.scrollEndDelay = s.scrollEndDelay || 300;
  }
  buildCapability() {
    return {
      getViewportGap: () => this.state.viewportGap,
      getMetrics: () => this.state.viewportMetrics,
      getBoundingRect: () => {
        var t;
        return ((t = this.rectProvider) == null ? void 0 : t.call(this)) ?? {
          origin: { x: 0, y: 0 },
          size: { width: 0, height: 0 }
        };
      },
      scrollTo: (t) => this.scrollTo(t),
      isScrolling: () => this.state.isScrolling,
      onScrollChange: this.scrollMetrics$.on,
      onViewportChange: this.viewportMetrics$.on,
      onViewportResize: this.viewportResize$.on,
      onScrollActivity: this.scrollActivity$.on
    };
  }
  setViewportResizeMetrics(t) {
    this.dispatch($(t)), this.viewportResize$.emit(this.state.viewportMetrics);
  }
  setViewportScrollMetrics(t) {
    (t.scrollTop !== this.state.viewportMetrics.scrollTop || t.scrollLeft !== this.state.viewportMetrics.scrollLeft) && (this.dispatch(I(t)), this.bumpScrollActivity(), this.scrollMetrics$.emit({
      scrollTop: t.scrollTop,
      scrollLeft: t.scrollLeft
    }));
  }
  onScrollRequest(t) {
    return this.scrollReq$.on(t);
  }
  registerBoundingRectProvider(t) {
    this.rectProvider = t;
  }
  bumpScrollActivity() {
    this.debouncedDispatch(M(!1), this.scrollEndDelay);
  }
  scrollTo(t) {
    const { x: i, y: s, center: r, behavior: l = "auto" } = t;
    if (r) {
      const n = this.state.viewportMetrics, o = i - n.clientWidth / 2, c = s - n.clientHeight / 2;
      this.scrollReq$.emit({
        x: o,
        y: c,
        behavior: l
      });
    } else
      this.scrollReq$.emit({
        x: i,
        y: s,
        behavior: l
      });
  }
  // Subscribe to store changes to notify onViewportChange
  onStoreUpdated(t, i) {
    t !== i && (this.viewportMetrics$.emit(i.viewportMetrics), t.isScrolling !== i.isScrolling && this.scrollActivity$.emit(i.isScrolling));
  }
  async initialize(t) {
  }
  async destroy() {
    super.destroy(), this.viewportMetrics$.clear(), this.viewportResize$.clear(), this.scrollMetrics$.clear(), this.scrollReq$.clear(), this.scrollActivity$.clear(), this.rectProvider = null, this.scrollEndTimer && clearTimeout(this.scrollEndTimer);
  }
};
g.id = "viewport";
let w = g;
export {
  E as S,
  w as V,
  T as a,
  v as b,
  R as c
};
//# sourceMappingURL=viewport-plugin-CewlD1yp.js.map
