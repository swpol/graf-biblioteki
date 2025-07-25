import { E as ExportPlugin, a as ExportCapability } from '../index.d-DmdLJ-XG.js';
import * as preact from 'preact';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useExportPlugin: () => {
    plugin: ExportPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useExportCapability: () => {
    provides: Readonly<ExportCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

declare function Download(): preact.JSX.Element;

export { Download, useExportCapability, useExportPlugin };
