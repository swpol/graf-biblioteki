import { InteractionManagerPlugin, InteractionManagerState, PointerEventHandlersWithLifecycle } from '../..';
export declare const useInteractionManagerPlugin: () => {
    plugin: InteractionManagerPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useInteractionManagerCapability: () => {
    provides: Readonly<import('../..').InteractionManagerCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare function useInteractionManager(): {
    provides: Readonly<import('../..').InteractionManagerCapability> | null;
    state: InteractionManagerState;
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
export declare function useIsPageExclusive(): boolean;
export {};
