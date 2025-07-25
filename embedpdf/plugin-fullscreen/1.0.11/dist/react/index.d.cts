import { F as FullscreenPlugin, a as FullscreenCapability, b as FullscreenState } from '../index.d-kMIJ8k0W.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import '@embedpdf/core';

declare const useFullscreenPlugin: () => {
    plugin: FullscreenPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useFullscreenCapability: () => {
    provides: Readonly<FullscreenCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useFullscreen: () => {
    provides: Readonly<FullscreenCapability> | null;
    state: FullscreenState;
};

type FullscreenProviderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: React.ReactNode;
    style?: React.CSSProperties;
};
declare function FullscreenProvider({ children, ...props }: FullscreenProviderProps): react_jsx_runtime.JSX.Element;

export { FullscreenProvider, useFullscreen, useFullscreenCapability, useFullscreenPlugin };
