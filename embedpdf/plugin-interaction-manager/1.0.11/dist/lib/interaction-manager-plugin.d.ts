import { BasePlugin, PluginRegistry } from '@embedpdf/core';
import { InteractionManagerCapability, InteractionManagerPluginConfig, InteractionManagerState, RegisterAlwaysOptions } from './types';
export declare class InteractionManagerPlugin extends BasePlugin<InteractionManagerPluginConfig, InteractionManagerCapability, InteractionManagerState> {
    static readonly id: "interaction-manager";
    private modes;
    private cursorClaims;
    private buckets;
    private alwaysGlobal;
    private alwaysPage;
    private readonly onModeChange$;
    private readonly onHandlerChange$;
    private readonly onCursorChange$;
    private readonly onStateChange$;
    constructor(id: string, registry: PluginRegistry);
    initialize(_: InteractionManagerPluginConfig): Promise<void>;
    protected buildCapability(): InteractionManagerCapability;
    private activate;
    private notifyHandlersActive;
    private notifyHandlersInactive;
    private registerMode;
    /** ---------- pointer-handler handling ------------ */
    private registerHandlers;
    registerAlways({ scope, handlers }: RegisterAlwaysOptions): () => void;
    /** Returns the *merged* handler set that should be active for the given
     *  provider (`global` wrapper or a single page wrapper).
     *  – `alwaysGlobal` / `alwaysPage` are **always** active.
     *  – Handlers that belong to the current mode are added on top **iff**
     *    the mode’s own scope matches the provider’s scope.            */
    private getHandlersForScope;
    /** ---------- cursor handling --------------------- */
    private setCursor;
    private removeCursor;
    private emitCursor;
    onStoreUpdated(_: InteractionManagerState, newState: InteractionManagerState): void;
    private activeModeIsExclusive;
    private getActiveInteractionMode;
    destroy(): Promise<void>;
}
