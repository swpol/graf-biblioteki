import { BasePluginConfig, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
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

declare const BOOKMARK_PLUGIN_ID = "bookmark";
declare const manifest: PluginManifest<BookmarkPluginConfig>;

declare const BookmarkPluginPackage: PluginPackage<BookmarkPlugin, BookmarkPluginConfig>;

export { BOOKMARK_PLUGIN_ID, type BookmarkCapability, BookmarkPlugin, type BookmarkPluginConfig, BookmarkPluginPackage, manifest };
