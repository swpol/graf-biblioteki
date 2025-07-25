import { BasePlugin, PluginRegistry } from '@embedpdf/core';
import { PdfEngine } from '@embedpdf/models';
import { LoaderCapability, LoaderPluginConfig } from './types';
export declare class LoaderPlugin extends BasePlugin<LoaderPluginConfig, LoaderCapability> {
    readonly id: string;
    private engine;
    static readonly id: "loader";
    private readonly loaderHandlers$;
    private readonly documentLoadedHandlers$;
    private readonly openFileRequest$;
    private documentLoader;
    private loadingOptions?;
    private loadedDocument?;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    protected buildCapability(): LoaderCapability;
    initialize(config: LoaderPluginConfig): Promise<void>;
    postInitialize(): Promise<void>;
    private loadDocument;
    destroy(): Promise<void>;
}
