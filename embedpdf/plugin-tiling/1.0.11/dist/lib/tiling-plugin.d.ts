import { BasePlugin, CoreState, PluginRegistry, StoreState } from '@embedpdf/core';
import { TilingPluginConfig, TilingCapability, TilingState } from './types';
export declare class TilingPlugin extends BasePlugin<TilingPluginConfig, TilingCapability> {
    static readonly id: "tiling";
    private readonly tileRendering$;
    private config;
    private renderCapability;
    private scrollCapability;
    private viewportCapability;
    constructor(id: string, registry: PluginRegistry, config: TilingPluginConfig);
    initialize(): Promise<void>;
    protected onCoreStoreUpdated(oldState: StoreState<CoreState>, newState: StoreState<CoreState>): void;
    private calculateVisibleTiles;
    onStoreUpdated(_prevState: TilingState, newState: TilingState): void;
    protected buildCapability(): TilingCapability;
    private renderTile;
}
