import { JSX } from 'preact';
type TilingLayoutProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    pageIndex: number;
    scale: number;
    style?: JSX.CSSProperties;
};
export declare function TilingLayer({ pageIndex, scale, style, ...props }: TilingLayoutProps): JSX.Element;
export {};
