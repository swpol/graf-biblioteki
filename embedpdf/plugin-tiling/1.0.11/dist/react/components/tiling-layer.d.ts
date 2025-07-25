type TilingLayoutProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
    pageIndex: number;
    scale: number;
    style?: React.CSSProperties;
};
export declare function TilingLayer({ pageIndex, scale, style, ...props }: TilingLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
