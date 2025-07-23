import * as _embedpdf_plugin_pan from '@embedpdf/plugin-pan';
import { PanPlugin } from '@embedpdf/plugin-pan';
import * as preact from 'preact';

declare const usePanPlugin: () => {
    plugin: PanPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const usePanCapability: () => {
    provides: Readonly<_embedpdf_plugin_pan.PanCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const usePan: () => {
    provides: Readonly<_embedpdf_plugin_pan.PanCapability> | null;
    isPanning: boolean;
};

declare const PanMode: () => preact.JSX.Element;

export { PanMode, usePan, usePanCapability, usePanPlugin };
