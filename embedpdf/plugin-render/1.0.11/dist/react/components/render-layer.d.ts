type RenderLayoutProps = Omit<React.HTMLAttributes<HTMLImageElement>, 'style'> & {
    pageIndex: number;
    scaleFactor?: number;
    dpr?: number;
    style?: React.CSSProperties;
};
export declare function RenderLayer({ pageIndex, scaleFactor, dpr, style, ...props }: RenderLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
