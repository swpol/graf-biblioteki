import { T as ThumbnailPlugin, a as ThumbnailCapability, b as ThumbMeta } from '../index.d-jl9K9ewE.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useThumbnailPlugin: () => {
    plugin: ThumbnailPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useThumbnailCapability: () => {
    provides: Readonly<ThumbnailCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

type ThumbnailsProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> & {
    style?: React.CSSProperties;
    children: (m: ThumbMeta) => React.ReactNode;
    selectedPage?: number;
    scrollOptions?: ScrollIntoViewOptions;
};
declare function ThumbnailsPane({ style, selectedPage, scrollOptions, ...props }: ThumbnailsProps): react_jsx_runtime.JSX.Element;

type ThumbnailImgProps = Omit<React.HTMLAttributes<HTMLImageElement>, 'style'> & {
    style?: React.CSSProperties;
    meta: ThumbMeta;
};
declare function ThumbImg({ meta, style, ...props }: ThumbnailImgProps): react_jsx_runtime.JSX.Element | null;

export { ThumbImg, ThumbnailsPane, useThumbnailCapability, useThumbnailPlugin };
