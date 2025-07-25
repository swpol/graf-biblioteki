import { S as SpreadPlugin, a as SpreadCapability, b as SpreadMode } from '../index.d-CRzuzO1x.cjs';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useSpreadPlugin: () => {
    plugin: SpreadPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useSpreadCapability: () => {
    provides: Readonly<SpreadCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useSpread: () => {
    provides: Readonly<SpreadCapability> | null;
    spreadMode: SpreadMode;
};

export { useSpread, useSpreadCapability, useSpreadPlugin };
