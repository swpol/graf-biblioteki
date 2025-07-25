import { default as React, ReactNode } from 'react';
import { PageLayout } from '../..';
import { PdfDocumentObject, Rotation } from '@embedpdf/models';
interface RenderPageProps extends PageLayout {
    rotation: Rotation;
    scale: number;
    document: PdfDocumentObject | null;
}
type ScrollerProps = React.HTMLAttributes<HTMLDivElement> & {
    renderPage: (props: RenderPageProps) => ReactNode;
    overlayElements?: ReactNode[];
};
export declare function Scroller({ renderPage, overlayElements, ...props }: ScrollerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
