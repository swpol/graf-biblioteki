import { ScrollPlugin } from '../..';
export declare const useScrollPlugin: () => {
    plugin: ScrollPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useScrollCapability: () => {
    provides: Readonly<import('../..').ScrollCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useScroll: () => {
    currentPage: number;
    totalPages: number;
    onScrollerData?: import('@embedpdf/core').EventHook<import('../..').ScrollerLayout> | undefined;
    onStateChange?: import('@embedpdf/core').EventHook<import('../..').ScrollState> | undefined;
    onScroll?: import('@embedpdf/core').EventHook<import('../..').ScrollMetrics> | undefined;
    getCurrentPage?: (() => number) | undefined;
    getTotalPages?: (() => number) | undefined;
    onPageChange?: import('@embedpdf/core').EventHook<import('../..').PageChangePayload> | undefined;
    onLayoutChange?: import('@embedpdf/core').EventHook<import('../..').LayoutChangePayload> | undefined;
    onLayoutReady?: import('@embedpdf/core').EventHook<boolean> | undefined;
    scrollToPage?: ((options: import('../..').ScrollToPageOptions) => void) | undefined;
    scrollToNextPage?: ((behavior?: ScrollBehavior) => void) | undefined;
    scrollToPreviousPage?: ((behavior?: ScrollBehavior) => void) | undefined;
    getMetrics?: ((viewport?: import('@embedpdf/plugin-viewport').ViewportMetrics) => import('../..').ScrollMetrics) | undefined;
    getLayout?: (() => import('../..').LayoutChangePayload) | undefined;
    getScrollerLayout?: (() => import('../..').ScrollerLayout) | undefined;
    getRectPositionForPage?: ((page: number, rect: import('@embedpdf/models').Rect, scale?: number, rotation?: import('@embedpdf/models').Rotation) => import('@embedpdf/models').Rect | null) | undefined;
    setScrollStrategy?: ((strategy: import('../..').ScrollStrategy) => void) | undefined;
    getPageGap?: (() => number) | undefined;
};
