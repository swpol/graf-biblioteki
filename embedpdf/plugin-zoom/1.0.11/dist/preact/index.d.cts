import * as _embedpdf_plugin_zoom from '@embedpdf/plugin-zoom';
import { ZoomPlugin, ZoomState } from '@embedpdf/plugin-zoom';
import * as preact from 'preact';
import { JSX, ComponentChildren } from 'preact';

declare const useZoomCapability: () => {
    provides: Readonly<_embedpdf_plugin_zoom.ZoomCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useZoomPlugin: () => {
    plugin: ZoomPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useZoom: () => {
    state: ZoomState;
    provides: Readonly<_embedpdf_plugin_zoom.ZoomCapability> | null;
};

declare function usePinch(): {
    elementRef: preact.RefObject<HTMLDivElement>;
};

/** @jsxImportSource preact */

type PinchWrapperProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: ComponentChildren;
    style?: JSX.CSSProperties;
};
declare function PinchWrapper({ children, style, ...props }: PinchWrapperProps): JSX.Element;

interface MarqueeZoomProps {
    /** Index of the page this layer lives on */
    pageIndex: number;
    /** Scale of the page */
    scale: number;
    /** Width of the page */
    pageWidth: number;
    /** Height of the page */
    pageHeight: number;
    /** Optional CSS class applied to the marquee rectangle */
    className?: string;
    /** Stroke / fill colours (defaults below) */
    stroke?: string;
    fill?: string;
}
/**
 * Draws a marquee rectangle while the user drags.
 * Hook it into the interaction-manager with modeId = 'marqueeZoom'.
 */
declare const MarqueeZoom: ({ pageIndex, scale, pageWidth, pageHeight, className, stroke, fill, }: MarqueeZoomProps) => preact.JSX.Element | null;

export { MarqueeZoom, PinchWrapper, usePinch, useZoom, useZoomCapability, useZoomPlugin };
