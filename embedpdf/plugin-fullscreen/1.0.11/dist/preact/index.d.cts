import { F as FullscreenPlugin, a as FullscreenCapability, b as FullscreenState } from '../index.d-kMIJ8k0W.cjs';
import { JSX, ComponentChildren } from 'preact';
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

type FullscreenProviderProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: ComponentChildren;
    style?: JSX.CSSProperties;
};
declare function FullscreenProvider({ children, ...props }: FullscreenProviderProps): JSX.Element;

export { FullscreenProvider, useFullscreen, useFullscreenCapability, useFullscreenPlugin };
