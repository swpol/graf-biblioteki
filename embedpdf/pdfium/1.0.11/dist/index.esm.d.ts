import { type PdfiumModule, type WrappedPdfiumModule } from './base';
export type { PdfiumModule, PdfiumRuntimeMethods, Type, CWrappedFunc, NameToType, NamesToType, Functions, Wrapped, Methods, WrappedPdfiumModule, } from './base';
export declare function init(moduleOverrides: Partial<PdfiumModule>): Promise<WrappedPdfiumModule>;
