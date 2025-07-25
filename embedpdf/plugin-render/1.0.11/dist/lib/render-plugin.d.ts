import { BasePlugin, PluginRegistry } from '@embedpdf/core';
import { RenderCapability, RenderPluginConfig } from './types';
import { PdfEngine } from '@embedpdf/models';
export declare class RenderPlugin extends BasePlugin<RenderPluginConfig, RenderCapability> {
    static readonly id: "render";
    private engine;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    initialize(_config: RenderPluginConfig): Promise<void>;
    protected buildCapability(): RenderCapability;
    private renderPage;
    private renderPageRect;
}
