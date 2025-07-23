// src/lib/search-plugin.ts
import { BasePlugin, createBehaviorEmitter } from "@embedpdf/core";

// src/lib/actions.ts
var START_SEARCH_SESSION = "START_SEARCH_SESSION";
var STOP_SEARCH_SESSION = "STOP_SEARCH_SESSION";
var SET_SEARCH_FLAGS = "SET_SEARCH_FLAGS";
var SET_SHOW_ALL_RESULTS = "SET_SHOW_ALL_RESULTS";
var START_SEARCH = "START_SEARCH";
var SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
var SET_ACTIVE_RESULT_INDEX = "SET_ACTIVE_RESULT_INDEX";
function startSearchSession() {
  return { type: START_SEARCH_SESSION };
}
function stopSearchSession() {
  return { type: STOP_SEARCH_SESSION };
}
function setSearchFlags(flags) {
  return { type: SET_SEARCH_FLAGS, payload: flags };
}
function setShowAllResults(showAll) {
  return { type: SET_SHOW_ALL_RESULTS, payload: showAll };
}
function startSearch(query) {
  return { type: START_SEARCH, payload: query };
}
function setSearchResults(results, total, activeResultIndex) {
  return { type: SET_SEARCH_RESULTS, payload: { results, total, activeResultIndex } };
}
function setActiveResultIndex(index) {
  return { type: SET_ACTIVE_RESULT_INDEX, payload: index };
}

// src/lib/search-plugin.ts
var SearchPlugin = class extends BasePlugin {
  constructor(id, registry, engine) {
    super(id, registry);
    this.searchStop$ = createBehaviorEmitter();
    this.searchStart$ = createBehaviorEmitter();
    this.searchResult$ = createBehaviorEmitter();
    this.searchActiveResultChange$ = createBehaviorEmitter();
    this.searchResultState$ = createBehaviorEmitter();
    this.searchState$ = createBehaviorEmitter();
    this.engine = engine;
    this.loader = this.registry.getPlugin("loader").provides();
    this.loader.onDocumentLoaded(this.handleDocumentLoaded.bind(this));
    this.loader.onLoaderEvent(this.handleLoaderEvent.bind(this));
  }
  handleDocumentLoaded(doc) {
    this.currentDocument = doc;
    if (this.state.active) {
      this.startSearchSession();
    }
  }
  handleLoaderEvent(event) {
    if (event.type === "error" || event.type === "start" && this.currentDocument) {
      if (this.state.active) {
        this.stopSearchSession();
      }
      this.currentDocument = void 0;
    }
  }
  async initialize(config) {
    this.dispatch(setSearchFlags(config.flags || []));
    this.dispatch(
      setShowAllResults(config.showAllResults !== void 0 ? config.showAllResults : true)
    );
  }
  onStoreUpdated(_prevState, newState) {
    this.searchResultState$.emit({
      results: newState.results,
      activeResultIndex: newState.activeResultIndex,
      showAllResults: newState.showAllResults,
      active: newState.active
    });
    this.searchState$.emit(newState);
  }
  buildCapability() {
    return {
      startSearch: this.startSearchSession.bind(this),
      stopSearch: this.stopSearchSession.bind(this),
      searchAllPages: this.searchAllPages.bind(this),
      nextResult: this.nextResult.bind(this),
      previousResult: this.previousResult.bind(this),
      goToResult: this.goToResult.bind(this),
      setShowAllResults: (showAll) => this.dispatch(setShowAllResults(showAll)),
      getShowAllResults: () => this.state.showAllResults,
      onSearchResult: this.searchResult$.on,
      onSearchStart: this.searchStart$.on,
      onSearchStop: this.searchStop$.on,
      onActiveResultChange: this.searchActiveResultChange$.on,
      onSearchResultStateChange: this.searchResultState$.on,
      onStateChange: this.searchState$.on,
      getFlags: () => this.state.flags,
      setFlags: (flags) => this.setFlags(flags),
      getState: () => this.state
    };
  }
  setFlags(flags) {
    this.dispatch(setSearchFlags(flags));
    if (this.state.active) {
      this.searchAllPages(this.state.query, true);
    }
  }
  notifySearchStart() {
    this.searchStart$.emit();
  }
  notifySearchStop() {
    this.searchStop$.emit();
  }
  notifyActiveResultChange(index) {
    this.searchActiveResultChange$.emit(index);
  }
  startSearchSession() {
    if (!this.currentDocument) {
      return;
    }
    this.dispatch(startSearchSession());
    this.notifySearchStart();
  }
  stopSearchSession() {
    if (!this.currentDocument || !this.getState().active) {
      return;
    }
    this.dispatch(stopSearchSession());
    this.notifySearchStop();
  }
  async searchAllPages(keyword, force = false) {
    const trimmedKeyword = keyword.trim();
    if (this.state.query === trimmedKeyword && !force) {
      return { results: this.state.results, total: this.state.total };
    }
    this.dispatch(startSearch(trimmedKeyword));
    if (!trimmedKeyword) {
      this.dispatch(setSearchResults([], 0, -1));
      return { results: [], total: 0 };
    }
    if (!this.currentDocument) {
      this.dispatch(setSearchResults([], 0, -1));
      return { results: [], total: 0 };
    }
    if (!this.state.active) {
      this.startSearchSession();
    }
    return new Promise((resolve) => {
      this.engine.searchAllPages(this.currentDocument, trimmedKeyword, this.state.flags).wait(
        (results) => {
          const activeResultIndex = results.total > 0 ? 0 : -1;
          this.dispatch(setSearchResults(results.results, results.total, activeResultIndex));
          this.searchResult$.emit(results);
          if (results.total > 0) {
            this.notifyActiveResultChange(0);
          }
          resolve(results);
        },
        (error) => {
          console.error("Error during search:", error);
          this.dispatch(setSearchResults([], 0, -1));
          resolve({ results: [], total: 0 });
        }
      );
    });
  }
  nextResult() {
    if (this.state.results.length === 0) {
      return -1;
    }
    const nextIndex = this.state.activeResultIndex >= this.state.results.length - 1 ? 0 : this.state.activeResultIndex + 1;
    return this.goToResult(nextIndex);
  }
  previousResult() {
    if (this.state.results.length === 0) {
      return -1;
    }
    const prevIndex = this.state.activeResultIndex <= 0 ? this.state.results.length - 1 : this.state.activeResultIndex - 1;
    return this.goToResult(prevIndex);
  }
  goToResult(index) {
    if (this.state.results.length === 0 || index < 0 || index >= this.state.results.length) {
      return -1;
    }
    this.dispatch(setActiveResultIndex(index));
    this.notifyActiveResultChange(index);
    return index;
  }
  async destroy() {
    if (this.state.active && this.currentDocument) {
      this.stopSearchSession();
    }
    this.searchResult$.clear();
    this.searchStart$.clear();
    this.searchStop$.clear();
    this.searchActiveResultChange$.clear();
    this.searchResultState$.clear();
    this.searchState$.clear();
  }
};
SearchPlugin.id = "search";

