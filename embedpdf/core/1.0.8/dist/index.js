// src/lib/utils/dependency-resolver.ts
var DependencyResolver = class {
  constructor() {
    this.dependencyGraph = /* @__PURE__ */ new Map();
  }
  addNode(id, dependencies = []) {
    this.dependencyGraph.set(id, new Set(dependencies));
  }
  hasCircularDependencies() {
    const visited = /* @__PURE__ */ new Set();
    const recursionStack = /* @__PURE__ */ new Set();
    const dfs = (id) => {
      visited.add(id);
      recursionStack.add(id);
      const dependencies = this.dependencyGraph.get(id) || /* @__PURE__ */ new Set();
      for (const dep of dependencies) {
        if (!visited.has(dep)) {
          if (dfs(dep)) return true;
        } else if (recursionStack.has(dep)) {
          return true;
        }
      }
      recursionStack.delete(id);
      return false;
    };
    for (const id of this.dependencyGraph.keys()) {
      if (!visited.has(id)) {
        if (dfs(id)) return true;
      }
    }
    return false;
  }
  resolveLoadOrder() {
    if (this.hasCircularDependencies()) {
      throw new Error("Circular dependencies detected");
    }
    const result = [];
    const visited = /* @__PURE__ */ new Set();
    const temp = /* @__PURE__ */ new Set();
    const visit = (id) => {
      if (temp.has(id)) throw new Error("Circular dependency");
      if (visited.has(id)) return;
      temp.add(id);
      const dependencies = this.dependencyGraph.get(id) || /* @__PURE__ */ new Set();
      for (const dep of dependencies) {
        visit(dep);
      }
      temp.delete(id);
      visited.add(id);
      result.push(id);
    };
    for (const id of this.dependencyGraph.keys()) {
      if (!visited.has(id)) {
        visit(id);
      }
    }
    return result;
  }
};

// src/lib/types/errors.ts
var PluginRegistrationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PluginRegistrationError";
  }
};
var PluginNotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PluginNotFoundError";
  }
};
var CircularDependencyError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CircularDependencyError";
  }
};
var CapabilityNotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CapabilityNotFoundError";
  }
};
var CapabilityConflictError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CapabilityConflictError";
  }
};
var PluginInitializationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PluginInitializationError";
  }
};
var PluginConfigurationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PluginConfigurationError";
  }
};

