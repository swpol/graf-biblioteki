import { InteractionManagerPlugin, PointerEventHandlersWithLifecycle } from '../..';
export declare const useInteractionManagerPlugin: () => import('@embedpdf/core/vue').PluginState<InteractionManagerPlugin>;
export declare const useInteractionManagerCapability: () => import('@embedpdf/core/vue').CapabilityState<Readonly<import('../..').InteractionManagerCapability>>;
export declare function useInteractionManager(): {
    provides: import('vue').Ref<Readonly<import('../..').InteractionManagerCapability> | null, Readonly<import('../..').InteractionManagerCapability> | null>;
    state: Readonly<import('vue').Ref<{
        readonly activeMode: string;
        readonly cursor: string;
        readonly paused: boolean;
    }, {
        readonly activeMode: string;
        readonly cursor: string;
        readonly paused: boolean;
    }>>;
};
export declare function useCursor(): {
    setCursor: (token: string, cursor: string, prio?: number) => void;
    removeCursor: (token: string) => void;
};
interface UsePointerHandlersOptions {
    modeId?: string | string[];
    pageIndex?: number;
}
export declare function usePointerHandlers({ modeId, pageIndex }: UsePointerHandlersOptions): {
    register: (handlers: PointerEventHandlersWithLifecycle, options?: {
        modeId?: string | string[];
        pageIndex?: number;
    }) => (() => void) | undefined;
};
export declare function useIsPageExclusive(): Readonly<import('vue').Ref<boolean, boolean>>;
export {};
