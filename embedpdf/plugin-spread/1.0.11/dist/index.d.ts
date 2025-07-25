import { BasePluginConfig, EventHook, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
import { PdfPageObject } from '@embedpdf/models';

interface SpreadPluginConfig extends BasePluginConfig {
    defaultSpreadMode?: SpreadMode;
}
declare enum SpreadMode {
    None = "none",
    Odd = "odd",
    Even = "even"
}
interface SpreadCapability {
    onSpreadChange: EventHook<SpreadMode>;
    setSpreadMode(mode: SpreadMode): void;
    getSpreadMode(): SpreadMode;
    getSpreadPagesObjects(pages: PdfPageObject[]): PdfPageObject[][];
}
interface SpreadState {
    spreadMode: SpreadMode;
}

declare const SET_SPREAD_MODE = "SET_SPREAD_MODE";
interface SetSpreadModeAction {
    type: typeof SET_SPREAD_MODE;
    payload: SpreadMode;
}
type SpreadAction = SetSpreadModeAction;

declare class SpreadPlugin extends BasePlugin<SpreadPluginConfig, SpreadCapability, SpreadState, SpreadAction> {
    static readonly id: "spread";
    private readonly spreadEmitter$;
    constructor(id: string, registry: PluginRegistry, cfg: SpreadPluginConfig);
    initialize(config: SpreadPluginConfig): Promise<void>;
    private documentLoaded;
    getSpreadPagesObjects(pages: PdfPageObject[]): PdfPageObject[][];
    setSpreadMode(mode: SpreadMode): void;
    private notifySpreadChange;
    protected buildCapability(): SpreadCapability;
    destroy(): Promise<void>;
}

declare const SPREAD_PLUGIN_ID = "spread";
declare const manifest: PluginManifest<SpreadPluginConfig>;

declare const SpreadPluginPackage: PluginPackage<SpreadPlugin, SpreadPluginConfig, SpreadState, SpreadAction>;

export { SPREAD_PLUGIN_ID, type SpreadCapability, SpreadMode, SpreadPlugin, type SpreadPluginConfig, SpreadPluginPackage, type SpreadState, manifest };
