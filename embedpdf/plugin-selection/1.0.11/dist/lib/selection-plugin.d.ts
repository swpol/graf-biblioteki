import { BasePlugin, PluginRegistry } from '@embedpdf/core';
import { PdfEngine } from '@embedpdf/models';
import { SelectionAction } from './actions';
import { SelectionCapability, SelectionPluginConfig, SelectionState } from './types';
export declare class SelectionPlugin extends BasePlugin<SelectionPluginConfig, SelectionCapability, SelectionState, SelectionAction> {
    private engine;
    static readonly id: "selection";
    /** Modes that should trigger text-selection logic */
    private enabledModes;
    private selecting;
    private anchor?;
    private readonly selChange$;
    private readonly textRetrieved$;
    private readonly copyToClipboard$;
    private readonly beginSelection$;
    private readonly endSelection$;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    initialize(): Promise<void>;
    destroy(): Promise<void>;
    buildCapability(): SelectionCapability;
    private getOrLoadGeometry;
    private beginSelection;
    private endSelection;
    private clearSelection;
    private updateSelection;
    private updateRectsAndSlices;
    private getSelectedText;
    private copyToClipboard;
}
