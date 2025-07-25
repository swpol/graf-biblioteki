import { H as HistoryPlugin, a as HistoryCapability } from '../index.d-CMwUel4v.cjs';
import '@embedpdf/core';

declare const useHistoryPlugin: () => {
    plugin: HistoryPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useHistoryCapability: () => {
    provides: Readonly<HistoryCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

export { useHistoryCapability, useHistoryPlugin };
