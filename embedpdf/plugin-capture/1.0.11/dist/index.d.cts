import { BasePluginConfig, EventHook, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
import { ImageConversionTypes, Rect } from '@embedpdf/models';

interface CapturePluginConfig extends BasePluginConfig {
    scale?: number;
    imageType?: ImageConversionTypes;
    withAnnotations?: boolean;
}
interface CaptureAreaEvent {
    pageIndex: number;
    rect: Rect;
    blob: Blob;
    imageType: ImageConversionTypes;
    scale: number;
    withAnnotations: boolean;
}
interface CaptureCapability {
    onCaptureArea: EventHook<CaptureAreaEvent>;
    captureArea(pageIndex: number, rect: Rect): void;
    enableMarqueeCapture: () => void;
    disableMarqueeCapture: () => void;
    toggleMarqueeCapture: () => void;
    isMarqueeCaptureActive: () => boolean;
}

declare class CapturePlugin extends BasePlugin<CapturePluginConfig, CaptureCapability> {
    static readonly id: "capture";
    private captureArea$;
    private renderCapability;
    private interactionManagerCapability;
    private config;
    constructor(id: string, registry: PluginRegistry, config: CapturePluginConfig);
    initialize(_: CapturePluginConfig): Promise<void>;
    protected buildCapability(): CaptureCapability;
    private captureArea;
    private enableMarqueeCapture;
    private disableMarqueeCapture;
    private toggleMarqueeCapture;
}

declare const CAPTURE_PLUGIN_ID = "capture";
declare const manifest: PluginManifest<CapturePluginConfig>;

declare const CapturePluginPackage: PluginPackage<CapturePlugin, CapturePluginConfig>;

export { CAPTURE_PLUGIN_ID, type CaptureAreaEvent, type CaptureCapability, CapturePlugin, type CapturePluginConfig, CapturePluginPackage, manifest };
