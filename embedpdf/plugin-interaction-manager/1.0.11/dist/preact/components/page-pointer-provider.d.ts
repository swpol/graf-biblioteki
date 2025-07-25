import { ComponentChildren, JSX } from 'preact';
import { Position } from '@embedpdf/models';
interface PagePointerProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children: ComponentChildren;
    pageIndex: number;
    pageWidth: number;
    pageHeight: number;
    rotation: number;
    scale: number;
    style?: JSX.CSSProperties;
    convertEventToPoint?: (event: PointerEvent, element: HTMLElement) => Position;
}
export declare const PagePointerProvider: ({ pageIndex, children, pageWidth, pageHeight, rotation, scale, convertEventToPoint, style, ...props }: PagePointerProviderProps) => JSX.Element;
export {};
