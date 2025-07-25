import { BasePlugin, BasePluginConfig, EventHook, Action, PluginRegistry } from '@embedpdf/core';
import { MatchFlag, SearchAllPagesResult, SearchResult, PdfEngine } from '@embedpdf/models';

interface SearchPluginConfig extends BasePluginConfig {
    flags?: MatchFlag[];
    /**
     * Whether to show all search results or only the active one
     * @default true
     */
    showAllResults?: boolean;
}
interface SearchResultState {
    /**
     * Current search results from last search operation
     */
    results: SearchResult[];
    /**
     * Current active result index (0-based)
     */
    activeResultIndex: number;
    /**
     * Whether to show all search results or only the active one
     */
    showAllResults: boolean;
    /**
     * Whether search is currently active
     */
    active: boolean;
}
interface SearchState {
    flags: MatchFlag[];
    /**
     * Current search results from last search operation
     */
    results: SearchResult[];
    /**
     * Total number of search results
     */
    total: number;
    /**
     * Current active result index (0-based)
     */
    activeResultIndex: number;
    /**
     * Whether to show all search results or only the active one
     */
    showAllResults: boolean;
    /**
     * Current search query
     */
    query: string;
    /**
     * Whether a search operation is in progress
     */
    loading: boolean;
    /**
     * Whether search is currently active
     */
    active: boolean;
}
interface SearchCapability {
    /**
     * Start a search session
     */
    startSearch: () => void;
    /**
     * Stop the active search session
     */
    stopSearch: () => void;
    /**
     * Search for all occurrences of the keyword throughout the document
     * @param keyword - Text to search for
     * @returns Promise that resolves to all search results or empty result if none found
     */
    searchAllPages: (keyword: string) => Promise<SearchAllPagesResult>;
    /**
     * Navigate to the next search result
     * @returns The new active result index
     */
    nextResult: () => number;
    /**
     * Navigate to the previous search result
     * @returns The new active result index
     */
    previousResult: () => number;
    /**
     * Go to a specific search result by index
     * @param index - The index of the result to go to
     * @returns The new active result index
     */
    goToResult: (index: number) => number;
    /**
     * Toggle visibility of all search results
     * @param showAll - Whether to show all results or only the active one
     */
    setShowAllResults: (showAll: boolean) => void;
    /**
     * Get current state of search results visibility
     * @returns Whether all results are visible
     */
    getShowAllResults: () => boolean;
    /**
     * Subscribe to search results
     * @param handler - Handler function to receive search results
     * @returns Function to unsubscribe the handler
     */
    onSearchResult: EventHook<SearchAllPagesResult>;
    /**
     * Subscribe to search session start events
     * @param handler - Handler function called when search session starts
     * @returns Function to unsubscribe the handler
     */
    onSearchStart: EventHook;
    /**
     * Subscribe to search session stop events
     * @param handler - Handler function called when search session stops
     * @returns Function to unsubscribe the handler
     */
    onSearchStop: EventHook;
    /**
     * Subscribe to active result change events
     * @param handler - Handler function called when active result changes
     * @returns Function to unsubscribe the handler
     */
    onActiveResultChange: EventHook<number>;
    /**
     * Subscribe to search result state change events
     * @param handler - Handler function called when search state changes
     * @returns Function to unsubscribe the handler
     */
    onSearchResultStateChange: EventHook<SearchResultState>;
    /**
     * Get the current search flags
     * @returns Array of active search flags
     */
    getFlags: () => MatchFlag[];
    /**
     * Set the search flags
     * @param flags - Array of search flags to use
     */
    setFlags: (flags: MatchFlag[]) => void;
    /**
     * Subscribe to state change events
     * @param handler - Handler function called when state changes
     * @returns Function to unsubscribe the handler
     */
    onStateChange: EventHook<SearchState>;
    /**
     * Get the current search state
     * @returns The current search state
     */
    getState: () => SearchState;
}

declare const START_SEARCH_SESSION = "START_SEARCH_SESSION";
declare const STOP_SEARCH_SESSION = "STOP_SEARCH_SESSION";
declare const SET_SEARCH_FLAGS = "SET_SEARCH_FLAGS";
declare const SET_SHOW_ALL_RESULTS = "SET_SHOW_ALL_RESULTS";
declare const START_SEARCH = "START_SEARCH";
declare const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
declare const SET_ACTIVE_RESULT_INDEX = "SET_ACTIVE_RESULT_INDEX";
interface StartSearchSessionAction extends Action {
    type: typeof START_SEARCH_SESSION;
}
interface StopSearchSessionAction extends Action {
    type: typeof STOP_SEARCH_SESSION;
}
interface SetSearchFlagsAction extends Action {
    type: typeof SET_SEARCH_FLAGS;
    payload: MatchFlag[];
}
interface SetShowAllResultsAction extends Action {
    type: typeof SET_SHOW_ALL_RESULTS;
    payload: boolean;
}
interface StartSearchAction extends Action {
    type: typeof START_SEARCH;
    payload: string;
}
interface SetSearchResultsAction extends Action {
    type: typeof SET_SEARCH_RESULTS;
    payload: {
        results: SearchResult[];
        total: number;
        activeResultIndex: number;
    };
}
interface SetActiveResultIndexAction extends Action {
    type: typeof SET_ACTIVE_RESULT_INDEX;
    payload: number;
}
type SearchAction = StartSearchSessionAction | StopSearchSessionAction | SetSearchFlagsAction | SetShowAllResultsAction | StartSearchAction | SetSearchResultsAction | SetActiveResultIndexAction;

declare class SearchPlugin extends BasePlugin<SearchPluginConfig, SearchCapability, SearchState, SearchAction> {
    static readonly id: "search";
    private loader;
    private currentDocument?;
    private engine;
    private readonly searchStop$;
    private readonly searchStart$;
    private readonly searchResult$;
    private readonly searchActiveResultChange$;
    private readonly searchResultState$;
    private readonly searchState$;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine);
    private handleDocumentLoaded;
    private handleLoaderEvent;
    initialize(config: SearchPluginConfig): Promise<void>;
    onStoreUpdated(_prevState: SearchState, newState: SearchState): void;
    protected buildCapability(): SearchCapability;
    private setFlags;
    private notifySearchStart;
    private notifySearchStop;
    private notifyActiveResultChange;
    private startSearchSession;
    private stopSearchSession;
    private searchAllPages;
    private nextResult;
    private previousResult;
    private goToResult;
    destroy(): Promise<void>;
}

export { SearchPlugin as S, type SearchCapability as a, type SearchState as b };
