import { PdfPageGeometry, Position, Rect } from '@embedpdf/models';
import { SelectionRangeX } from './types';
/**
 * Hit-test helper using runs
 * @param geo - page geometry
 * @param pt - point
 * @returns glyph index
 */
export declare function glyphAt(geo: PdfPageGeometry, pt: Position): number;
/**
 * Helper: min/max glyph indices on `page` for current sel
 * @param sel - selection range
 * @param geo - page geometry
 * @param page - page index
 * @returns { from: number; to: number } | null
 */
export declare function sliceBounds(sel: SelectionRangeX | null, geo: PdfPageGeometry | undefined, page: number): {
    from: number;
    to: number;
} | null;
/**
 * Helper: build rects for a slice of the page
 * @param geo - page geometry
 * @param from - from index
 * @param to - to index
 * @param merge - whether to merge adjacent rects (default: true)
 * @returns rects
 */
export declare function rectsWithinSlice(geo: PdfPageGeometry, from: number, to: number, merge?: boolean): Rect[];
/**
 * ============================================================================
 * Rectangle Merging Algorithm
 * ============================================================================
 *
 * The following code is adapted from Chromium's PDF text selection implementation.
 *
 * Copyright 2010 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file: https://source.chromium.org/chromium/chromium/src/+/main:LICENSE
 *
 * Original source:
 * https://source.chromium.org/chromium/chromium/src/+/main:pdf/pdfium/pdfium_range.cc
 *
 * Adapted for TypeScript and this project's Rect/geometry types.
 */
/**
 * Text run info for rect merging (similar to Chromium's ScreenRectTextRunInfo)
 */
export interface TextRunInfo {
    rect: Rect;
    charCount: number;
}
/**
 * Helper functions for Rect operations
 */
export declare function rectUnion(rect1: Rect, rect2: Rect): Rect;
export declare function rectIntersect(rect1: Rect, rect2: Rect): Rect;
export declare function rectIsEmpty(rect: Rect): boolean;
/**
 * Returns a ratio between [0, 1] representing vertical overlap
 */
export declare function getVerticalOverlap(rect1: Rect, rect2: Rect): number;
/**
 * Returns true if there is sufficient horizontal and vertical overlap
 */
export declare function shouldMergeHorizontalRects(textRun1: TextRunInfo, textRun2: TextRunInfo): boolean;
/**
 * Merge adjacent rectangles based on proximity and overlap (similar to Chromium's algorithm)
 */
export declare function mergeAdjacentRects(textRuns: TextRunInfo[]): Rect[];
