import { BasePluginConfig, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';

interface PrintPluginConfig extends BasePluginConfig {
    defaultQuality?: PrintQuality;
    defaultIncludeAnnotations?: boolean;
    batchSize?: number;
}
declare enum PrintQuality {
    Normal = "normal",
    High = "high"
}
declare enum PageRangeType {
    Current = "current",
    All = "all",
    Custom = "custom"
}
interface PageRangeCurrent {
    type: PageRangeType.Current;
    currentPage: number;
}
interface PageRangeAll {
    type: PageRangeType.All;
}
interface PageRangeCustom {
    type: PageRangeType.Custom;
    pages: number[];
}
type PageRange = PageRangeCurrent | PageRangeAll | PageRangeCustom;
interface PrintOptions {
    pageRange: PageRange;
    includeAnnotations: boolean;
    quality: PrintQuality;
}
interface PrintProgress {
    current: number;
    total: number;
    status: 'preparing' | 'rendering' | 'complete' | 'error';
    message?: string;
}
interface PrintData {
    blobs: Blob[];
    options: PrintOptions;
    totalPages: number;
}
interface ParsedPageRange {
    pages: number[];
    isValid: boolean;
    error?: string;
}
interface PrintPageResult {
    pageIndex: number;
    blob: Blob;
}
interface PrintCapability {
    preparePrint: (options: PrintOptions, onProgress?: (progress: PrintProgress) => void, onPageReady?: (result: PrintPageResult) => void) => Promise<void>;
    parsePageRange: (rangeString: string) => ParsedPageRange;
}

declare class PrintPlugin extends BasePlugin<PrintPluginConfig, PrintCapability> {
    static readonly id: "print";
    private readonly renderCapability;
    private readonly config;
    constructor(id: string, registry: PluginRegistry, config: PrintPluginConfig);
    initialize(_config: PrintPluginConfig): Promise<void>;
    protected buildCapability(): PrintCapability;
    private preparePrint;
    private renderPage;
    private getScaleFactor;
    private getPagesToPrint;
    private parsePageRange;
}

declare const PRINT_PLUGIN_ID = "print";
declare const manifest: PluginManifest<PrintPluginConfig>;

declare const PrintPluginPackage: PluginPackage<PrintPlugin, PrintPluginConfig>;

export { PRINT_PLUGIN_ID, type PageRange, type PageRangeAll, type PageRangeCurrent, type PageRangeCustom, PageRangeType, type ParsedPageRange, type PrintCapability, type PrintData, type PrintOptions, type PrintPageResult, PrintPlugin, type PrintPluginConfig, PrintPluginPackage, type PrintProgress, PrintQuality, manifest };
