import { BasePluginConfig, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
import { Task, PdfErrorReason } from '@embedpdf/models';

interface ThumbnailPluginConfig extends BasePluginConfig {
    width?: number;
    gap?: number;
    buffer?: number;
    labelHeight?: number;
}
interface ThumbMeta {
    pageIndex: number;
    width: number;
    height: number;
    wrapperHeight: number;
    top: number;
    labelHeight: number;
}
interface WindowState {
    start: number;
    end: number;
    items: ThumbMeta[];
    totalHeight: number;
}
interface ThumbnailCapability {
    /** called from UI on every scroll */
    setViewport(offsetY: number, viewportH: number): void;
    /** listen to window changes */
    onWindow(cb: (w: WindowState) => void): () => void;
    /** lazily render one thumb */
    renderThumb(pageIdx: number, dpr: number): Task<Blob, PdfErrorReason>;
}

declare class ThumbnailPlugin extends BasePlugin<ThumbnailPluginConfig, ThumbnailCapability> {
    private cfg;
    static readonly id: "thumbnail";
    private renderCapability;
    private thumbs;
    private window;
    private readonly emitWindow;
    private readonly taskCache;
    constructor(id: string, registry: PluginRegistry, cfg: ThumbnailPluginConfig);
    initialize(): Promise<void>;
    private setWindowState;
    protected buildCapability(): ThumbnailCapability;
    private updateWindow;
    private renderThumb;
}

declare const THUMBNAIL_PLUGIN_ID = "thumbnail";
declare const manifest: PluginManifest<ThumbnailPluginConfig>;

declare const ThumbnailPluginPackage: PluginPackage<ThumbnailPlugin, ThumbnailPluginConfig>;

export { THUMBNAIL_PLUGIN_ID, type ThumbMeta, type ThumbnailCapability, ThumbnailPlugin, type ThumbnailPluginConfig, ThumbnailPluginPackage, type WindowState, manifest };
