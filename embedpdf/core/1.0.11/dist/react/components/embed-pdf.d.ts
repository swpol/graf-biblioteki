import { default as React } from 'react';
import { PdfEngine } from '@embedpdf/models';
import { PluginRegistry, IPlugin, PluginBatchRegistration } from '../..';
import { PDFContextState } from '../context';
interface EmbedPDFProps {
    engine: PdfEngine;
    onInitialized?: (registry: PluginRegistry) => Promise<void>;
    plugins: PluginBatchRegistration<IPlugin<any>, any>[];
    children: React.ReactNode | ((state: PDFContextState) => React.ReactNode);
}
export declare function EmbedPDF({ engine, onInitialized, plugins, children }: EmbedPDFProps): import("react/jsx-runtime").JSX.Element;
export {};
