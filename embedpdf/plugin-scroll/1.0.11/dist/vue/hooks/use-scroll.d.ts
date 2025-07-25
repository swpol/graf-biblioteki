import { ScrollPlugin } from '../..';
export declare const useScrollPlugin: () => import('@embedpdf/core/vue').PluginState<ScrollPlugin>;
export declare const useScrollCapability: () => import('@embedpdf/core/vue').CapabilityState<Readonly<import('../..').ScrollCapability>>;
/**
 * Convenience hook that also tracks current / total page.
 */
export declare function useScroll(): {
    scroll: import('vue').Ref<Readonly<import('../..').ScrollCapability> | null, Readonly<import('../..').ScrollCapability> | null>;
    currentPage: import('vue').Ref<number, number>;
    totalPages: import('vue').Ref<number, number>;
};
