class b {
  constructor() {
    this.dependencyGraph = /* @__PURE__ */ new Map();
  }
  addNode(e, t = []) {
    this.dependencyGraph.set(e, new Set(t));
  }
  hasCircularDependencies() {
    const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set(), r = (s) => {
      e.add(s), t.add(s);
      const n = this.dependencyGraph.get(s) || /* @__PURE__ */ new Set();
      for (const a of n)
        if (e.has(a)) {
          if (t.has(a))
            return !0;
        } else if (r(a)) return !0;
      return t.delete(s), !1;
    };
    for (const s of this.dependencyGraph.keys())
      if (!e.has(s) && r(s))
        return !0;
    return !1;
  }
  resolveLoadOrder() {
    if (this.hasCircularDependencies())
      throw new Error("Circular dependencies detected");
    const e = [], t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), s = (n) => {
      if (r.has(n)) throw new Error("Circular dependency");
      if (t.has(n)) return;
      r.add(n);
      const a = this.dependencyGraph.get(n) || /* @__PURE__ */ new Set();
      for (const o of a)
        s(o);
      r.delete(n), t.add(n), e.push(n);
    };
    for (const n of this.dependencyGraph.keys())
      t.has(n) || s(n);
    return e;
  }
}
class l extends Error {
  constructor(e) {
    super(e), this.name = "PluginRegistrationError";
  }
}
class u extends Error {
  constructor(e) {
    super(e), this.name = "PluginNotFoundError";
  }
}
class m extends Error {
  constructor(e) {
    super(e), this.name = "CircularDependencyError";
  }
}
class K extends Error {
  constructor(e) {
    super(e), this.name = "CapabilityNotFoundError";
  }
}
class H extends Error {
  constructor(e) {
    super(e), this.name = "CapabilityConflictError";
  }
}
class W extends Error {
  constructor(e) {
    super(e), this.name = "PluginInitializationError";
  }
}
class R extends Error {
  constructor(e) {
    super(e), this.name = "PluginConfigurationError";
  }
}
class D {
  /**
   * Initializes the PluginStore with the main store and plugin ID.
   * @param store The main store instance.
   * @param pluginId The unique identifier for the plugin.
   */
  constructor(e, t) {
    this.store = e, this.pluginId = t;
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
  dispatch(e) {
    return this.store.dispatchToPlugin(this.pluginId, e);
  }
  /**
   * Subscribes to state changes only for this specific plugin.
   * You now receive (action, newPluginState, oldPluginState) in the callback.
   *
   * @param listener The callback to invoke when plugin state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribeToState(e) {
    return this.store.subscribeToPlugin(this.pluginId, (t, r, s) => {
      e(
        t,
        r,
        s
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
  onAction(e, t) {
    return this.store.onAction(e, (r, s, n) => {
      t(
        r,
        s.plugins[this.pluginId],
        n.plugins[this.pluginId]
      );
    });
  }
}
const g = "LOAD_DOCUMENT", f = "SET_DOCUMENT", p = "SET_DOCUMENT_ERROR", y = "SET_SCALE", w = "SET_ROTATION", E = "SET_PAGES", O = [
  g,
  f,
  p,
  y,
  w,
  E
], Z = () => ({ type: g }), I = (i) => ({
  type: f,
  payload: i
}), V = (i) => ({
  type: p,
  payload: i
}), J = (i) => ({ type: y, payload: i }), Y = (i) => ({
  type: w,
  payload: i
}), Q = (i) => ({
  type: E,
  payload: i
});
class A {
  /**
   * Initializes the store with the provided core state.
   * @param reducer          The core reducer function
   * @param initialCoreState The initial core state
   */
  constructor(e, t) {
    this.initialCoreState = t, this.pluginReducers = {}, this.listeners = [], this.pluginListeners = {}, this.state = { core: t, plugins: {} }, this.coreReducer = e;
  }
  /**
   * Adds a reducer for a plugin-specific state.
   * @param pluginId The unique identifier for the plugin.
   * @param reducer The reducer function for the plugin state.
   * @param initialState The initial state for the plugin.
   */
  addPluginReducer(e, t, r) {
    this.state.plugins[e] = r, this.pluginReducers[e] = t;
  }
  /**
   * Dispatches an action *only* to the core reducer.
   * Notifies the global store listeners with (action, newState, oldState).
   *
   * @param action The action to dispatch, typed as CoreAction
   * @returns The updated *global* store state
   */
  dispatchToCore(e) {
    if (!this.coreReducer)
      return this.getState();
    const t = this.getState();
    this.state.core = this.coreReducer(this.state.core, e);
    const r = this.getState();
    return this.listeners.forEach((s) => s(e, r, t)), r;
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
  dispatchToPlugin(e, t, r = !0) {
    const s = this.getState(), n = this.pluginReducers[e];
    if (!n)
      return s;
    const a = s.plugins[e], o = n(a, t);
    this.state.plugins[e] = o;
    const c = this.getState();
    return r && this.listeners.forEach((h) => h(t, c, s)), this.pluginListeners[e] && this.pluginListeners[e].forEach((h) => {
      h(t, o, a);
    }), o;
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
  dispatch(e) {
    const t = this.getState();
    this.isCoreAction(e) && (this.state.core = this.coreReducer(this.state.core, e));
    for (const s in this.pluginReducers) {
      const n = this.pluginReducers[s], a = t.plugins[s];
      n && (this.state.plugins[s] = n(a, e));
    }
    const r = this.getState();
    return this.listeners.forEach((s) => s(e, r, t)), r;
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
  subscribe(e) {
    return this.listeners.push(e), () => {
      this.listeners = this.listeners.filter((t) => t !== e);
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
  subscribeToPlugin(e, t) {
    if (!(e in this.state.plugins))
      throw new Error(
        `Plugin state not found for plugin "${e}". Did you forget to call addPluginReducer?`
      );
    return this.pluginListeners[e] || (this.pluginListeners[e] = []), this.pluginListeners[e].push(t), () => {
      this.pluginListeners[e] = this.pluginListeners[e].filter((r) => r !== t), this.pluginListeners[e].length === 0 && delete this.pluginListeners[e];
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
  onAction(e, t) {
    return this.subscribe((r, s, n) => {
      r.type === e && t(r, s, n);
    });
  }
  /**
   * Gets a PluginStore handle for a specific plugin.
   * @param pluginId The unique identifier for the plugin.
   * @returns A PluginStore instance for the plugin.
   */
  getPluginStore(e) {
    if (!(e in this.state.plugins))
      throw new Error(
        `Plugin state not found for plugin "${e}". Did you forget to call addPluginReducer?`
      );
    return new D(this, e);
  }
  /**
   * Helper method to check if an action is a CoreAction.
   * Adjust if you have a more refined way to differentiate CoreAction vs. any other Action.
   */
  isCoreAction(e) {
    return O.includes(e.type);
  }
  /**
   * Destroy the store: drop every listener and plugin reducer
   */
  destroy() {
    var e, t;
    this.listeners.length = 0;
    for (const r in this.pluginListeners)
      (t = (e = this.pluginListeners[r]) == null ? void 0 : e.splice) == null || t.call(e, 0);
    this.pluginListeners = {}, this.pluginReducers = {}, this.state.plugins = {}, this.state.core = { ...this.initialCoreState };
  }
}
var C = /* @__PURE__ */ ((i) => (i[i.Degree0 = 0] = "Degree0", i[i.Degree90 = 1] = "Degree90", i[i.Degree180 = 2] = "Degree180", i[i.Degree270 = 3] = "Degree270", i))(C || {});
function T(i) {
  const { width: e, height: t } = i;
  return {
    width: t,
    height: e
  };
}
function X(i, e, t) {
  return i = e % 2 === 0 ? i : T(i), {
    width: i.width * t,
    height: i.height * t
  };
}
var z = "­", M = "​", L = "⁠", $ = "\uFEFF", F = "￾", N = "￿", k = Object.freeze([
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
const j = (i) => ({
  scale: (i == null ? void 0 : i.scale) ?? 1,
  rotation: (i == null ? void 0 : i.rotation) ?? C.Degree0,
  document: null,
  pages: [],
  loading: !1,
  error: null
}), q = (i, e) => {
  switch (e.type) {
    case g:
      return {
        ...i,
        loading: !0,
        error: null
      };
    case f:
      return {
        ...i,
        document: e.payload,
        pages: e.payload.pages.map((t) => [t]),
        loading: !1,
        error: null
      };
    case w:
      return {
        ...i,
        rotation: e.payload
      };
    case E:
      return {
        ...i,
        pages: e.payload
      };
    case p:
      return {
        ...i,
        loading: !1,
        error: e.payload
      };
    case y:
      return {
        ...i,
        scale: e.payload
      };
    default:
      return i;
  }
};
class ee {
  constructor(e, t) {
    this.plugins = /* @__PURE__ */ new Map(), this.manifests = /* @__PURE__ */ new Map(), this.capabilities = /* @__PURE__ */ new Map(), this.status = /* @__PURE__ */ new Map(), this.configurations = /* @__PURE__ */ new Map(), this.engineInitialized = !1, this.initPromise = null, this.pendingRegistrations = [], this.processingRegistrations = [], this.initialized = !1, this.isInitializing = !1, this.pluginsReadyPromise = null, this.destroyed = !1, this.resolver = new b(), this.engine = e, this.initialCoreState = j(t), this.store = new A(q, this.initialCoreState);
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
  registerPlugin(e, t) {
    if (this.initialized && !this.isInitializing)
      throw new l("Cannot register plugins after initialization");
    this.validateManifest(e.manifest), this.store.addPluginReducer(
      e.manifest.id,
      // We need one type assertion here since we can't fully reconcile TAction with Action
      // due to TypeScript's type system limitations with generic variance
      e.reducer,
      typeof e.initialState == "function" ? e.initialState(
        this.initialCoreState,
        {
          ...e.manifest.defaultConfig,
          ...t
        }
      ) : e.initialState
    ), this.pendingRegistrations.push({
      package: e,
      config: t
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
      const e = Array.from(this.plugins.values()).map(
        (t) => typeof t.ready == "function" ? t.ready() : Promise.resolve()
      );
      await Promise.all(e);
    })(), this.pluginsReadyPromise);
  }
  /**
   * INITIALISE THE REGISTRY – runs once no-matter-how-many calls   *
   */
  async initialize() {
    if (this.destroyed)
      throw new l("Registry has been destroyed");
    return this.initPromise ? this.initPromise : (this.initPromise = (async () => {
      var e;
      if (this.initialized)
        throw new l("Registry is already initialized");
      this.isInitializing = !0;
      try {
        if (await this.ensureEngineInitialized(), this.destroyed)
          return;
        for (; this.pendingRegistrations.length > 0; ) {
          if (this.destroyed)
            return;
          this.processingRegistrations = [...this.pendingRegistrations], this.pendingRegistrations = [];
          for (const r of this.processingRegistrations) {
            const s = /* @__PURE__ */ new Set(), n = [...r.package.manifest.requires, ...r.package.manifest.optional];
            for (const a of n) {
              const o = this.processingRegistrations.find(
                (c) => c.package.manifest.provides.includes(a)
              );
              o && s.add(o.package.manifest.id);
            }
            this.resolver.addNode(r.package.manifest.id, [...s]);
          }
          const t = this.resolver.resolveLoadOrder();
          for (const r of t) {
            const s = this.processingRegistrations.find((n) => n.package.manifest.id === r);
            await this.initializePlugin(s.package.manifest, s.package.create, s.config);
          }
          this.processingRegistrations = [], this.resolver = new b();
        }
        for (const t of this.plugins.values())
          await ((e = t.postInitialize) == null ? void 0 : e.call(t).catch((r) => {
            console.error(`Error in postInitialize for plugin ${t.id}`, r), this.status.set(t.id, "error");
          }));
        this.initialized = !0;
      } catch (t) {
        throw t instanceof Error ? new m(
          `Failed to resolve plugin dependencies: ${t.message}`
        ) : t;
      } finally {
        this.isInitializing = !1;
      }
    })(), this.initPromise);
  }
  /**
   * Initialize a single plugin with all necessary checks
   */
  async initializePlugin(e, t, r) {
    const s = {
      ...e.defaultConfig,
      ...r
    };
    this.validateConfig(e.id, s, e.defaultConfig);
    const n = t(this, this.engine, s);
    this.validatePlugin(n);
    for (const a of e.requires)
      if (!this.capabilities.has(a))
        throw new l(
          `Missing required capability: ${a} for plugin ${e.id}`
        );
    for (const a of e.optional)
      this.capabilities.has(a) && console.debug(`Optional capability ${a} is available for plugin ${e.id}`);
    console.log("initializePlugin", e.id, e.provides);
    for (const a of e.provides) {
      if (this.capabilities.has(a))
        throw new l(
          `Capability ${a} is already provided by plugin ${this.capabilities.get(a)}`
        );
      this.capabilities.set(a, e.id);
    }
    this.plugins.set(e.id, n), this.manifests.set(e.id, e), this.status.set(e.id, "registered"), this.configurations.set(e.id, s);
    try {
      n.initialize && await n.initialize(s), this.status.set(e.id, "active");
    } catch (a) {
      throw this.plugins.delete(e.id), this.manifests.delete(e.id), console.log("initializePlugin failed", e.id, e.provides), e.provides.forEach((o) => this.capabilities.delete(o)), a;
    }
  }
  getPluginConfig(e) {
    const t = this.configurations.get(e);
    if (!t)
      throw new u(`Configuration for plugin ${e} not found`);
    return t;
  }
  validateConfig(e, t, r) {
    const n = Object.keys(r).filter((a) => !t.hasOwnProperty(a));
    if (n.length > 0)
      throw new R(
        `Missing required configuration keys for plugin ${e}: ${n.join(", ")}`
      );
  }
  async updatePluginConfig(e, t) {
    const r = this.getPlugin(e);
    if (!r)
      throw new u(`Plugin ${e} not found`);
    const s = this.manifests.get(e), n = this.configurations.get(e);
    if (!s || !n)
      throw new u(`Plugin ${e} not found`);
    const a = {
      ...n,
      ...t
    };
    this.validateConfig(e, a, s.defaultConfig), this.configurations.set(e, a), r.initialize && await r.initialize(a);
  }
  /**
   * Register multiple plugins at once
   */
  registerPluginBatch(e) {
    for (const t of e)
      this.registerPlugin(t.package, t.config);
  }
  /**
   * Unregister a plugin
   */
  async unregisterPlugin(e) {
    const t = this.plugins.get(e);
    if (!t)
      throw new u(`Plugin ${e} is not registered`);
    const r = this.manifests.get(e);
    if (!r)
      throw new u(`Manifest for plugin ${e} not found`);
    for (const [s, n] of this.manifests.entries()) {
      if (s === e) continue;
      if ([...n.requires, ...n.optional].some(
        (o) => r.provides.includes(o)
      ))
        throw new l(
          `Cannot unregister plugin ${e}: plugin ${s} depends on it`
        );
    }
    try {
      t.destroy && await t.destroy();
      for (const s of r.provides)
        this.capabilities.delete(s);
      this.plugins.delete(e), this.manifests.delete(e), this.status.delete(e);
    } catch (s) {
      throw s instanceof Error ? new Error(`Failed to unregister plugin ${e}: ${s.message}`) : s;
    }
  }
  /**
   * Get a plugin instance
   * @param pluginId The ID of the plugin to get
   * @returns The plugin instance or null if not found
   */
  getPlugin(e) {
    const t = this.plugins.get(e);
    return t || null;
  }
  /**
   * Get a plugin that provides a specific capability
   * @param capability The capability to get a provider for
   * @returns The plugin providing the capability or null if not found
   */
  getCapabilityProvider(e) {
    const t = this.capabilities.get(e);
    return t ? this.getPlugin(t) : null;
  }
  /**
   * Check if a capability is available
   */
  hasCapability(e) {
    return this.capabilities.has(e);
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
  getPluginStatus(e) {
    const t = this.status.get(e);
    if (!t)
      throw new u(`Plugin ${e} not found`);
    return t;
  }
  /**
   * Validate plugin object
   */
  validatePlugin(e) {
    if (!e.id)
      throw new l("Plugin must have an id");
  }
  /**
   * Validate plugin manifest
   */
  validateManifest(e) {
    if (!e.id)
      throw new l("Manifest must have an id");
    if (!e.name)
      throw new l("Manifest must have a name");
    if (!e.version)
      throw new l("Manifest must have a version");
    if (!Array.isArray(e.provides))
      throw new l("Manifest must have a provides array");
    if (!Array.isArray(e.requires))
      throw new l("Manifest must have a requires array");
    if (!Array.isArray(e.optional))
      throw new l("Manifest must have an optional array");
  }
  isDestroyed() {
    return this.destroyed;
  }
  /**
   * DESTROY EVERYTHING – waits for any ongoing initialise(), once  *
   */
  async destroy() {
    var e;
    if (this.destroyed) throw new l("Registry has already been destroyed");
    this.destroyed = !0;
    try {
      await this.initPromise;
    } catch {
    }
    for (const t of Array.from(this.plugins.values()).reverse())
      await ((e = t.destroy) == null ? void 0 : e.call(t));
    this.store.destroy(), this.plugins.clear(), this.manifests.clear(), this.capabilities.clear(), this.status.clear(), this.pendingRegistrations.length = 0, this.processingRegistrations.length = 0;
  }
}
function te(i, e, t) {
  return i < e ? e : i > t ? t : i;
}
function v(i, e, t) {
  if (i === e)
    return !0;
  if (i == null || e == null)
    return i === e;
  const r = typeof i;
  if (r !== typeof e) return !1;
  if (r === "object") {
    t || (t = /* @__PURE__ */ new Set());
    const n = x(i, e);
    if (t.has(n))
      return !0;
    t.add(n);
    const a = Array.isArray(i), o = Array.isArray(e);
    return a && o ? U(i, e, t) : !a && !o ? B(i, e, t) : !1;
  }
  return !1;
}
function x(i, e) {
  return `${S(i)}__${S(e)}`;
}
let G = 0;
const d = /* @__PURE__ */ new WeakMap();
function S(i) {
  return d.has(i) || d.set(i, ++G), d.get(i);
}
function U(i, e, t) {
  if (i.length !== e.length) return !1;
  const r = new Array(e.length).fill(!1);
  e: for (let s = 0; s < i.length; s++) {
    const n = i[s];
    for (let a = 0; a < e.length; a++)
      if (!r[a] && v(n, e[a], t)) {
        r[a] = !0;
        continue e;
      }
    return !1;
  }
  return !0;
}
function B(i, e, t) {
  const r = Object.keys(i).sort(), s = Object.keys(e).sort();
  if (r.length !== s.length) return !1;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s[n]) return !1;
  for (const n of r) {
    const a = i[n], o = e[n];
    if (!v(a, o, t))
      return !1;
  }
  return !0;
}
export {
  m as C,
  b as D,
  g as L,
  ee as P,
  f as S,
  v as a,
  l as b,
  u as c,
  K as d,
  H as e,
  W as f,
  R as g,
  p as h,
  y as i,
  w as j,
  E as k,
  O as l,
  Z as m,
  V as n,
  J as o,
  Y as p,
  Q as q,
  j as r,
  I as s,
  X as t,
  te as u
};
//# sourceMappingURL=math-ChSRQF3r.js.map
