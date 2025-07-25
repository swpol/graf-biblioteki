import { PdfPageObjectWithRotatedSize } from '@embedpdf/models';
import { ViewportMetrics } from '@embedpdf/plugin-viewport';
import { BaseScrollStrategy, ScrollStrategyConfig } from './base-strategy';
import { VirtualItem } from '../types/virtual-item';
export declare class HorizontalScrollStrategy extends BaseScrollStrategy {
    constructor(config: ScrollStrategyConfig);
    createVirtualItems(pdfPageObject: PdfPageObjectWithRotatedSize[][]): VirtualItem[];
    getTotalContentSize(virtualItems: VirtualItem[]): {
        width: number;
        height: number;
    };
    protected getScrollOffset(viewport: ViewportMetrics): number;
    protected getClientSize(viewport: ViewportMetrics): number;
}
