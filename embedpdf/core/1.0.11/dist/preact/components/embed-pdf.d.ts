import { h, ComponentChildren } from 'preact';
import { PdfEngine } from '@embedpdf/models';
import { PluginRegistry, IPlugin, PluginBatchRegistration } from '../..';
import { PDFContextState } from '../context';
interface EmbedPDFProps {
    engine: PdfEngine;
    onInitialized?: (registry: PluginRegistry) => Promise<void>;
    plugins: PluginBatchRegistration<IPlugin<any>, any>[];
    children: ComponentChildren | ((state: PDFContextState) => ComponentChildren);
}
export declare function EmbedPDF({ engine, onInitialized, plugins, children }: EmbedPDFProps): h.JSX.Element;
export {};
