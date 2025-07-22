import { Reducer, Action, StoreState, StoreListener, PluginListener } from './types';
import { PluginStore } from './plugin-store';
import { CORE_ACTION_TYPES } from './actions';

/**
 * A generic, type-safe store class managing core and plugin states, reducers, and subscriptions.
 * @template CoreState The type of the core state.
 * @template CoreAction The type of actions handled by core reducers (extends Action).
 */
export class Store<CoreState, CoreAction extends Action = Action> {
  private state: StoreState<CoreState>;
  private coreReducer: Reducer<CoreState, CoreAction>;
  private pluginReducers: Record<string, Reducer<any, Action>> = {};

  private listeners: StoreListener<CoreState>[] = [];
  private pluginListeners: Record<string, PluginListener[]> = {};

  /**
   * Initializes the store with the provided core state.
   * @param reducer          The core reducer function
   * @param initialCoreState The initial core state
   */
  constructor(
    reducer: Reducer<CoreState, CoreAction>,
    public initialCoreState: CoreState,
  ) {
    this.state = { core: initialCoreState, plugins: {} };
    this.coreReducer = reducer;
  }

  /**
   * Adds a reducer for a plugin-specific state.
   * @param pluginId The unique identifier for the plugin.
   * @param reducer The reducer function for the plugin state.
   * @param initialState The initial state for the plugin.
   */
  addPluginReducer<PluginState>(
    pluginId: string,
    reducer: Reducer<PluginState, Action>,
    initialState: PluginState,
  ) {
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
  dispatchToCore(action: CoreAction): StoreState<CoreState> {
    if (!this.coreReducer) {
      return this.getState();
    }

    const oldState = this.getState();
    // Update core state via its reducer
    this.state.core = this.coreReducer(this.state.core, action);

    const newState = this.getState();
    // Notify all main-store subscribers
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
  dispatchToPlugin<PluginAction extends Action>(
    pluginId: string,
    action: PluginAction,
    notifyGlobal: boolean = true,
  ): any {
    const oldGlobalState = this.getState();

    const reducer = this.pluginReducers[pluginId];
    if (!reducer) {
      // No plugin found, just return the old state
      return oldGlobalState;
    }

    // Grab the old plugin state
    const oldPluginState = oldGlobalState.plugins[pluginId];
    // Reduce to new plugin state
    const newPluginState = reducer(oldPluginState, action);
    // Update the store's plugin slice
    this.state.plugins[pluginId] = newPluginState;

    const newGlobalState = this.getState();

    // If we are notifying the main store subscribers about plugin changes
    if (notifyGlobal) {
      this.listeners.forEach((listener) => listener(action, newGlobalState, oldGlobalState));
    }

    // Notify plugin-specific listeners
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
  dispatch(action: CoreAction | Action): StoreState<CoreState> {
    // Keep old state to notify global listeners *once*, after all reducers run.
    const oldState = this.getState();
    // 1) Apply core reducer (only if action is a CoreAction)
    if (this.isCoreAction(action)) {
      this.state.core = this.coreReducer(this.state.core, action);
    }

    // 2) Apply plugin reducers (without globally notifying after each plugin)
    for (const pluginId in this.pluginReducers) {
      const reducer = this.pluginReducers[pluginId];
      const oldPluginState = oldState.plugins[pluginId];
      if (reducer) {
        this.state.plugins[pluginId] = reducer(oldPluginState, action);
      }
      // We do *not* notify global listeners or plugin listeners here,
      // as that might be undesired "fan-out". If you want per-plugin subscription
      // triggered on every dispatch, you can do so here, but that’s up to you.
    }

    // 3) Notify global listeners *once* with the final new state
    const newState = this.getState();
    this.listeners.forEach((listener) => listener(action, newState, oldState));

    // 4) Return the new global store state
    return newState;
  }

  /**
   * Returns a shallow copy of the current state.
   * @returns The current store state.
   */
  getState(): StoreState<CoreState> {
    return {
      core: { ...this.state.core },
      plugins: { ...this.state.plugins },
    };
  }

  /**
   * Subscribes a listener to *global* state changes.
   * The callback signature is now (action, newState, oldState).
   *
   * @param listener The callback to invoke on state changes
   * @returns A function to unsubscribe the listener
   */
  subscribe(listener: StoreListener<CoreState>) {
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
  subscribeToPlugin(pluginId: string, listener: PluginListener) {
    if (!(pluginId in this.state.plugins)) {
      throw new Error(
        `Plugin state not found for plugin "${pluginId}". Did you forget to call addPluginReducer?`,
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
  onAction<T extends CoreAction['type']>(
    type: T,
    handler: (
      action: Extract<CoreAction, { type: T }>,
      state: StoreState<CoreState>,
      oldState: StoreState<CoreState>,
    ) => void,
  ) {
    return this.subscribe((action, newState, oldState) => {
      if (action.type === type) {
        handler(action as Extract<CoreAction, { type: T }>, newState, oldState);
      }
    });
  }

  /**
   * Gets a PluginStore handle for a specific plugin.
   * @param pluginId The unique identifier for the plugin.
   * @returns A PluginStore instance for the plugin.
   */
  getPluginStore<PluginState, PluginAction extends Action>(
    pluginId: string,
  ): PluginStore<PluginState, PluginAction> {
    if (!(pluginId in this.state.plugins)) {
      throw new Error(
        `Plugin state not found for plugin "${pluginId}". Did you forget to call addPluginReducer?`,
      );
    }
    return new PluginStore<PluginState, PluginAction>(this, pluginId);
  }

  /**
   * Helper method to check if an action is a CoreAction.
   * Adjust if you have a more refined way to differentiate CoreAction vs. any other Action.
   */
  public isCoreAction(action: Action): action is CoreAction {
    // In many codebases you'd do something more robust here
    // or rely on TypeScript's narrowing logic if possible.
    return CORE_ACTION_TYPES.includes(action.type as (typeof CORE_ACTION_TYPES)[number]);
  }

  /**
   * Destroy the store: drop every listener and plugin reducer
   */
  public destroy(): void {
    // 1. empty listener collections
    this.listeners.length = 0;
    for (const id in this.pluginListeners) {
      this.pluginListeners[id]?.splice?.(0);
    }
    this.pluginListeners = {};

    // 2. wipe plugin reducers and states
    this.pluginReducers = {};
    this.state.plugins = {};

    // 3. reset core state to initial
    this.state.core = { ...this.initialCoreState };
  }
}
