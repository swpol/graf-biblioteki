import { BasePlugin, BasePluginConfig, PluginRegistry } from '@embedpdf/core';

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

export { PanPlugin as P, type PanCapability as a };
