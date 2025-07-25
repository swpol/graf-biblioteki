import { Action } from '@embedpdf/core';
import { PdfPageGeometry, Rect } from '@embedpdf/models';
import { SelectionRangeX } from './types';
export declare const CACHE_PAGE_GEOMETRY = "CACHE_PAGE_GEOMETRY";
export declare const SET_SELECTION = "SET_SELECTION";
export declare const START_SELECTION = "START_SELECTION";
export declare const END_SELECTION = "END_SELECTION";
export declare const CLEAR_SELECTION = "CLEAR_SELECTION";
export declare const SET_RECTS = "SET_RECTS";
export declare const SET_SLICES = "SET_SLICES";
export declare const RESET = "RESET";
export interface CachePageGeometryAction extends Action {
    type: typeof CACHE_PAGE_GEOMETRY;
    payload: {
        page: number;
        geo: PdfPageGeometry;
    };
}
export interface SetSelectionAction extends Action {
    type: typeof SET_SELECTION;
    payload: SelectionRangeX | null;
}
export interface StartSelectionAction extends Action {
    type: typeof START_SELECTION;
}
export interface EndSelectionAction extends Action {
    type: typeof END_SELECTION;
}
export interface ClearSelectionAction extends Action {
    type: typeof CLEAR_SELECTION;
}
export interface SetRectsAction extends Action {
    type: typeof SET_RECTS;
    payload: Record<number, Rect[]>;
}
export interface SetSlicesAction extends Action {
    type: typeof SET_SLICES;
    payload: Record<number, {
        start: number;
        count: number;
    }>;
}
export interface ResetAction extends Action {
    type: typeof RESET;
}
export type SelectionAction = CachePageGeometryAction | SetSelectionAction | StartSelectionAction | EndSelectionAction | ClearSelectionAction | SetRectsAction | SetSlicesAction | ResetAction;
export declare const cachePageGeometry: (page: number, geo: PdfPageGeometry) => CachePageGeometryAction;
export declare const setSelection: (sel: SelectionRangeX) => SetSelectionAction;
export declare const startSelection: () => StartSelectionAction;
export declare const endSelection: () => EndSelectionAction;
export declare const clearSelection: () => ClearSelectionAction;
export declare const setRects: (allRects: Record<number, Rect[]>) => SetRectsAction;
export declare const setSlices: (slices: Record<number, {
    start: number;
    count: number;
}>) => SetSlicesAction;
export declare const reset: () => ResetAction;
