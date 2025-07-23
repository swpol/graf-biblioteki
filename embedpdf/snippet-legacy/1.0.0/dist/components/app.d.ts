import React from 'preact/compat';
import { Rotation } from '@embedpdf/models';
import { VIEWPORT_PLUGIN_ID, ViewportPluginConfig, ViewportState } from '@embedpdf/plugin-viewport';
import { SCROLL_PLUGIN_ID, ScrollPluginConfig, ScrollState, ScrollStrategy } from '@embedpdf/plugin-scroll';
import { SPREAD_PLUGIN_ID, SpreadMode, SpreadPluginConfig, SpreadState } from '@embedpdf/plugin-spread';
import { MenuItem, GlobalStoreState, IconRegistry, UIComponentType, UIPluginConfig } from '@embedpdf/plugin-ui';
import { ZOOM_PLUGIN_ID, ZoomMode, ZoomPluginConfig, ZoomState } from '@embedpdf/plugin-zoom';
import { RotatePluginConfig } from '@embedpdf/plugin-rotate';
import { SEARCH_PLUGIN_ID, SearchState } from '@embedpdf/plugin-search';
import { SELECTION_PLUGIN_ID, SelectionState } from '@embedpdf/plugin-selection';
import { TilingPluginConfig } from '@embedpdf/plugin-tiling';
import { ThumbnailPluginConfig } from '@embedpdf/plugin-thumbnail';
import { ANNOTATION_PLUGIN_ID, AnnotationState } from '@embedpdf/plugin-annotation';
import { PrintPluginConfig } from '@embedpdf/plugin-print';
import { FULLSCREEN_PLUGIN_ID, FullscreenState } from '@embedpdf/plugin-fullscreen';
import { INTERACTION_MANAGER_PLUGIN_ID, InteractionManagerState } from '@embedpdf/plugin-interaction-manager';
import { HISTORY_PLUGIN_ID, HistoryState } from '@embedpdf/plugin-history';
export { ScrollStrategy, ZoomMode, SpreadMode, Rotation };
export interface PluginConfigs {
    viewport?: ViewportPluginConfig;
    scroll?: ScrollPluginConfig;
    zoom?: ZoomPluginConfig;
    spread?: SpreadPluginConfig;
    rotate?: RotatePluginConfig;
    tiling?: TilingPluginConfig;
    thumbnail?: ThumbnailPluginConfig;
    print?: PrintPluginConfig;
}
export interface PDFViewerConfig {
    src: string;
    worker?: boolean;
    wasmUrl?: string;
    plugins?: PluginConfigs;
    log?: boolean;
}
interface PDFViewerProps {
    config: PDFViewerConfig;
}
type State = GlobalStoreState<{
    [ZOOM_PLUGIN_ID]: ZoomState;
    [VIEWPORT_PLUGIN_ID]: ViewportState;
    [SCROLL_PLUGIN_ID]: ScrollState;
    [SPREAD_PLUGIN_ID]: SpreadState;
    [SEARCH_PLUGIN_ID]: SearchState;
    [SELECTION_PLUGIN_ID]: SelectionState;
    [ANNOTATION_PLUGIN_ID]: AnnotationState;
    [FULLSCREEN_PLUGIN_ID]: FullscreenState;
    [INTERACTION_MANAGER_PLUGIN_ID]: InteractionManagerState;
    [HISTORY_PLUGIN_ID]: HistoryState;
}>;
export declare const icons: IconRegistry;
export declare const menuItems: Record<string, MenuItem<State>>;
export declare const components: Record<string, UIComponentType<State>>;
export declare const uiConfig: UIPluginConfig;
export declare function PDFViewer({ config }: PDFViewerProps): React.JSX.Element;
//# sourceMappingURL=app.d.ts.map