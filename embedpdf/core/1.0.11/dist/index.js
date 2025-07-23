import { Rotation as T, transformSize as A } from "@embedpdf/models";
class C {
  constructor() {
    this.dependencyGraph = /* @__PURE__ */ new Map();
  }
  addNode(t, e = []) {
    this.dependencyGraph.set(t, new Set(e));
  }
  hasCircularDependencies() {
    const t = /* @__PURE__ */ new Set(), e = /* @__PURE__ */ new Set(), i = (r) => {
      t.add(r), e.add(r);
      const n = this.dependencyGraph.get(r) || /* @__PURE__ */ new Set();
      for (const o of n)
        if (t.has(o)) {
          if (e.has(o))
            return !0;
        } else if (i(o)) return !0;
      return e.delete(r), !1;
    };
    for (const r of this.dependencyGraph.keys())
      if (!t.has(r) && i(r))
        return !0;
    return !1;
  }
  resolveLoadOrder() {
    if (this.hasCircularDependencies())
      throw new Error("Circular dependencies detected");
    const t = [], e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), r = (n) => {
      if (i.has(n)) throw new Error("Circular dependency");
      if (e.has(n)) return;
      i.add(n);
      const o = this.dependencyGraph.get(n) || /* @__PURE__ */ new Set();
      for (const a of o)
        r(a);
      i.delete(n), e.add(n), t.push(n);
    };
    for (const n of this.dependencyGraph.keys())
      e.has(n) || r(n);
    return t;
  }
}
class u extends Error {
  constructor(t) {
    super(t), this.name = "PluginRegistrationError";
  }
}
class d extends Error {
  constructor(t) {
    super(t), this.name = "PluginNotFoundError";
  }
}
class z extends Error {
  constructor(t) {
    super(t), this.name = "CircularDependencyError";
  }
}
class j extends Error {
  constructor(t) {
    super(t), this.name = "CapabilityNotFoundError";
  }
}
class G extends Error {
  constructor(t) {
    super(t), this.name = "CapabilityConflictError";
  }
}
class x extends Error {
  constructor(t) {
    super(t), this.name = "PluginInitializationError";
  }
}
class O extends Error {
  constructor(t) {
    super(t), this.name = "PluginConfigurationError";
  }
}
class M {
  /**
   * Initializes the PluginStore with the main store and plugin ID.
   * @param store The main store instance.
   * @param pluginId The unique identifier for the plugin.
   */
  constructor(t, e) {
    this.store = t, this.pluginId = e;
  }
  /**
   * Gets the current state of the plugin.
   * @returns The plugin's state.
   */
  getState() {
    return this.store.getState().plugins[this.pluginId];
  }
  /**
   * Dispatches an action for the plugin and returns the *new* global state.
   * If you only need the plugin’s updated state, call `getState()` afterward.
   * @param action The action to dispatch.
   * @returns The updated global store state (after plugin reducer).
   */
  dispatch(t) {
    return this.store.dispatchToPlugin(this.pluginId, t);
  }
  /**
   * Subscribes to state changes only for this specific plugin.
   * You now receive (action, newPluginState, oldPluginState) in the callback.
   *
   * @param listener The callback to invoke when plugin state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribeToState(t) {
    return this.store.subscribeToPlugin(this.pluginId, (e, i, r) => {
      t(
        e,
        i,
        r
      );
    });
  }
  /**
   * Subscribes to a specific action type for the plugin.
   * This still uses the main store's `onAction`, so you get the *global*
   * old/new store states there. If you specifically want old/new plugin state,
   * use `subscribeToState` instead.
   *
   * @param type The action type to listen for.
   * @param handler The callback to invoke when the action occurs.
   * @returns A function to unsubscribe the handler.
   */
  onAction(t, e) {
    return this.store.onAction(t, (i, r, n) => {
      e(
        i,
        r.plugins[this.pluginId],
        n.plugins[this.pluginId]
      );
    });
  }
}
const S = "LOAD_DOCUMENT", m = "SET_DOCUMENT", b = "SET_DOCUMENT_ERROR", E = "SET_SCALE", P = "SET_ROTATION", R = "SET_PAGES", D = [
  S,
  m,
  b,
  E,
  P,
  R
], K = () => ({ type: S }), B = (s) => ({
  type: m,
  payload: s
}), W = (s) => ({
  type: b,
  payload: s
}), Y = (s) => ({ type: E, payload: s }), H = (s) => ({
  type: P,
  payload: s
}), J = (s) => ({
  type: R,
  payload: s
});
class $ {
  /**
   * Initializes the store with the provided core state.
   * @param reducer          The core reducer function
   * @param initialCoreState The initial core state
   */
  constructor(t, e) {
    this.initialCoreState = e, this.pluginReducers = {}, this.listeners = [], this.pluginListeners = {}, this.state = { core: e, plugins: {} }, this.coreReducer = t;
  }
  /**
   * Adds a reducer for a plugin-specific state.
   * @param pluginId The unique identifier for the plugin.
   * @param reducer The reducer function for the plugin state.
   * @param initialState The initial state for the plugin.
   */
  addPluginReducer(t, e, i) {
    this.state.plugins[t] = i, this.pluginReducers[t] = e;
  }
  /**
   * Dispatches an action *only* to the core reducer.
   * Notifies the global store listeners with (action, newState, oldState).
   *
   * @param action The action to dispatch, typed as CoreAction
   * @returns The updated *global* store state
   */
  dispatchToCore(t) {
    if (!this.coreReducer)
      return this.getState();
    const e = this.getState();
    this.state.core = this.coreReducer(this.state.core, t);
    const i = this.getState();
    return this.listeners.forEach((r) => r(t, i, e)), i;
  }
  /**
   * Dispatches an action *only* to a specific plugin.
   * Optionally notifies global store listeners if `notifyGlobal` is true.
   * Always notifies plugin-specific listeners with (action, newPluginState, oldPluginState).
   *
   * @param pluginId   The plugin identifier
   * @param action     The plugin action to dispatch
   * @param notifyGlobal Whether to also notify global store listeners
   * @returns The updated *global* store state
   */
  dispatchToPlugin(t, e, i = !0) {
    const r = this.getState(), n = this.pluginReducers[t];
    if (!n)
      return r;
    const o = r.plugins[t], a = n(o, e);
    this.state.plugins[t] = a;
    const l = this.getState();
    return i && this.listeners.forEach((h) => h(e, l, r)), this.pluginListeners[t] && this.pluginListeners[t].forEach((h) => {
      h(e, a, o);
    }), a;
  }
  /**
   * Dispatches an action to update the state using:
   * - the core reducer (if it's a CoreAction)
   * - *all* plugin reducers (regardless of action type), with no global notify for each plugin
   *
   * Returns the new *global* store state after all reducers have processed the action.
   *
   * @param action The action to dispatch (can be CoreAction or any Action).
   */
  dispatch(t) {
    const e = this.getState();
    this.isCoreAction(t) && (this.state.core = this.coreReducer(this.state.core, t));
    for (const r in this.pluginReducers) {
      const n = this.pluginReducers[r], o = e.plugins[r];
      n && (this.state.plugins[r] = n(o, t));
    }
    const i = this.getState();
    return this.listeners.forEach((r) => r(t, i, e)), i;
  }
  /**
   * Returns a shallow copy of the current state.
   * @returns The current store state.
   */
  getState() {
    return {
      core: { ...this.state.core },
      plugins: { ...this.state.plugins }
    };
  }
  /**
   * Subscribes a listener to *global* state changes.
   * The callback signature is now (action, newState, oldState).
   *
   * @param listener The callback to invoke on state changes
   * @returns A function to unsubscribe the listener
   */
  subscribe(t) {
    return this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((e) => e !== t);
    };
  }
  /**
   * Subscribes a listener to *plugin-specific* state changes.
   * The callback signature is now (action, newPluginState, oldPluginState).
   *
   * @param pluginId The unique identifier for the plugin.
   * @param listener The callback to invoke on plugin state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribeToPlugin(t, e) {
    if (!(t in this.state.plugins))
      throw new Error(
        `Plugin state not found for plugin "${t}". Did you forget to call addPluginReducer?`
      );
    return this.pluginListeners[t] || (this.pluginListeners[t] = []), this.pluginListeners[t].push(e), () => {
      this.pluginListeners[t] = this.pluginListeners[t].filter((i) => i !== e), this.pluginListeners[t].length === 0 && delete this.pluginListeners[t];
    };
  }
  /**
   * Subscribes to a specific action type (only from the core's action union).
   * The callback signature is (action, newState, oldState).
   *
   * @param type The action type to listen for.
   * @param handler The callback to invoke when the action occurs.
   * @returns A function to unsubscribe the handler.
   */
  onAction(t, e) {
    return this.subscribe((i, r, n) => {
      i.type === t && e(i, r, n);
    });
  }
  /**
   * Gets a PluginStore handle for a specific plugin.
   * @param pluginId The unique identifier for the plugin.
   * @returns A PluginStore instance for the plugin.
   */
  getPluginStore(t) {
    if (!(t in this.state.plugins))
      throw new Error(
        `Plugin state not found for plugin "${t}". Did you forget to call addPluginReducer?`
      );
    return new M(this, t);
  }
  /**
   * Helper method to check if an action is a CoreAction.
   * Adjust if you have a more refined way to differentiate CoreAction vs. any other Action.
   */
  isCoreAction(t) {
    return D.includes(t.type);
  }
  /**
   * Destroy the store: drop every listener and plugin reducer
   */
  destroy() {
    var t, e;
    this.listeners.length = 0;
    for (const i in this.pluginListeners)
      (e = (t = this.pluginListeners[i]) == null ? void 0 : t.splice) == null || e.call(t, 0);
    this.pluginListeners = {}, this.pluginReducers = {}, this.state.plugins = {}, this.state.core = { ...this.initialCoreState };
  }
}
const _ = (s) => ({
  scale: (s == null ? void 0 : s.scale) ?? 1,
  rotation: (s == null ? void 0 : s.rotation) ?? T.Degree0,
  document: null,
  pages: [],
  loading: !1,
  error: null
}), Q = (s) => s.pages.map(
  (t) => t.map((e) => ({
    ...e,
    rotatedSize: A(e.size, s.rotation, 1)
  }))
), L = (s, t) => {
  switch (t.type) {
    case S:
      return {
        ...s,
        loading: !0,
        error: null
      };
    case m:
      return {
        ...s,
        document: t.payload,
        pages: t.payload.pages.map((e) => [e]),
        loading: !1,
        error: null
      };
    case P:
      return {
        ...s,
        rotation: t.payload
      };
    case R:
      return {
        ...s,
        pages: t.payload
      };
    case b:
      return {
        ...s,
        loading: !1,
        error: t.payload
      };
    case E:
      return {
        ...s,
        scale: t.payload
      };
    default:
      return s;
  }
};
class V {
  constructor(t, e) {
    this.plugins = /* @__PURE__ */ new Map(), this.manifests = /* @__PURE__ */ new Map(), this.capabilities = /* @__PURE__ */ new Map(), this.status = /* @__PURE__ */ new Map(), this.configurations = /* @__PURE__ */ new Map(), this.engineInitialized = !1, this.initPromise = null, this.pendingRegistrations = [], this.processingRegistrations = [], this.initialized = !1, this.isInitializing = !1, this.pluginsReadyPromise = null, this.destroyed = !1, this.resolver = new C(), this.engine = t, this.initialCoreState = _(e), this.store = new $(L, this.initialCoreState);
  }
  /**
   * Ensure engine is initialized before proceeding
   */
  async ensureEngineInitialized() {
    this.engineInitialized || (this.engine.initialize ? (await this.engine.initialize().toPromise(), this.engineInitialized = !0) : this.engineInitialized = !0);
  }
  /**
   * Register a plugin without initializing it
   */
  registerPlugin(t, e) {
    if (this.initialized && !this.isInitializing)
      throw new u("Cannot register plugins after initialization");
    this.validateManifest(t.manifest), this.store.addPluginReducer(
      t.manifest.id,
      // We need one type assertion here since we can't fully reconcile TAction with Action
      // due to TypeScript's type system limitations with generic variance
      t.reducer,
      typeof t.initialState == "function" ? t.initialState(
        this.initialCoreState,
        {
          ...t.manifest.defaultConfig,
          ...e
        }
      ) : t.initialState
    ), this.pendingRegistrations.push({
      package: t,
      config: e
    });
  }
  /**
   * Get the central store instance
   */
  getStore() {
    return this.store;
  }
  /**
   * Get the engine instance
   */
  getEngine() {
    return this.engine;
  }
  /**
   * Get a promise that resolves when all plugins are ready
   */
  pluginsReady() {
    return this.pluginsReadyPromise ? this.pluginsReadyPromise : (this.pluginsReadyPromise = (async () => {
      this.initialized || await this.initialize();
      const t = Array.from(this.plugins.values()).map(
        (e) => typeof e.ready == "function" ? e.ready() : Promise.resolve()
      );
      await Promise.all(t);
    })(), this.pluginsReadyPromise);
  }
  /**
   * INITIALISE THE REGISTRY – runs once no-matter-how-many calls   *
   */
  async initialize() {
    if (this.destroyed)
      throw new u("Registry has been destroyed");
    return this.initPromise ? this.initPromise : (this.initPromise = (async () => {
      var t;
      if (this.initialized)
        throw new u("Registry is already initialized");
      this.isInitializing = !0;
      try {
        if (await this.ensureEngineInitialized(), this.destroyed)
          return;
        for (; this.pendingRegistrations.length > 0; ) {
          if (this.destroyed)
            return;
          this.processingRegistrations = [...this.pendingRegistrations], this.pendingRegistrations = [];
          for (const i of this.processingRegistrations) {
            const r = /* @__PURE__ */ new Set(), n = [...i.package.manifest.requires, ...i.package.manifest.optional];
            for (const o of n) {
              const a = this.processingRegistrations.find(
                (l) => l.package.manifest.provides.includes(o)
              );
              a && r.add(a.package.manifest.id);
            }
            this.resolver.addNode(i.package.manifest.id, [...r]);
          }
          const e = this.resolver.resolveLoadOrder();
          for (const i of e) {
            const r = this.processingRegistrations.find((n) => n.package.manifest.id === i);
            await this.initializePlugin(r.package.manifest, r.package.create, r.config);
          }
          this.processingRegistrations = [], this.resolver = new C();
        }
        for (const e of this.plugins.values())
          await ((t = e.postInitialize) == null ? void 0 : t.call(e).catch((i) => {
            console.error(`Error in postInitialize for plugin ${e.id}`, i), this.status.set(e.id, "error");
          }));
        this.initialized = !0;
      } catch (e) {
        throw e instanceof Error ? new z(
          `Failed to resolve plugin dependencies: ${e.message}`
        ) : e;
      } finally {
        this.isInitializing = !1;
      }
    })(), this.initPromise);
  }
  /**
   * Initialize a single plugin with all necessary checks
   */
  async initializePlugin(t, e, i) {
    const r = {
      ...t.defaultConfig,
      ...i
    };
    this.validateConfig(t.id, r, t.defaultConfig);
    const n = e(this, this.engine, r);
    this.validatePlugin(n);
    for (const o of t.requires)
      if (!this.capabilities.has(o))
        throw new u(
          `Missing required capability: ${o} for plugin ${t.id}`
        );
    for (const o of t.optional)
      this.capabilities.has(o) && console.debug(`Optional capability ${o} is available for plugin ${t.id}`);
    console.log("initializePlugin", t.id, t.provides);
    for (const o of t.provides) {
      if (this.capabilities.has(o))
        throw new u(
          `Capability ${o} is already provided by plugin ${this.capabilities.get(o)}`
        );
      this.capabilities.set(o, t.id);
    }
    this.plugins.set(t.id, n), this.manifests.set(t.id, t), this.status.set(t.id, "registered"), this.configurations.set(t.id, r);
    try {
      n.initialize && await n.initialize(r), this.status.set(t.id, "active");
    } catch (o) {
      throw this.plugins.delete(t.id), this.manifests.delete(t.id), console.log("initializePlugin failed", t.id, t.provides), t.provides.forEach((a) => this.capabilities.delete(a)), o;
    }
  }
  getPluginConfig(t) {
    const e = this.configurations.get(t);
    if (!e)
      throw new d(`Configuration for plugin ${t} not found`);
    return e;
  }
  validateConfig(t, e, i) {
    const n = Object.keys(i).filter((o) => !e.hasOwnProperty(o));
    if (n.length > 0)
      throw new O(
        `Missing required configuration keys for plugin ${t}: ${n.join(", ")}`
      );
  }
  async updatePluginConfig(t, e) {
    const i = this.getPlugin(t);
    if (!i)
      throw new d(`Plugin ${t} not found`);
    const r = this.manifests.get(t), n = this.configurations.get(t);
    if (!r || !n)
      throw new d(`Plugin ${t} not found`);
    const o = {
      ...n,
      ...e
    };
    this.validateConfig(t, o, r.defaultConfig), this.configurations.set(t, o), i.initialize && await i.initialize(o);
  }
  /**
   * Register multiple plugins at once
   */
  registerPluginBatch(t) {
    for (const e of t)
      this.registerPlugin(e.package, e.config);
  }
  /**
   * Unregister a plugin
   */
  async unregisterPlugin(t) {
    const e = this.plugins.get(t);
    if (!e)
      throw new d(`Plugin ${t} is not registered`);
    const i = this.manifests.get(t);
    if (!i)
      throw new d(`Manifest for plugin ${t} not found`);
    for (const [r, n] of this.manifests.entries()) {
      if (r === t) continue;
      if ([...n.requires, ...n.optional].some(
        (a) => i.provides.includes(a)
      ))
        throw new u(
          `Cannot unregister plugin ${t}: plugin ${r} depends on it`
        );
    }
    try {
      e.destroy && await e.destroy();
      for (const r of i.provides)
        this.capabilities.delete(r);
      this.plugins.delete(t), this.manifests.delete(t), this.status.delete(t);
    } catch (r) {
      throw r instanceof Error ? new Error(`Failed to unregister plugin ${t}: ${r.message}`) : r;
    }
  }
  /**
   * Get a plugin instance
   * @param pluginId The ID of the plugin to get
   * @returns The plugin instance or null if not found
   */
  getPlugin(t) {
    const e = this.plugins.get(t);
    return e || null;
  }
  /**
   * Get a plugin that provides a specific capability
   * @param capability The capability to get a provider for
   * @returns The plugin providing the capability or null if not found
   */
  getCapabilityProvider(t) {
    const e = this.capabilities.get(t);
    return e ? this.getPlugin(e) : null;
  }
  /**
   * Check if a capability is available
   */
  hasCapability(t) {
    return this.capabilities.has(t);
  }
  /**
   * Get all registered plugins
   */
  getAllPlugins() {
    return Array.from(this.plugins.values());
  }
  /**
   * Get plugin status
   */
  getPluginStatus(t) {
    const e = this.status.get(t);
    if (!e)
      throw new d(`Plugin ${t} not found`);
    return e;
  }
  /**
   * Validate plugin object
   */
  validatePlugin(t) {
    if (!t.id)
      throw new u("Plugin must have an id");
  }
  /**
   * Validate plugin manifest
   */
  validateManifest(t) {
    if (!t.id)
      throw new u("Manifest must have an id");
    if (!t.name)
      throw new u("Manifest must have a name");
    if (!t.version)
      throw new u("Manifest must have a version");
    if (!Array.isArray(t.provides))
      throw new u("Manifest must have a provides array");
    if (!Array.isArray(t.requires))
      throw new u("Manifest must have a requires array");
    if (!Array.isArray(t.optional))
      throw new u("Manifest must have an optional array");
  }
  isDestroyed() {
    return this.destroyed;
  }
  /**
   * DESTROY EVERYTHING – waits for any ongoing initialise(), once  *
   */
  async destroy() {
    var t;
    if (this.destroyed) throw new u("Registry has already been destroyed");
    this.destroyed = !0;
    try {
      await this.initPromise;
    } catch {
    }
    for (const e of Array.from(this.plugins.values()).reverse())
      await ((t = e.destroy) == null ? void 0 : t.call(e));
    this.store.destroy(), this.plugins.clear(), this.manifests.clear(), this.capabilities.clear(), this.status.clear(), this.pendingRegistrations.length = 0, this.processingRegistrations.length = 0;
  }
}
function X(s, t) {
  return {
    package: s,
    config: t
  };
}
class Z {
  constructor(t, e) {
    if (this.id = t, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i, r, n) => {
      this.onStoreUpdated(n, r);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i, r, n) => {
      this.onCoreStoreUpdated(n, r);
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
    const i = Date.now(), r = this.debouncedActions[t.type] || 0;
    return i - r >= e ? (this.debouncedActions[t.type] = i, this.dispatch(t), !0) : !1;
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
class N {
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
function tt(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function f(s, t, e) {
  if (s === t)
    return !0;
  if (s == null || t == null)
    return s === t;
  const i = typeof s;
  if (i !== typeof t) return !1;
  if (i === "object") {
    e || (e = /* @__PURE__ */ new Set());
    const n = F(s, t);
    if (e.has(n))
      return !0;
    e.add(n);
    const o = Array.isArray(s), a = Array.isArray(t);
    return o && a ? q(s, t, e) : !o && !a ? I(s, t, e) : !1;
  }
  return !1;
}
function F(s, t) {
  return `${v(s)}__${v(t)}`;
}
let k = 0;
const w = /* @__PURE__ */ new WeakMap();
function v(s) {
  return w.has(s) || w.set(s, ++k), w.get(s);
}
function q(s, t, e) {
  if (s.length !== t.length) return !1;
  const i = new Array(t.length).fill(!1);
  t: for (let r = 0; r < s.length; r++) {
    const n = s[r];
    for (let o = 0; o < t.length; o++)
      if (!i[o] && f(n, t[o], e)) {
        i[o] = !0;
        continue t;
      }
    return !1;
  }
  return !0;
}
function I(s, t, e) {
  const i = Object.keys(s).sort(), r = Object.keys(t).sort();
  if (i.length !== r.length) return !1;
  for (let n = 0; n < i.length; n++)
    if (i[n] !== r[n]) return !1;
  for (const n of i) {
    const o = s[n], a = t[n];
    if (!f(o, a, e))
      return !1;
  }
  return !0;
}
function et() {
  const s = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => s.forEach((i) => i(e)),
    on: (e) => (s.add(e), () => s.delete(e)),
    off: (e) => s.delete(e),
    clear: () => s.clear()
  };
}
function it(s, t = f) {
  const e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let r = s;
  const n = (a) => e.forEach((l) => l(a)), o = (a, l) => {
    let h = a, g = () => {
    };
    if (l) {
      const c = new N(a, l);
      h = c.handle, g = () => c.destroy(), i.set(a, { wrapped: h, destroy: g });
    }
    return r !== void 0 && h(r), e.add(h), () => {
      e.delete(h), g(), i.delete(a);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return r;
    },
    emit(a = void 0) {
      (r === void 0 || !t(r, a)) && (r = a, n(a));
    },
    on: o,
    off(a) {
      const l = i.get(a);
      l ? (e.delete(l.wrapped), l.destroy(), i.delete(a)) : e.delete(a);
    },
    clear() {
      e.clear(), i.forEach((a) => a.destroy()), i.clear();
    },
    /* derived hook --------------------------------------------- */
    select(a, l = f) {
      return (h, g) => {
        let c;
        if (r !== void 0) {
          const p = a(r);
          c = p, h(p);
        }
        return o(
          (p) => {
            const y = a(p);
            (c === void 0 || !l(c, y)) && (c = y, h(y));
          },
          g
        );
      };
    }
  };
}
function st(s) {
  return Object.entries(s).map(([t, e]) => {
    const i = Number(t);
    return [Number.isFinite(i) && t.trim() !== "" ? i : t, e];
  });
}
export {
  Z as BasePlugin,
  D as CORE_ACTION_TYPES,
  G as CapabilityConflictError,
  j as CapabilityNotFoundError,
  z as CircularDependencyError,
  C as DependencyResolver,
  N as EventControl,
  S as LOAD_DOCUMENT,
  O as PluginConfigurationError,
  x as PluginInitializationError,
  d as PluginNotFoundError,
  u as PluginRegistrationError,
  V as PluginRegistry,
  m as SET_DOCUMENT,
  b as SET_DOCUMENT_ERROR,
  R as SET_PAGES,
  P as SET_ROTATION,
  E as SET_SCALE,
  f as arePropsEqual,
  tt as clamp,
  it as createBehaviorEmitter,
  et as createEmitter,
  X as createPluginRegistration,
  st as enumEntries,
  Q as getPagesWithRotatedSize,
  _ as initialCoreState,
  K as loadDocument,
  B as setDocument,
  W as setDocumentError,
  J as setPages,
  H as setRotation,
  Y as setScale
};
//# sourceMappingURL=index.js.map
