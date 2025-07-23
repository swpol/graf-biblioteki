import { TilingPlugin } from '../..';
/** Get the plugin instance itself (e.g. to read config) */
export declare const useTilingPlugin: () => import('@embedpdf/core/vue').PluginState<TilingPlugin>;
/** Get the *capability* the plugin exposes (renderTile, onTileRendering) */
export declare const useTilingCapability: () => import('@embedpdf/core/vue').CapabilityState<Readonly<import('../..').TilingCapability>>;
