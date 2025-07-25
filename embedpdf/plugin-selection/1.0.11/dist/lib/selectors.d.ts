import { Rect } from '@embedpdf/models';
import { FormattedSelection, SelectionState } from './types';
export declare function selectRectsForPage(state: SelectionState, page: number): Rect[];
export declare function selectBoundingRectForPage(state: SelectionState, page: number): Rect | null;
export declare function selectRectsAndBoundingRectForPage(state: SelectionState, page: number): {
    rects: Rect[];
    boundingRect: Rect | null;
};
export declare function selectBoundingRectsForAllPages(state: SelectionState): {
    page: number;
    rect: Rect;
}[];
export declare function getFormattedSelectionForPage(state: SelectionState, page: number): FormattedSelection | null;
export declare function getFormattedSelection(state: SelectionState): FormattedSelection[];
