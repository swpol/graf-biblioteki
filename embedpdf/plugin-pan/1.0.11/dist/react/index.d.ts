import { P as PanPlugin, a as PanCapability } from '../index.d-DyQIqAPs.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import '@embedpdf/core';

declare const usePanPlugin: () => {
    plugin: PanPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const usePanCapability: () => {
    provides: Readonly<PanCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const usePan: () => {
    provides: Readonly<PanCapability> | null;
    isPanning: boolean;
};

declare const PanMode: () => react_jsx_runtime.JSX.Element;

export { PanMode, usePan, usePanCapability, usePanPlugin };