// src/lib/store/plugin-store.ts
var PluginStore = class {
  /**
   * Initializes the PluginStore with the main store and plugin ID.
   * @param store The main store instance.
   * @param pluginId The unique identifier for the plugin.
   */
  constructor(store, pluginId) {
    this.store = store;
    this.pluginId = pluginId;
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
  dispatch(action) {
    return this.store.dispatchToPlugin(this.pluginId, action);
  }
  /**
   * Subscribes to state changes only for this specific plugin.
   * You now receive (action, newPluginState, oldPluginState) in the callback.
   *
   * @param listener The callback to invoke when plugin state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribeToState(listener) {
    return this.store.subscribeToPlugin(this.pluginId, (action, newPluginState, oldPluginState) => {
      listener(
        action,
        newPluginState,
        oldPluginState
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
  onAction(type, handler) {
    return this.store.onAction(type, (action, state, oldState) => {
      handler(
        action,
        state.plugins[this.pluginId],
        oldState.plugins[this.pluginId]
      );
    });
  }
};

// src/lib/store/actions.ts
var LOAD_DOCUMENT = "LOAD_DOCUMENT";
var SET_DOCUMENT = "SET_DOCUMENT";
var SET_DOCUMENT_ERROR = "SET_DOCUMENT_ERROR";
var SET_SCALE = "SET_SCALE";
var SET_ROTATION = "SET_ROTATION";
var SET_PAGES = "SET_PAGES";
var CORE_ACTION_TYPES = [
  LOAD_DOCUMENT,
  SET_DOCUMENT,
  SET_DOCUMENT_ERROR,
  SET_SCALE,
  SET_ROTATION,
  SET_PAGES
];
var loadDocument = () => ({ type: LOAD_DOCUMENT });
var setDocument = (document) => ({
  type: SET_DOCUMENT,
  payload: document
});
var setDocumentError = (error) => ({
  type: SET_DOCUMENT_ERROR,
  payload: error
});
var setScale = (scale) => ({ type: SET_SCALE, payload: scale });
var setRotation = (rotation) => ({
  type: SET_ROTATION,
  payload: rotation
});
var setPages = (pages) => ({
  type: SET_PAGES,
  payload: pages
});

// src/lib/store/store.ts
var Store = class {
  /**
   * Initializes the store with the provided core state.
   * @param reducer          The core reducer function
   * @param initialCoreState The initial core state
   */
  constructor(reducer, initialCoreState2) {
    this.initialCoreState = initialCoreState2;
    this.pluginReducers = {};
    this.listeners = [];
    this.pluginListeners = {};
    this.state = { core: initialCoreState2, plugins: {} };
    this.coreReducer = reducer;
  }
  /**
   * Adds a reducer for a plugin-specific state.
   * @param pluginId The unique identifier for the plugin.
   * @param reducer The reducer function for the plugin state.
   * @param initialState The initial state for the plugin.
   */
  addPluginReducer(pluginId, reducer, initialState) {
    this.state.plugins[pluginId] = initialState;
    this.pluginReducers[pluginId] = reducer;
  }
  /**
   * Dispatches an action *only* to the core reducer.
   * Notifies the global store listeners with (action, newState, oldState).
   *
   * @param action The action to dispatch, typed as CoreAction
   * @returns The updated *global* store state
   */
  dispatchToCore(action) {
    if (!this.coreReducer) {
      return this.getState();
    }
    const oldState = this.getState();
    this.state.core = this.coreReducer(this.state.core, action);
    const newState = this.getState();
    this.listeners.forEach((listener) => listener(action, newState, oldState));
    return newState;
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
  dispatchToPlugin(pluginId, action, notifyGlobal = true) {
    const oldGlobalState = this.getState();
    const reducer = this.pluginReducers[pluginId];
    if (!reducer) {
      return oldGlobalState;
    }
    const oldPluginState = oldGlobalState.plugins[pluginId];
    const newPluginState = reducer(oldPluginState, action);
    this.state.plugins[pluginId] = newPluginState;
    const newGlobalState = this.getState();
    if (notifyGlobal) {
      this.listeners.forEach((listener) => listener(action, newGlobalState, oldGlobalState));
    }
    if (this.pluginListeners[pluginId]) {
      this.pluginListeners[pluginId].forEach((listener) => {
        listener(action, newPluginState, oldPluginState);
      });
    }
    return newPluginState;
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
  dispatch(action) {
    const oldState = this.getState();
    if (this.isCoreAction(action)) {
      this.state.core = this.coreReducer(this.state.core, action);
    }
    for (const pluginId in this.pluginReducers) {
      const reducer = this.pluginReducers[pluginId];
      const oldPluginState = oldState.plugins[pluginId];
      if (reducer) {
        this.state.plugins[pluginId] = reducer(oldPluginState, action);
      }
    }
    const newState = this.getState();
    this.listeners.forEach((listener) => listener(action, newState, oldState));
    return newState;
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
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
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
  subscribeToPlugin(pluginId, listener) {
    if (!(pluginId in this.state.plugins)) {
      throw new Error(
        `Plugin state not found for plugin "${pluginId}". Did you forget to call addPluginReducer?`
      );
    }
    if (!this.pluginListeners[pluginId]) {
      this.pluginListeners[pluginId] = [];
    }
    this.pluginListeners[pluginId].push(listener);
    return () => {
      this.pluginListeners[pluginId] = this.pluginListeners[pluginId].filter((l) => l !== listener);
      if (this.pluginListeners[pluginId].length === 0) {
        delete this.pluginListeners[pluginId];
      }
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
  onAction(type, handler) {
    return this.subscribe((action, newState, oldState) => {
      if (action.type === type) {
        handler(action, newState, oldState);
      }
    });
  }
  /**
   * Gets a PluginStore handle for a specific plugin.
   * @param pluginId The unique identifier for the plugin.
   * @returns A PluginStore instance for the plugin.
   */
  getPluginStore(pluginId) {
    if (!(pluginId in this.state.plugins)) {
      throw new Error(
        `Plugin state not found for plugin "${pluginId}". Did you forget to call addPluginReducer?`
      );
    }
    return new PluginStore(this, pluginId);
  }
  /**
   * Helper method to check if an action is a CoreAction.
   * Adjust if you have a more refined way to differentiate CoreAction vs. any other Action.
   */
  isCoreAction(action) {
    return CORE_ACTION_TYPES.includes(action.type);
  }
  /**
   * Destroy the store: drop every listener and plugin reducer
   */
  destroy() {
    this.listeners.length = 0;
    for (const id in this.pluginListeners) {
      this.pluginListeners[id]?.splice?.(0);
    }
    this.pluginListeners = {};
    this.pluginReducers = {};
    this.state.plugins = {};
    this.state.core = { ...this.initialCoreState };
  }
};

// src/lib/store/initial-state.ts
import { Rotation } from "@embedpdf/models";
var initialCoreState = (config) => ({
  scale: config?.scale ?? 1,
  rotation: config?.rotation ?? Rotation.Degree0,
  document: null,
  pages: [],
  loading: false,
  error: null
});

// src/lib/store/selectors.ts
import { transformSize } from "@embedpdf/models";
var getPagesWithRotatedSize = (state) => {
  return state.pages.map(
    (page) => page.map((p) => ({
      ...p,
      rotatedSize: transformSize(p.size, state.rotation, 1)
    }))
  );
};

// src/lib/store/reducer.ts
var coreReducer = (state, action) => {
  switch (action.type) {
    case LOAD_DOCUMENT:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SET_DOCUMENT:
      return {
        ...state,
        document: action.payload,
        pages: action.payload.pages.map((page) => [page]),
        loading: false,
        error: null
      };
    case SET_ROTATION:
      return {
        ...state,
        rotation: action.payload
      };
    case SET_PAGES:
      return {
        ...state,
        pages: action.payload
      };
    case SET_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_SCALE:
      return {
        ...state,
        scale: action.payload
      };
    default:
      return state;
  }
};

// src/lib/registry/plugin-registry.ts
var PluginRegistry = class {
  constructor(engine, config) {
    this.plugins = /* @__PURE__ */ new Map();
    this.manifests = /* @__PURE__ */ new Map();
    this.capabilities = /* @__PURE__ */ new Map();
    // capability -> pluginId
    this.status = /* @__PURE__ */ new Map();
    this.configurations = /* @__PURE__ */ new Map();
    this.engineInitialized = false;
    this.initPromise = null;
    this.pendingRegistrations = [];
    this.processingRegistrations = [];
    this.initialized = false;
    this.isInitializing = false;
    this.pluginsReadyPromise = null;
    this.destroyed = false;
    this.resolver = new DependencyResolver();
    this.engine = engine;
    this.initialCoreState = initialCoreState(config);
    this.store = new Store(coreReducer, this.initialCoreState);
  }
  /**
   * Ensure engine is initialized before proceeding
   */
  async ensureEngineInitialized() {
    if (this.engineInitialized) {
      return;
    }
    if (this.engine.initialize) {
      const task = this.engine.initialize();
      await task.toPromise();
      this.engineInitialized = true;
    } else {
      this.engineInitialized = true;
    }
  }
  /**
   * Register a plugin without initializing it
   */
  registerPlugin(pluginPackage, config) {
    if (this.initialized && !this.isInitializing) {
      throw new PluginRegistrationError("Cannot register plugins after initialization");
    }
    this.validateManifest(pluginPackage.manifest);
    this.store.addPluginReducer(
      pluginPackage.manifest.id,
      // We need one type assertion here since we can't fully reconcile TAction with Action
      // due to TypeScript's type system limitations with generic variance
      pluginPackage.reducer,
      "function" === typeof pluginPackage.initialState ? pluginPackage.initialState(
        this.initialCoreState,
        {
          ...pluginPackage.manifest.defaultConfig,
          ...config
        }
      ) : pluginPackage.initialState
    );
    this.pendingRegistrations.push({
      package: pluginPackage,
      config
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
    if (this.pluginsReadyPromise) {
      return this.pluginsReadyPromise;
    }
    this.pluginsReadyPromise = (async () => {
      if (!this.initialized) {
        await this.initialize();
      }
      const readyPromises = Array.from(this.plugins.values()).map(
        (p) => typeof p.ready === "function" ? p.ready() : Promise.resolve()
      );
      await Promise.all(readyPromises);
    })();
    return this.pluginsReadyPromise;
  }
  /**
   * INITIALISE THE REGISTRY – runs once no-matter-how-many calls   *
   */
  async initialize() {
    if (this.destroyed) {
      throw new PluginRegistrationError("Registry has been destroyed");
    }
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = (async () => {
      if (this.initialized) {
        throw new PluginRegistrationError("Registry is already initialized");
      }
      this.isInitializing = true;
      try {
        await this.ensureEngineInitialized();
        if (this.destroyed) {
          return;
        }
        while (this.pendingRegistrations.length > 0) {
          if (this.destroyed) {
            return;
          }
          this.processingRegistrations = [...this.pendingRegistrations];
          this.pendingRegistrations = [];
          for (const reg of this.processingRegistrations) {
            const dependsOn = /* @__PURE__ */ new Set();
            const allDeps = [...reg.package.manifest.requires, ...reg.package.manifest.optional];
            for (const cap of allDeps) {
              const provider = this.processingRegistrations.find(
                (r) => r.package.manifest.provides.includes(cap)
              );
              if (provider) dependsOn.add(provider.package.manifest.id);
            }
            this.resolver.addNode(reg.package.manifest.id, [...dependsOn]);
          }
          const loadOrder = this.resolver.resolveLoadOrder();
          for (const id of loadOrder) {
            const reg = this.processingRegistrations.find((r) => r.package.manifest.id === id);
            await this.initializePlugin(reg.package.manifest, reg.package.create, reg.config);
          }
          this.processingRegistrations = [];
          this.resolver = new DependencyResolver();
        }
        for (const plugin of this.plugins.values()) {
          await plugin.postInitialize?.().catch((e) => {
            console.error(`Error in postInitialize for plugin ${plugin.id}`, e);
            this.status.set(plugin.id, "error");
          });
        }
        this.initialized = true;
      } catch (err) {
        if (err instanceof Error) {
          throw new CircularDependencyError(
            `Failed to resolve plugin dependencies: ${err.message}`
          );
        }
        throw err;
      } finally {
        this.isInitializing = false;
      }
    })();
    return this.initPromise;
  }
  /**
   * Initialize a single plugin with all necessary checks
   */
  async initializePlugin(manifest, packageCreator, config) {
    const finalConfig = {
      ...manifest.defaultConfig,
      ...config
    };
    this.validateConfig(manifest.id, finalConfig, manifest.defaultConfig);
    const plugin = packageCreator(this, this.engine, finalConfig);
    this.validatePlugin(plugin);
    for (const capability of manifest.requires) {
      if (!this.capabilities.has(capability)) {
        throw new PluginRegistrationError(
          `Missing required capability: ${capability} for plugin ${manifest.id}`
        );
      }
    }
    for (const capability of manifest.optional) {
      if (this.capabilities.has(capability)) {
        console.debug(`Optional capability ${capability} is available for plugin ${manifest.id}`);
      }
    }
    console.log("initializePlugin", manifest.id, manifest.provides);
    for (const capability of manifest.provides) {
      if (this.capabilities.has(capability)) {
        throw new PluginRegistrationError(
          `Capability ${capability} is already provided by plugin ${this.capabilities.get(capability)}`
        );
      }
      this.capabilities.set(capability, manifest.id);
    }
    this.plugins.set(manifest.id, plugin);
    this.manifests.set(manifest.id, manifest);
    this.status.set(manifest.id, "registered");
    this.configurations.set(manifest.id, finalConfig);
    try {
      if (plugin.initialize) {
        await plugin.initialize(finalConfig);
      }
      this.status.set(manifest.id, "active");
    } catch (error) {
      this.plugins.delete(manifest.id);
      this.manifests.delete(manifest.id);
      console.log("initializePlugin failed", manifest.id, manifest.provides);
      manifest.provides.forEach((cap) => this.capabilities.delete(cap));
      throw error;
    }
  }
  getPluginConfig(pluginId) {
    const config = this.configurations.get(pluginId);
    if (!config) {
      throw new PluginNotFoundError(`Configuration for plugin ${pluginId} not found`);
    }
    return config;
  }
  validateConfig(pluginId, config, defaultConfig) {
    const requiredKeys = Object.keys(defaultConfig);
    const missingKeys = requiredKeys.filter((key) => !config.hasOwnProperty(key));
    if (missingKeys.length > 0) {
      throw new PluginConfigurationError(
        `Missing required configuration keys for plugin ${pluginId}: ${missingKeys.join(", ")}`
      );
    }
  }
  async updatePluginConfig(pluginId, config) {
    const plugin = this.getPlugin(pluginId);
    if (!plugin) {
      throw new PluginNotFoundError(`Plugin ${pluginId} not found`);
    }
    const manifest = this.manifests.get(pluginId);
    const currentConfig = this.configurations.get(pluginId);
    if (!manifest || !currentConfig) {
      throw new PluginNotFoundError(`Plugin ${pluginId} not found`);
    }
    const newConfig = {
      ...currentConfig,
      ...config
    };
    this.validateConfig(pluginId, newConfig, manifest.defaultConfig);
    this.configurations.set(pluginId, newConfig);
    if (plugin.initialize) {
      await plugin.initialize(newConfig);
    }
  }
  /**
   * Register multiple plugins at once
   */
  registerPluginBatch(registrations) {
    for (const reg of registrations) {
      this.registerPlugin(reg.package, reg.config);
    }
  }
  /**
   * Unregister a plugin
   */
  async unregisterPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new PluginNotFoundError(`Plugin ${pluginId} is not registered`);
    }
    const manifest = this.manifests.get(pluginId);
    if (!manifest) {
      throw new PluginNotFoundError(`Manifest for plugin ${pluginId} not found`);
    }
    for (const [otherId, otherManifest] of this.manifests.entries()) {
      if (otherId === pluginId) continue;
      const dependsOnThis = [...otherManifest.requires, ...otherManifest.optional].some(
        (cap) => manifest.provides.includes(cap)
      );
      if (dependsOnThis) {
        throw new PluginRegistrationError(
          `Cannot unregister plugin ${pluginId}: plugin ${otherId} depends on it`
        );
      }
    }
    try {
      if (plugin.destroy) {
        await plugin.destroy();
      }
      for (const capability of manifest.provides) {
        this.capabilities.delete(capability);
      }
      this.plugins.delete(pluginId);
      this.manifests.delete(pluginId);
      this.status.delete(pluginId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to unregister plugin ${pluginId}: ${error.message}`);
      }
      throw error;
    }
  }
  /**
   * Get a plugin instance
   * @param pluginId The ID of the plugin to get
   * @returns The plugin instance or null if not found
   */
  getPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      return null;
    }
    return plugin;
  }
  /**
   * Get a plugin that provides a specific capability
   * @param capability The capability to get a provider for
   * @returns The plugin providing the capability or null if not found
   */
  getCapabilityProvider(capability) {
    const pluginId = this.capabilities.get(capability);
    if (!pluginId) {
      return null;
    }
    return this.getPlugin(pluginId);
  }
  /**
   * Check if a capability is available
   */
  hasCapability(capability) {
    return this.capabilities.has(capability);
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
  getPluginStatus(pluginId) {
    const status = this.status.get(pluginId);
    if (!status) {
      throw new PluginNotFoundError(`Plugin ${pluginId} not found`);
    }
    return status;
  }
  /**
   * Validate plugin object
   */
  validatePlugin(plugin) {
    if (!plugin.id) {
      throw new PluginRegistrationError("Plugin must have an id");
    }
  }
  /**
   * Validate plugin manifest
   */
  validateManifest(manifest) {
    if (!manifest.id) {
      throw new PluginRegistrationError("Manifest must have an id");
    }
    if (!manifest.name) {
      throw new PluginRegistrationError("Manifest must have a name");
    }
    if (!manifest.version) {
      throw new PluginRegistrationError("Manifest must have a version");
    }
    if (!Array.isArray(manifest.provides)) {
      throw new PluginRegistrationError("Manifest must have a provides array");
    }
    if (!Array.isArray(manifest.requires)) {
      throw new PluginRegistrationError("Manifest must have a requires array");
    }
    if (!Array.isArray(manifest.optional)) {
      throw new PluginRegistrationError("Manifest must have an optional array");
    }
  }
  isDestroyed() {
    return this.destroyed;
  }
  /**
   * DESTROY EVERYTHING – waits for any ongoing initialise(), once  *
   */
  async destroy() {
    if (this.destroyed) throw new PluginRegistrationError("Registry has already been destroyed");
    this.destroyed = true;
    try {
      await this.initPromise;
    } catch {
    }
    for (const plugin of Array.from(this.plugins.values()).reverse()) {
      await plugin.destroy?.();
    }
    this.store.destroy();
    this.plugins.clear();
    this.manifests.clear();
    this.capabilities.clear();
    this.status.clear();
    this.pendingRegistrations.length = 0;
    this.processingRegistrations.length = 0;
  }
};

// src/lib/utils/plugin-helpers.ts
function createPluginRegistration(pluginPackage, config) {
  return {
    package: pluginPackage,
    config
  };
}

// src/lib/base/base-plugin.ts
var BasePlugin = class {
  constructor(id, registry) {
    this.id = id;
    this.registry = registry;
    // Track debounced actions
    this.debouncedActions = {};
    this.unsubscribeFromState = null;
    this.unsubscribeFromCoreStore = null;
    if (id !== this.constructor.id) {
      throw new Error(
        `Plugin ID mismatch: ${id} !== ${this.constructor.id}`
      );
    }
    this.coreStore = this.registry.getStore();
    this.pluginStore = this.coreStore.getPluginStore(this.id);
    this.unsubscribeFromState = this.pluginStore.subscribeToState((action, newState, oldState) => {
      this.onStoreUpdated(oldState, newState);
    });
    this.unsubscribeFromCoreStore = this.coreStore.subscribe((action, newState, oldState) => {
      this.onCoreStoreUpdated(oldState, newState);
    });
    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });
    this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const cap = this.buildCapability();
      this._capability = Object.freeze(cap);
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
  dispatchCoreAction(action) {
    return this.coreStore.dispatchToCore(action);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(action) {
    return this.coreStore.dispatch(action);
  }
  /**
   * Dispatch an action
   */
  dispatch(action) {
    return this.pluginStore.dispatch(action);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(action, debounceTime = 100) {
    const now = Date.now();
    const lastActionTime = this.debouncedActions[action.type] || 0;
    if (now - lastActionTime >= debounceTime) {
      this.debouncedActions[action.type] = now;
      this.dispatch(action);
      return true;
    }
    return false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(listener) {
    return this.pluginStore.subscribeToState(listener);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(listener) {
    return this.coreStore.subscribe(listener);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(oldState, newState) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(oldState, newState) {
  }
  /**
   * Cleanup method to be called when plugin is being destroyed
   */
  destroy() {
    if (this.unsubscribeFromState) {
      this.unsubscribeFromState();
      this.unsubscribeFromState = null;
    }
    if (this.unsubscribeFromCoreStore) {
      this.unsubscribeFromCoreStore();
      this.unsubscribeFromCoreStore = null;
    }
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
    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });
  }
};

// src/lib/utils/event-control.ts
var EventControl = class {
  constructor(handler, options) {
    this.handler = handler;
    this.options = options;
    this.lastRun = 0;
    this.handle = (data) => {
      if (this.options.mode === "debounce") {
        this.debounce(data);
      } else {
        this.throttle(data);
      }
    };
  }
  debounce(data) {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => {
      this.handler(data);
      this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(data) {
    if (this.options.mode === "debounce") return;
    const now = Date.now();
    const throttleMode = this.options.throttleMode || "leading-trailing";
    if (now - this.lastRun >= this.options.wait) {
      if (throttleMode === "leading-trailing") {
        this.handler(data);
      }
      this.lastRun = now;
    }
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(
      () => {
        this.handler(data);
        this.lastRun = Date.now();
        this.timeoutId = void 0;
      },
      this.options.wait - (now - this.lastRun)
    );
  }
  destroy() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }
};

// src/lib/utils/math.ts
function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
function arePropsEqual(a, b, visited) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return a === b;
  }
  const aType = typeof a;
  const bType = typeof b;
  if (aType !== bType) return false;
  if (aType === "object") {
    if (!visited) visited = /* @__PURE__ */ new Set();
    const pairId = getPairId(a, b);
    if (visited.has(pairId)) {
      return true;
    }
    visited.add(pairId);
    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);
    if (aIsArray && bIsArray) {
      return arraysEqualUnordered(a, b, visited);
    } else if (!aIsArray && !bIsArray) {
      return objectsEqual(a, b, visited);
    } else {
      return false;
    }
  }
  return false;
}
function getPairId(a, b) {
  return `${objectId(a)}__${objectId(b)}`;
}
var objectIdCounter = 0;
var objectIds = /* @__PURE__ */ new WeakMap();
function objectId(obj) {
  if (!objectIds.has(obj)) {
    objectIds.set(obj, ++objectIdCounter);
  }
  return objectIds.get(obj);
}
function arraysEqualUnordered(a, b, visited) {
  if (a.length !== b.length) return false;
  const used = new Array(b.length).fill(false);
  outer: for (let i = 0; i < a.length; i++) {
    const elemA = a[i];
    for (let j = 0; j < b.length; j++) {
      if (used[j]) continue;
      if (arePropsEqual(elemA, b[j], visited)) {
        used[j] = true;
        continue outer;
      }
    }
    return false;
  }
  return true;
}
function objectsEqual(a, b, visited) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) return false;
  for (let i = 0; i < aKeys.length; i++) {
    if (aKeys[i] !== bKeys[i]) return false;
  }
  for (const key of aKeys) {
    const valA = a[key];
    const valB = b[key];
    if (!arePropsEqual(valA, valB, visited)) {
      return false;
    }
  }
  return true;
}

// src/lib/utils/eventing.ts
function createEmitter() {
  const listeners = /* @__PURE__ */ new Set();
  const on = (l) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };
  return {
    emit: (v = void 0) => listeners.forEach((l) => l(v)),
    on,
    off: (l) => listeners.delete(l),
    clear: () => listeners.clear()
  };
}
function createBehaviorEmitter(initial, equality = arePropsEqual) {
  const listeners = /* @__PURE__ */ new Set();
  const proxyMap = /* @__PURE__ */ new Map();
  let _value = initial;
  const notify = (v) => listeners.forEach((l) => l(v));
  const baseOn = (listener, options) => {
    let realListener = listener;
    let destroy = () => {
    };
    if (options) {
      const ctl = new EventControl(listener, options);
      realListener = ctl.handle;
      destroy = () => ctl.destroy();
      proxyMap.set(listener, { wrapped: realListener, destroy });
    }
    if (_value !== void 0) realListener(_value);
    listeners.add(realListener);
    return () => {
      listeners.delete(realListener);
      destroy();
      proxyMap.delete(listener);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return _value;
    },
    emit(v = void 0) {
      if (_value === void 0 || !equality(_value, v)) {
        _value = v;
        notify(v);
      }
    },
    on: baseOn,
    off(listener) {
      const proxy = proxyMap.get(listener);
      if (proxy) {
        listeners.delete(proxy.wrapped);
        proxy.destroy();
        proxyMap.delete(listener);
      } else {
        listeners.delete(listener);
      }
    },
    clear() {
      listeners.clear();
      proxyMap.forEach((p) => p.destroy());
      proxyMap.clear();
    },
    /* derived hook --------------------------------------------- */
    select(selector, eq = arePropsEqual) {
      return (listener, options) => {
        let prev;
        if (_value !== void 0) {
          const mapped = selector(_value);
          prev = mapped;
          listener(mapped);
        }
        return baseOn(
          (next) => {
            const mapped = selector(next);
            if (prev === void 0 || !eq(prev, mapped)) {
              prev = mapped;
              listener(mapped);
            }
          },
          options
        );
      };
    }
  };
}

// src/lib/utils/typed-object.ts
function enumEntries(record) {
  return Object.entries(record).map(([k, v]) => {
    const maybeNum = Number(k);
    const typedKey = Number.isFinite(maybeNum) && k.trim() !== "" ? maybeNum : k;
    return [typedKey, v];
  });
}
export {
  BasePlugin,
  CORE_ACTION_TYPES,
  CapabilityConflictError,
  CapabilityNotFoundError,
  CircularDependencyError,
  DependencyResolver,
  EventControl,
  LOAD_DOCUMENT,
  PluginConfigurationError,
  PluginInitializationError,
  PluginNotFoundError,
  PluginRegistrationError,
  PluginRegistry,
  SET_DOCUMENT,
  SET_DOCUMENT_ERROR,
  SET_PAGES,
  SET_ROTATION,
  SET_SCALE,
  arePropsEqual,
  clamp,
  createBehaviorEmitter,
  createEmitter,
  createPluginRegistration,
  enumEntries,
  getPagesWithRotatedSize,
  initialCoreState,
  loadDocument,
  setDocument,
  setDocumentError,
  setPages,
  setRotation,
  setScale
};
//# sourceMappingURL=index.js.map