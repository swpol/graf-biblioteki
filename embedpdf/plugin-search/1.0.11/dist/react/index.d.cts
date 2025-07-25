import { S as SearchPlugin, a as SearchCapability, b as SearchState } from '../index.d-CKzh5azL.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useSearchPlugin: () => {
    plugin: SearchPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useSearchCapability: () => {
    provides: Readonly<SearchCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useSearch: () => {
    state: SearchState;
    provides: Readonly<SearchCapability> | null;
};

type SearchLayoutProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
    pageIndex: number;
    scale: number;
    highlightColor?: string;
    activeHighlightColor?: string;
    style?: React.CSSProperties;
};
declare function SearchLayer({ pageIndex, scale, style, highlightColor, activeHighlightColor, ...props }: SearchLayoutProps): react_jsx_runtime.JSX.Element | null;

export { SearchLayer, useSearch, useSearchCapability, useSearchPlugin };
