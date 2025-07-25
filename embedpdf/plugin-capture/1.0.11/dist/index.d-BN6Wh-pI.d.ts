import { EventHook, BasePlugin, BasePluginConfig, PluginRegistry } from '@embedpdf/core';
import { Rect, ImageConversionTypes } from '@embedpdf/models';

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

export { type CaptureCapability as C, CapturePlugin as a };
