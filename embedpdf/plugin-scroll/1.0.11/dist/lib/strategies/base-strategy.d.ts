import { PdfPageObjectWithRotatedSize, Position, Rect, Rotation } from '@embedpdf/models';
import { ViewportMetrics } from '@embedpdf/plugin-viewport';
import { VirtualItem } from '../types/virtual-item';
import { ScrollMetrics } from '../types';
export interface ScrollStrategyConfig {
    pageGap?: number;
    viewportGap?: number;
    bufferSize?: number;
}
export declare abstract class BaseScrollStrategy {
    protected pageGap: number;
    protected viewportGap: number;
    protected bufferSize: number;
    constructor(config: ScrollStrategyConfig);
    abstract createVirtualItems(pdfPageObject: PdfPageObjectWithRotatedSize[][]): VirtualItem[];
    abstract getTotalContentSize(virtualItems: VirtualItem[]): {
        width: number;
        height: number;
    };
    protected abstract getScrollOffset(viewport: ViewportMetrics): number;
    protected abstract getClientSize(viewport: ViewportMetrics): number;
    protected getVisibleRange(viewport: ViewportMetrics, virtualItems: VirtualItem[], scale: number): {
        start: number;
        end: number;
    };
    handleScroll(viewport: ViewportMetrics, virtualItems: VirtualItem[], scale: number): ScrollMetrics;
    protected calculatePageVisibility(virtualItems: VirtualItem[], viewport: ViewportMetrics, scale: number): ScrollMetrics['pageVisibilityMetrics'];
    protected determineCurrentPage(visibilityMetrics: ScrollMetrics['pageVisibilityMetrics']): number;
    private getRectLocationForPage;
    getScrollPositionForPage(pageNumber: number, virtualItems: VirtualItem[], scale: number, rotation: Rotation, pageCoordinates?: {
        x: number;
        y: number;
    }): Position | null;
    getRectPositionForPage(pageNumber: number, virtualItems: VirtualItem[], scale: number, rotation: Rotation, rect: Rect): Rect | null;
}
