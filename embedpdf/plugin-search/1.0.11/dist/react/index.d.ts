import * as _embedpdf_plugin_search from '@embedpdf/plugin-search';
import { SearchPlugin, SearchState } from '@embedpdf/plugin-search';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const useSearchPlugin: () => {
    plugin: SearchPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useSearchCapability: () => {
    provides: Readonly<_embedpdf_plugin_search.SearchCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useSearch: () => {
    state: SearchState;
    provides: Readonly<_embedpdf_plugin_search.SearchCapability> | null;
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
