import { Z as ZoomCapability, a as ZoomPlugin, b as ZoomState } from '../index.d-CI6dyl93.js';
import * as react from 'react';
import { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import '@embedpdf/core';
import '@embedpdf/models';
import '@embedpdf/plugin-viewport';

declare const useZoomCapability: () => {
    provides: Readonly<ZoomCapability> | null;
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
    provides: Readonly<ZoomCapability> | null;
};

declare function usePinch(): {
    elementRef: react.RefObject<HTMLDivElement>;
};

type PinchWrapperProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
    children: ReactNode;
    style?: React.CSSProperties;
};
declare function PinchWrapper({ children, style, ...props }: PinchWrapperProps): react_jsx_runtime.JSX.Element;

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
declare const MarqueeZoom: ({ pageIndex, scale, pageWidth, pageHeight, className, stroke, fill, }: MarqueeZoomProps) => react_jsx_runtime.JSX.Element | null;

export { MarqueeZoom, PinchWrapper, usePinch, useZoom, useZoomCapability, useZoomPlugin };
