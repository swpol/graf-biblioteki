import { IPlugin } from '../types/plugin';
import { PluginRegistry } from '../registry/plugin-registry';
import { Action, CoreAction, CoreState, PluginStore, Store, StoreState } from '../store';

export interface StateChangeHandler<TState> {
  (state: TState): void;
}

export abstract class BasePlugin<
  TConfig = unknown,
  TCapability = unknown,
  TState = unknown,
  TAction extends Action = Action,
> implements IPlugin<TConfig>
{
  static readonly id: string;

  protected pluginStore: PluginStore<TState, TAction>;
  protected coreStore: Store<CoreState, CoreAction>;
  // Track debounced actions
  private debouncedActions: Record<string, number> = {};
  private unsubscribeFromState: (() => void) | null = null;
  private unsubscribeFromCoreStore: (() => void) | null = null;

  private _capability?: Readonly<TCapability>;

  private readyPromise: Promise<void>;
  private readyResolve!: () => void;

  constructor(
    public readonly id: string,
    protected registry: PluginRegistry,
  ) {
    if (id !== (this.constructor as typeof BasePlugin).id) {
      throw new Error(
        `Plugin ID mismatch: ${id} !== ${(this.constructor as typeof BasePlugin).id}`,
      );
    }
    this.coreStore = this.registry.getStore();
    this.pluginStore = this.coreStore.getPluginStore<TState, TAction>(this.id);
    this.unsubscribeFromState = this.pluginStore.subscribeToState((action, newState, oldState) => {
      this.onStoreUpdated(oldState, newState);
    });
    this.unsubscribeFromCoreStore = this.coreStore.subscribe((action, newState, oldState) => {
      this.onCoreStoreUpdated(oldState, newState);
    });

    // Initialize ready state
    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });
    // By default, plugins are ready immediately
    this.readyResolve();
  }

  /** Construct the public capability (called once & cached). */
  protected abstract buildCapability(): TCapability;

  public provides(): Readonly<TCapability> {
    if (!this._capability) {
      const cap = this.buildCapability();

      this._capability = Object.freeze(cap);
    }
    return this._capability;
  }

  /**
   * Initialize plugin with config
   */
  abstract initialize(config: TConfig): Promise<void>;

  /**
   *  Get a copy of the current state
   */
  protected get state(): Readonly<TState> {
    return this.pluginStore.getState();
  }

  /**
   *  Get a copy of the current core state
   */
  protected get coreState(): Readonly<StoreState<CoreState>> {
    return this.coreStore.getState();
  }

  /**
   * @deprecated  use `this.state` Get a copy of the current state
   */
  protected getState(): TState {
    return this.pluginStore.getState();
  }

  /**
   * @deprecated  use `this.coreState` Get a copy of the current core state
   */
  protected getCoreState(): StoreState<CoreState> {
    return this.coreStore.getState();
  }

  /**
   * Core Dispatch
   */
  protected dispatchCoreAction(action: CoreAction): StoreState<CoreState> {
    return this.coreStore.dispatchToCore(action);
  }

  /**
   * Dispatch an action to all plugins
   */
  protected dispatchToAllPlugins(action: TAction): StoreState<CoreState> {
    return this.coreStore.dispatch(action);
  }

  /**
   * Dispatch an action
   */
  protected dispatch(action: TAction): TState {
    return this.pluginStore.dispatch(action);
  }

  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  protected debouncedDispatch(action: TAction, debounceTime: number = 100): boolean {
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
  protected subscribe(listener: (action: TAction, state: TState) => void): () => void {
    return this.pluginStore.subscribeToState(listener);
  }

  /**
   * Subscribe to core store changes
   */
  protected subscribeToCoreStore(
    listener: (action: Action, state: StoreState<CoreState>) => void,
  ): () => void {
    return this.coreStore.subscribe(listener);
  }

  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  protected onStoreUpdated(oldState: TState, newState: TState): void {
    // Default implementation does nothing - can be overridden by plugins
  }

  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  protected onCoreStoreUpdated(
    oldState: StoreState<CoreState>,
    newState: StoreState<CoreState>,
  ): void {
    // Default implementation does nothing - can be overridden by plugins
  }

  /**
   * Cleanup method to be called when plugin is being destroyed
   */
  public destroy(): void {
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
  public ready(): Promise<void> {
    return this.readyPromise;
  }

  /**
   * Mark the plugin as ready
   */
  protected markReady(): void {
    this.readyResolve();
  }

  /**
   * Reset the ready state (useful for plugins that need to reinitialize)
   */
  protected resetReady(): void {
    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });
  }
}
