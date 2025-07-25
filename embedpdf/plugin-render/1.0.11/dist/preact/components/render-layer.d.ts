import { JSX } from 'preact';
type RenderLayoutProps = Omit<JSX.HTMLAttributes<HTMLImageElement>, 'style'> & {
    pageIndex: number;
    scaleFactor?: number;
    dpr?: number;
    style?: JSX.CSSProperties;
};
export declare function RenderLayer({ pageIndex, scaleFactor, dpr, style, ...props }: RenderLayoutProps): JSX.Element;
export {};
