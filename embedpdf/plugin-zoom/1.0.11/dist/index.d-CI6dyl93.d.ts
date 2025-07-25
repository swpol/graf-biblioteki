import { EventHook, BasePlugin, BasePluginConfig, Action, PluginRegistry } from '@embedpdf/core';
import { Rect } from '@embedpdf/models';
import { ViewportMetrics } from '@embedpdf/plugin-viewport';

declare enum ZoomMode {
    Automatic = "automatic",
    FitPage = "fit-page",
    FitWidth = "fit-width"
}
type ZoomLevel = ZoomMode | number;
interface Point {
    vx: number;
    vy: number;
}
interface ZoomChangeEvent {
    /** old and new *actual* scale factors */
    oldZoom: number;
    newZoom: number;
    /** level used to obtain the newZoom (number | mode) */
    level: ZoomLevel;
    /** viewport point kept under the finger / mouse‑wheel focus */
    center: Point;
    /** where the viewport should scroll to after the scale change */
    desiredScrollLeft: number;
    desiredScrollTop: number;
    /** metrics at the moment the zoom was requested                    */
    viewport: ViewportMetrics;
}
interface ZoomCapability {
    /** subscribe – returns the unsubscribe function */
    onZoomChange: EventHook<ZoomChangeEvent>;
    /** subscribe – returns the unsubscribe function */
    onStateChange: EventHook<ZoomState>;
    /** absolute requests -------------------------------------------------- */
    requestZoom(level: ZoomLevel, center?: Point): void;
    /** relative requests -------------------------------------------------- */
    requestZoomBy(delta: number, center?: Point): void;
    /** absolute requests -------------------------------------------------- */
    zoomIn(): void;
    zoomOut(): void;
    zoomToArea(pageIndex: number, rect: Rect): void;
    /** zoom in on an area -------------------------------------------------- */
    enableMarqueeZoom(): void;
    disableMarqueeZoom(): void;
    toggleMarqueeZoom(): void;
    isMarqueeZoomActive(): boolean;
    getState(): ZoomState;
    getPresets(): ZoomPreset[];
}
interface ZoomRangeStep {
    min: number;
    max: number;
    step: number;
}
interface ZoomPreset {
    name: string;
    value: ZoomLevel;
    icon?: string;
}
interface ZoomPluginConfig extends BasePluginConfig {
    defaultZoomLevel: ZoomLevel;
    minZoom?: number;
    maxZoom?: number;
    zoomStep?: number;
    zoomRanges?: ZoomRangeStep[];
    presets?: ZoomPreset[];
}
interface ZoomState {
    zoomLevel: ZoomLevel;
    currentZoomLevel: number;
}

declare const SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
declare const SET_INITIAL_ZOOM_LEVEL = "SET_INITIAL_ZOOM_LEVEL";
interface SetZoomLevelAction extends Action {
    type: typeof SET_ZOOM_LEVEL;
    payload: {
        zoomLevel: ZoomLevel;
        currentZoomLevel: number;
    };
}
interface SetInitialZoomLevelAction extends Action {
    type: typeof SET_INITIAL_ZOOM_LEVEL;
    payload: {
        zoomLevel: ZoomLevel;
    };
}
type ZoomAction = SetZoomLevelAction | SetInitialZoomLevelAction;

declare class ZoomPlugin extends BasePlugin<ZoomPluginConfig, ZoomCapability, ZoomState, ZoomAction> {
    static readonly id: "zoom";
    private readonly zoom$;
    private readonly state$;
    private readonly viewport;
    private readonly viewportPlugin;
    private readonly scroll;
    private readonly interactionManager;
    private readonly presets;
    private readonly zoomRanges;
    private readonly minZoom;
    private readonly maxZoom;
    private readonly zoomStep;
    constructor(id: string, registry: PluginRegistry, cfg: ZoomPluginConfig);
    protected buildCapability(): ZoomCapability;
    initialize(): Promise<void>;
    destroy(): Promise<void>;
    /**
     * Sort ranges once, make sure they are sane
     */
    private normalizeRanges;
    /** pick the step that applies to a given numeric zoom */
    private stepFor;
    /** clamp + round helper reused later */
    private toZoom;
    private handleRequest;
    /** numeric zoom for Automatic / FitPage / FitWidth */
    private computeZoomForMode;
    /** where to scroll so that *focus* stays stable after scaling          */
    private computeScrollForZoomChange;
    private handleZoomToArea;
    /** recalculates Automatic / Fit* when viewport or pages change */
    private recalcAuto;
    onStoreUpdated(_prevState: ZoomState, newState: ZoomState): void;
}

export { type ZoomCapability as Z, ZoomPlugin as a, type ZoomState as b };
