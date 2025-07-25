import { BasePlugin, BasePluginConfig, PluginRegistry } from '@embedpdf/core';
import { Task, PdfBookmarkObject, PdfErrorReason, PdfEngine } from '@embedpdf/models';

interface BookmarkPluginConfig extends BasePluginConfig {
}
interface BookmarkCapability {
    getBookmarks: () => Task<{
        bookmarks: PdfBookmarkObject[];
    }, PdfErrorReason>;
}

declare class BookmarkPlugin extends BasePlugin<BookmarkPluginConfig, BookmarkCapability> {
    static readonly id: "bookmark";
    private engine;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    initialize(_: BookmarkPluginConfig): Promise<void>;
    protected buildCapability(): BookmarkCapability;
    private getBookmarks;
}

export { BookmarkPlugin as B, type BookmarkCapability as a };
