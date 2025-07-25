import { BasePlugin, BasePluginConfig, EventHook, Action, PluginRegistry } from '@embedpdf/core';

interface FullscreenState {
    isFullscreen: boolean;
}
interface FullscreenPluginConfig extends BasePluginConfig {
}
interface FullscreenCapability {
    isFullscreen: () => boolean;
    enableFullscreen: () => void;
    exitFullscreen: () => void;
    toggleFullscreen: () => void;
    onRequest: EventHook<'enter' | 'exit'>;
    onStateChange: EventHook<FullscreenState>;
}

declare const SET_FULLSCREEN = "SET_FULLSCREEN";
interface SetFullscreenAction extends Action {
    type: typeof SET_FULLSCREEN;
    payload: boolean;
}
type FullscreenAction = SetFullscreenAction;

declare class FullscreenPlugin extends BasePlugin<FullscreenPluginConfig, FullscreenCapability, FullscreenState, FullscreenAction> {
    static readonly id: "fullscreen";
    private readonly onStateChange$;
    private readonly fullscreenRequest$;
    constructor(id: string, registry: PluginRegistry);
    initialize(_: FullscreenPluginConfig): Promise<void>;
    protected buildCapability(): FullscreenCapability;
    private toggleFullscreen;
    private enableFullscreen;
    private exitFullscreen;
    onStoreUpdated(_: FullscreenState, newState: FullscreenState): void;
    setFullscreenState(isFullscreen: boolean): void;
    destroy(): Promise<void>;
}

export { FullscreenPlugin as F, type FullscreenCapability as a, type FullscreenState as b };
