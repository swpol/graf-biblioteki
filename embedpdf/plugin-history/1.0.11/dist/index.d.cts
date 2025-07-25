import { BasePluginConfig, EventHook, Action, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';

interface HistoryPluginConfig extends BasePluginConfig {
}
/**
 * The core Command interface that other plugins will implement.
 */
interface Command {
    /** A function that applies the change. */
    execute(): void;
    /** A function that reverts the change. */
    undo(): void;
}
/**
 * An entry in the global timeline, associating a command with its topic.
 */
interface HistoryEntry {
    command: Command;
    topic: string;
}
/**
 * Information about the history state, to be emitted for UI updates.
 * Includes a global state and a record of each topic's state.
 */
interface HistoryState {
    global: {
        canUndo: boolean;
        canRedo: boolean;
    };
    topics: Record<string, {
        canUndo: boolean;
        canRedo: boolean;
    }>;
}
interface HistoryCapability {
    /**
     * Registers a command with the history stack.
     * @param command The command to register, with `execute` and `undo` methods.
     * @param topic A string identifier for the history scope (e.g., 'annotations').
     */
    register: (command: Command, topic: string) => void;
    /**
     * Undoes the last command.
     * @param topic If provided, undoes the last command for that specific topic.
     * If omitted, performs a global undo of the very last action.
     */
    undo: (topic?: string) => void;
    /**
     * Redoes the last undone command.
     * @param topic If provided, redoes the last command for that specific topic.
     * If omitted, performs a global redo.
     */
    redo: (topic?: string) => void;
    /**
     * Checks if an undo operation is possible.
     * @param topic If provided, checks for the specific topic. Otherwise, checks globally.
     */
    canUndo: (topic?: string) => boolean;
    /**
     * Checks if a redo operation is possible.
     * @param topic If provided, checks for the specific topic. Otherwise, checks globally.
     */
    canRedo: (topic?: string) => boolean;
    /**
     * An event hook that fires whenever a history action occurs.
     * @param topic The topic string that was affected by the action.
     */
    onHistoryChange: EventHook<string | undefined>;
    /**
     * Returns the current undo/redo state for all topics and the global timeline.
     */
    getHistoryState: () => HistoryState;
}

declare const SET_HISTORY_STATE = "HISTORY/SET_STATE";
interface SetHistoryStateAction extends Action {
    type: typeof SET_HISTORY_STATE;
    payload: HistoryState;
}
type HistoryAction = SetHistoryStateAction;

declare class HistoryPlugin extends BasePlugin<HistoryPluginConfig, HistoryCapability, HistoryState, HistoryAction> {
    static readonly id: "history";
    private readonly topicHistories;
    private globalTimeline;
    private globalIndex;
    private readonly historyChange$;
    constructor(id: string, registry: PluginRegistry);
    initialize(_: HistoryPluginConfig): Promise<void>;
    private getHistoryState;
    private emitHistoryChange;
    protected buildCapability(): HistoryCapability;
}

declare const HISTORY_PLUGIN_ID = "history";
declare const manifest: PluginManifest<HistoryPluginConfig>;

declare const HistoryPluginPackage: PluginPackage<HistoryPlugin, HistoryPluginConfig, HistoryState, HistoryAction>;

export { type Command, HISTORY_PLUGIN_ID, type HistoryCapability, type HistoryEntry, HistoryPlugin, type HistoryPluginConfig, HistoryPluginPackage, type HistoryState, manifest };
