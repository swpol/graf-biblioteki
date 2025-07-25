import { BasePlugin, BasePluginConfig, EventHook, PluginRegistry } from '@embedpdf/core';
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

export { ExportPlugin as E, type ExportCapability as a };
