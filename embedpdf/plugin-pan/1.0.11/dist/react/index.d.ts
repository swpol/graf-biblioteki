import * as _embedpdf_plugin_pan from '@embedpdf/plugin-pan';
import { PanPlugin } from '@embedpdf/plugin-pan';
import * as react_jsx_runtime from 'react/jsx-runtime';

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

declare const PanMode: () => react_jsx_runtime.JSX.Element;

export { PanMode, usePan, usePanCapability, usePanPlugin };
