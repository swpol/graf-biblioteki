import { t as S, a as m } from "./math-ChSRQF3r.js";
import { l as v, e as D, d as I, C as F, D as _, L as O, g as A, f as N, c as M, b as U, P as z, S as x, h as L, k as j, j as q, i as B, u as K, r as $, m as k, s as G, n as W, q as Y, p as H, o as J } from "./math-ChSRQF3r.js";
const f = (o) => o.pages.map(
  (t) => t.map((e) => ({
    ...e,
    rotatedSize: S(e.size, o.rotation, 1)
  }))
);
function y(o, t) {
  return {
    package: o,
    config: t
  };
}
class w {
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
    return i - s >= e ? (this.debouncedActions[t.type] = i, this.dispatch(t), !0) : !1;
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
class b {
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
}
function E() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => o.forEach((i) => i(e)),
    on: (e) => (o.add(e), () => o.delete(e)),
    off: (e) => o.delete(e),
    clear: () => o.clear()
  };
}
function C(o, t = m) {
  const e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let s = o;
  const c = (r) => e.forEach((n) => n(r)), p = (r, n) => {
    let a = r, d = () => {
    };
    if (n) {
      const u = new b(r, n);
      a = u.handle, d = () => u.destroy(), i.set(r, { wrapped: a, destroy: d });
    }
    return s !== void 0 && a(s), e.add(a), () => {
      e.delete(a), d(), i.delete(r);
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
    on: p,
    off(r) {
      const n = i.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i.forEach((r) => r.destroy()), i.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = m) {
      return (a, d) => {
        let u;
        if (s !== void 0) {
          const h = r(s);
          u = h, a(h);
        }
        return p(
          (h) => {
            const l = r(h);
            (u === void 0 || !n(u, l)) && (u = l, a(l));
          },
          d
        );
      };
    }
  };
}
function T(o) {
  return Object.entries(o).map(([t, e]) => {
    const i = Number(t);
    return [Number.isFinite(i) && t.trim() !== "" ? i : t, e];
  });
}
export {
  w as BasePlugin,
  v as CORE_ACTION_TYPES,
  D as CapabilityConflictError,
  I as CapabilityNotFoundError,
  F as CircularDependencyError,
  _ as DependencyResolver,
  b as EventControl,
  O as LOAD_DOCUMENT,
  A as PluginConfigurationError,
  N as PluginInitializationError,
  M as PluginNotFoundError,
  U as PluginRegistrationError,
  z as PluginRegistry,
  x as SET_DOCUMENT,
  L as SET_DOCUMENT_ERROR,
  j as SET_PAGES,
  q as SET_ROTATION,
  B as SET_SCALE,
  m as arePropsEqual,
  K as clamp,
  C as createBehaviorEmitter,
  E as createEmitter,
  y as createPluginRegistration,
  T as enumEntries,
  f as getPagesWithRotatedSize,
  $ as initialCoreState,
  k as loadDocument,
  G as setDocument,
  W as setDocumentError,
  Y as setPages,
  H as setRotation,
  J as setScale
};
//# sourceMappingURL=index.js.map
