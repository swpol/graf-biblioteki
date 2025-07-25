import { RotatePlugin } from '../..';
/**
 * Hook to get the raw rotate plugin instance.
 */
export declare const useRotatePlugin: () => import('@embedpdf/core/vue').PluginState<RotatePlugin>;
/**
 * Hook to get the rotate plugin's capability API.
 * This provides methods for rotating the document.
 */
export declare const useRotateCapability: () => import('@embedpdf/core/vue').CapabilityState<Readonly<import('../..').RotateCapability>>;
