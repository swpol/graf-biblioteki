import * as _embedpdf_plugin_print from '@embedpdf/plugin-print';
import { PrintPlugin } from '@embedpdf/plugin-print';
import * as preact from 'preact';
import { ComponentChildren } from 'preact';

declare const usePrintPlugin: () => {
    plugin: PrintPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const usePrintCapability: () => {
    provides: Readonly<_embedpdf_plugin_print.PrintCapability> | null;
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
