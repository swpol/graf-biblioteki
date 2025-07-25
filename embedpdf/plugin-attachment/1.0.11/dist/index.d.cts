import { BasePluginConfig, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
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

declare const ATTACHMENT_PLUGIN_ID = "attachment";
declare const manifest: PluginManifest<AttachmentPluginConfig>;

declare const AttachmentPluginPackage: PluginPackage<AttachmentPlugin, AttachmentPluginConfig>;

export { ATTACHMENT_PLUGIN_ID, type AttachmentCapability, AttachmentPlugin, type AttachmentPluginConfig, AttachmentPluginPackage, manifest };
