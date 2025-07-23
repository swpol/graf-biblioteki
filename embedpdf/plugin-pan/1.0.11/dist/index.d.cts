import { BasePluginConfig, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';

interface PanPluginConfig extends BasePluginConfig {
}
interface PanCapability {
    enablePan: () => void;
    disablePan: () => void;
    togglePan: () => void;
}

declare class PanPlugin extends BasePlugin<PanPluginConfig, PanCapability> {
    static readonly id: "pan";
    private interactionManager;
    constructor(id: string, registry: PluginRegistry);
    initialize(_: PanPluginConfig): Promise<void>;
    protected buildCapability(): PanCapability;
}

declare const PAN_PLUGIN_ID = "pan";
declare const manifest: PluginManifest<PanPluginConfig>;

declare const PanPluginPackage: PluginPackage<PanPlugin, PanPluginConfig>;

export { PAN_PLUGIN_ID, type PanCapability, PanPlugin, type PanPluginConfig, PanPluginPackage, manifest };
