import * as _embedpdf_plugin_fullscreen from '@embedpdf/plugin-fullscreen';
import { FullscreenPlugin, FullscreenState } from '@embedpdf/plugin-fullscreen';
import { JSX, ComponentChildren } from 'preact';

declare const useFullscreenPlugin: () => {
    plugin: FullscreenPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useFullscreenCapability: () => {
    provides: Readonly<_embedpdf_plugin_fullscreen.FullscreenCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useFullscreen: () => {
    provides: Readonly<_embedpdf_plugin_fullscreen.FullscreenCapability> | null;
    state: FullscreenState;
};

type FullscreenProviderProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: ComponentChildren;
    style?: JSX.CSSProperties;
};
declare function FullscreenProvider({ children, ...props }: FullscreenProviderProps): JSX.Element;

export { FullscreenProvider, useFullscreen, useFullscreenCapability, useFullscreenPlugin };
