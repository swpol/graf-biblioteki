import { BasePluginConfig, EventHook } from '@embedpdf/core';
import { PdfPageGeometry, PdfTask, Rect } from '@embedpdf/models';
export interface SelectionPluginConfig extends BasePluginConfig {
}
export interface GlyphPointer {
    page: number;
    index: number;
}
export interface SelectionRangeX {
    start: GlyphPointer;
    end: GlyphPointer;
}
export interface SelectionState {
    /** page → geometry cache */
    geometry: Record<number, PdfPageGeometry>;
    /** current selection or null */
    rects: Record<number, Rect[]>;
    selection: SelectionRangeX | null;
    slices: Record<number, {
        start: number;
        count: number;
    }>;
    active: boolean;
    selecting: boolean;
}
export interface FormattedSelection {
    pageIndex: number;
    rect: Rect;
    segmentRects: Rect[];
}
export interface SelectionCapability {
    getGeometry(page: number): PdfTask<PdfPageGeometry>;
    getFormattedSelection(): FormattedSelection[];
    getFormattedSelectionForPage(page: number): FormattedSelection | null;
    getHighlightRectsForPage(page: number): Rect[];
    getHighlightRects(): Record<number, Rect[]>;
    getBoundingRectForPage(page: number): Rect | null;
    getBoundingRects(): {
        page: number;
        rect: Rect;
    }[];
    getSelectedText(): PdfTask<string[]>;
    copyToClipboard(): void;
    begin(page: number, glyphIdx: number): void;
    update(page: number, glyphIdx: number): void;
    end(): void;
    clear(): void;
    onSelectionChange: EventHook<SelectionRangeX | null>;
    onTextRetrieved: EventHook<string[]>;
    onCopyToClipboard: EventHook<string>;
    onBeginSelection: EventHook<{
        page: number;
        index: number;
    }>;
    onEndSelection: EventHook<void>;
    /** Tell the selection plugin that text selection should stay
        enabled while <modeId> is active.                    */
    enableForMode(modeId: string): void;
    /** Quick check used by SelectionLayer during pointer events. */
    isEnabledForMode(modeId: string): boolean;
    /** Get the current state of the selection plugin. */
    getState(): SelectionState;
}
