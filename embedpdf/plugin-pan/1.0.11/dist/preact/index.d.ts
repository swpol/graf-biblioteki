import { P as PanPlugin, a as PanCapability } from '../index.d-DyQIqAPs.js';
import * as preact from 'preact';
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

declare const PanMode: () => preact.JSX.Element;

export { PanMode, usePan, usePanCapability, usePanPlugin };