// src/lib/manifest.ts
var SEARCH_PLUGIN_ID = "search";
var manifest = {
  id: SEARCH_PLUGIN_ID,
  name: "Search Plugin",
  version: "1.0.0",
  provides: ["search"],
  requires: ["loader"],
  optional: [],
  defaultConfig: {
    enabled: true,
    flags: []
  }
};

// src/lib/reducer.ts
var initialState = {
  flags: [],
  results: [],
  total: 0,
  activeResultIndex: -1,
  showAllResults: true,
  query: "",
  loading: false,
  active: false
};
var searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SEARCH_SESSION:
      return { ...state, active: true };
    case STOP_SEARCH_SESSION:
      return {
        ...state,
        results: [],
        total: 0,
        activeResultIndex: -1,
        query: "",
        loading: false,
        active: false
      };
    case SET_SEARCH_FLAGS:
      return { ...state, flags: action.payload };
    case SET_SHOW_ALL_RESULTS:
      return { ...state, showAllResults: action.payload };
    case START_SEARCH:
      return { ...state, loading: true, query: action.payload };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload.results,
        total: action.payload.total,
        activeResultIndex: action.payload.activeResultIndex,
        loading: false
      };
    case SET_ACTIVE_RESULT_INDEX:
      return { ...state, activeResultIndex: action.payload };
    default:
      return state;
  }
};

// src/lib/index.ts
var SearchPluginPackage = {
  manifest,
  create: (registry, engine) => new SearchPlugin(SEARCH_PLUGIN_ID, registry, engine),
  reducer: searchReducer,
  initialState
};
export {
  SEARCH_PLUGIN_ID,
  SearchPlugin,
  SearchPluginPackage,
  initialState,
  manifest
};
//# sourceMappingURL=index.js.map