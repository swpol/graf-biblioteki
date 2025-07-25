import { ReactNode } from 'react';
import { Position } from '@embedpdf/models';
interface PagePointerProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    pageIndex: number;
    pageWidth: number;
    pageHeight: number;
    rotation: number;
    scale: number;
    style?: React.CSSProperties;
    convertEventToPoint?: (event: PointerEvent, element: HTMLElement) => Position;
}
export declare const PagePointerProvider: ({ pageIndex, children, pageWidth, pageHeight, rotation, scale, convertEventToPoint, style, ...props }: PagePointerProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
