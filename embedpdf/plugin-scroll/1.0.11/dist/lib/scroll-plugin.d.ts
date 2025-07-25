import { BasePlugin, CoreState, PluginRegistry, StoreState } from '@embedpdf/core';
import { ScrollCapability, ScrollPluginConfig, ScrollState } from './types';
import { ScrollAction } from './actions';
export declare class ScrollPlugin extends BasePlugin<ScrollPluginConfig, ScrollCapability, ScrollState, ScrollAction> {
    readonly id: string;
    private config?;
    static readonly id: "scroll";
    private viewport;
    private strategy;
    private strategyConfig;
    private currentScale;
    private currentRotation;
    private initialPage?;
    private currentPage;
    private layoutReady;
    private readonly layout$;
    private readonly scroll$;
    private readonly state$;
    private readonly scrollerLayout$;
    private readonly pageChange$;
    private readonly layoutReady$;
    constructor(id: string, registry: PluginRegistry, config?: ScrollPluginConfig | undefined);
    private computeLayout;
    private computeMetrics;
    private commit;
    private commitMetrics;
    private refreshAll;
    private getVirtualItemsFromState;
    private getScrollerLayoutFromState;
    private pushScrollLayout;
    onStoreUpdated(_prevState: ScrollState, _newState: ScrollState): void;
    onCoreStoreUpdated(prevState: StoreState<CoreState>, newState: StoreState<CoreState>): void;
    /**
     * Change the scroll strategy at runtime (e.g., vertical <-> horizontal)
     * @param newStrategy ScrollStrategy.Horizontal or ScrollStrategy.Vertical
     */
    private setScrollStrategy;
    setLayoutReady(): void;
    protected buildCapability(): ScrollCapability;
    private getMetrics;
    private getLayout;
    private getRectPositionForPage;
    initialize(): Promise<void>;
    destroy(): Promise<void>;
}
