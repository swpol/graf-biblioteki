import * as _embedpdf_plugin_fullscreen from '@embedpdf/plugin-fullscreen';
import { FullscreenPlugin, FullscreenState } from '@embedpdf/plugin-fullscreen';
import * as react_jsx_runtime from 'react/jsx-runtime';

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

type FullscreenProviderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: React.ReactNode;
    style?: React.CSSProperties;
};
declare function FullscreenProvider({ children, ...props }: FullscreenProviderProps): react_jsx_runtime.JSX.Element;

export { FullscreenProvider, useFullscreen, useFullscreenCapability, useFullscreenPlugin };
