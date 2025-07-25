import { JSX } from 'preact';
import { PageLayout } from '../..';
import { PdfDocumentObject, Rotation } from '@embedpdf/models';
interface RenderPageProps extends PageLayout {
    rotation: Rotation;
    scale: number;
    document: PdfDocumentObject | null;
}
type ScrollerProps = JSX.HTMLAttributes<HTMLDivElement> & {
    renderPage: (props: RenderPageProps) => JSX.Element;
    overlayElements?: JSX.Element[];
};
export declare function Scroller({ renderPage, overlayElements, ...props }: ScrollerProps): JSX.Element | null;
export {};
