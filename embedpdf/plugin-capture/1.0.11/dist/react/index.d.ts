import { C as CaptureCapability, a as CapturePlugin } from '../index.d-BN6Wh-pI.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useCaptureCapability: () => {
    provides: Readonly<CaptureCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useCapturePlugin: () => {
    plugin: CapturePlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};

interface MarqueeCaptureProps {
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
 * Hook it into the interaction-manager with modeId = 'marqueeCapture'.
 */
declare const MarqueeCapture: ({ pageIndex, scale, pageWidth, pageHeight, className, stroke, fill, }: MarqueeCaptureProps) => react_jsx_runtime.JSX.Element | null;

export { MarqueeCapture, useCaptureCapability, useCapturePlugin };
