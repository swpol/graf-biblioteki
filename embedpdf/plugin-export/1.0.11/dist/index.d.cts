import { BasePluginConfig, EventHook, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
import { Task, PdfErrorReason, PdfEngine } from '@embedpdf/models';

interface ExportPluginConfig extends BasePluginConfig {
}
interface ExportCapability {
    saveAsCopy: () => Task<ArrayBuffer, PdfErrorReason>;
    download: () => void;
    onRequest: EventHook<'download'>;
}

declare class ExportPlugin extends BasePlugin<ExportPluginConfig, ExportCapability> {
    static readonly id: "export";
    private readonly downloadRequest$;
    private engine;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    initialize(_: ExportPluginConfig): Promise<void>;
    protected buildCapability(): ExportCapability;
    private download;
    private saveAsCopy;
}

declare const EXPORT_PLUGIN_ID = "export";
declare const manifest: PluginManifest<ExportPluginConfig>;

declare const ExportPluginPackage: PluginPackage<ExportPlugin, ExportPluginConfig>;

export { EXPORT_PLUGIN_ID, type ExportCapability, ExportPlugin, type ExportPluginConfig, ExportPluginPackage, manifest };
