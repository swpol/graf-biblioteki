import { BasePlugin, BasePluginConfig, PluginRegistry } from '@embedpdf/core';
import { PdfEngine } from '@embedpdf/models';

interface AttachmentPluginConfig extends BasePluginConfig {
}
interface AttachmentCapability {
}

declare class AttachmentPlugin extends BasePlugin<AttachmentPluginConfig, AttachmentCapability> {
    static readonly id: "attachment";
    private engine;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    initialize(_: AttachmentPluginConfig): Promise<void>;
    protected buildCapability(): AttachmentCapability;
}

export { AttachmentPlugin as A, type AttachmentCapability as a };
