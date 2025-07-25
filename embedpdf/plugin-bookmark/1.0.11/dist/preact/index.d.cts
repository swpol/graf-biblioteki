import { B as BookmarkPlugin, a as BookmarkCapability } from '../index.d-U_VMc3xT.cjs';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useBookmarkPlugin: () => {
    plugin: BookmarkPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useBookmarkCapability: () => {
    provides: Readonly<BookmarkCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

export { useBookmarkCapability, useBookmarkPlugin };
