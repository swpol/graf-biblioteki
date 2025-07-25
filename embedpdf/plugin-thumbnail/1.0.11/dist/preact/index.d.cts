import { T as ThumbnailPlugin, a as ThumbnailCapability, b as ThumbMeta } from '../index.d-jl9K9ewE.cjs';
import { JSX, ComponentChildren } from 'preact';
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

/** @jsxImportSource preact */

type ThumbnailsProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    style?: JSX.CSSProperties;
    children: (m: ThumbMeta) => ComponentChildren;
    selectedPage?: number;
    scrollOptions?: ScrollIntoViewOptions;
};
declare function ThumbnailsPane({ style, selectedPage, scrollOptions, ...props }: ThumbnailsProps): JSX.Element;

/** @jsxImportSource preact */

type ThumbnailImgProps = Omit<JSX.HTMLAttributes<HTMLImageElement>, 'style'> & {
    style?: JSX.CSSProperties;
    meta: ThumbMeta;
};
declare function ThumbImg({ meta, style, ...props }: ThumbnailImgProps): JSX.Element | null;

export { ThumbImg, ThumbnailsPane, useThumbnailCapability, useThumbnailPlugin };
