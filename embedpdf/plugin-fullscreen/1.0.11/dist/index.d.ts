import { BasePluginConfig, EventHook, Action, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';

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
declare function setFullscreen(payload: boolean): SetFullscreenAction;

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

declare const initialState: FullscreenState;

declare const FULLSCREEN_PLUGIN_ID = "fullscreen";
declare const manifest: PluginManifest<FullscreenPluginConfig>;

declare const FullscreenPluginPackage: PluginPackage<FullscreenPlugin, FullscreenPluginConfig, FullscreenState, FullscreenAction>;

export { FULLSCREEN_PLUGIN_ID, type FullscreenAction, type FullscreenCapability, FullscreenPlugin, type FullscreenPluginConfig, FullscreenPluginPackage, type FullscreenState, SET_FULLSCREEN, type SetFullscreenAction, initialState, manifest, setFullscreen };
