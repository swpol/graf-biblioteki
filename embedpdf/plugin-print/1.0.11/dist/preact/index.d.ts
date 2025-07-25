import { BasePlugin, BasePluginConfig, PluginRegistry } from '@embedpdf/core';
import * as preact from 'preact';
import { ComponentChildren } from 'preact';

interface PrintPluginConfig extends BasePluginConfig {
    defaultQuality?: PrintQuality$1;
    defaultIncludeAnnotations?: boolean;
    batchSize?: number;
}
declare enum PrintQuality$1 {
    Normal = "normal",
    High = "high"
}
declare enum PageRangeType$1 {
    Current = "current",
    All = "all",
    Custom = "custom"
}
interface PageRangeCurrent$1 {
    type: PageRangeType$1.Current;
    currentPage: number;
}
interface PageRangeAll$1 {
    type: PageRangeType$1.All;
}
interface PageRangeCustom$1 {
    type: PageRangeType$1.Custom;
    pages: number[];
}
type PageRange$1 = PageRangeCurrent$1 | PageRangeAll$1 | PageRangeCustom$1;
interface PrintOptions$1 {
    pageRange: PageRange$1;
    includeAnnotations: boolean;
    quality: PrintQuality$1;
}
interface PrintProgress$1 {
    current: number;
    total: number;
    status: 'preparing' | 'rendering' | 'complete' | 'error';
    message?: string;
}
interface ParsedPageRange$1 {
    pages: number[];
    isValid: boolean;
    error?: string;
}
interface PrintPageResult {
    pageIndex: number;
    blob: Blob;
}
interface PrintCapability {
    preparePrint: (options: PrintOptions$1, onProgress?: (progress: PrintProgress$1) => void, onPageReady?: (result: PrintPageResult) => void) => Promise<void>;
    parsePageRange: (rangeString: string) => ParsedPageRange$1;
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

declare const usePrintPlugin: () => {
    plugin: PrintPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const usePrintCapability: () => {
    provides: Readonly<PrintCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

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
interface ParsedPageRange {
    pages: number[];
    isValid: boolean;
    error?: string;
}

declare const usePrintAction: () => {
    executePrint: (options: PrintOptions) => Promise<void>;
    progress: PrintProgress | null;
    isReady: boolean;
    isPrinting: boolean;
    parsePageRange: (rangeString: string) => ParsedPageRange;
};

interface PrintContextValue {
    parsePageRange: (rangeString: string) => ParsedPageRange;
    executePrint: (options: PrintOptions) => Promise<void>;
    progress: PrintProgress | null;
    isReady: boolean;
    isPrinting: boolean;
}
interface PrintProviderProps {
    children: ComponentChildren;
}
declare function PrintProvider({ children }: PrintProviderProps): preact.JSX.Element;
declare function usePrintContext(): PrintContextValue;

export { PrintProvider, usePrintAction, usePrintCapability, usePrintContext, usePrintPlugin };
