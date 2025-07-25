"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SEARCH_PLUGIN_ID: () => SEARCH_PLUGIN_ID,
  SearchPlugin: () => SearchPlugin,
  SearchPluginPackage: () => SearchPluginPackage,
  initialState: () => initialState,
  manifest: () => manifest
});
module.exports = __toCommonJS(index_exports);

// ../core/dist/math-ChSRQF3r.js
var z = "\xAD";
var M = "\u200B";
var L = "\u2060";
var $ = "\uFEFF";
var F = "\uFFFE";
var N = "\uFFFF";
var k = Object.freeze([
  z,
  M,
  L,
  $,
  F,
  N
]);
new RegExp(`[${k.join("")}]`, "g");
var P = Object.freeze([
  { id: 0, label: "Normal", css: "normal" },
  { id: 1, label: "Multiply", css: "multiply" },
  { id: 2, label: "Screen", css: "screen" },
  { id: 3, label: "Overlay", css: "overlay" },
  { id: 4, label: "Darken", css: "darken" },
  { id: 5, label: "Lighten", css: "lighten" },
  { id: 6, label: "Color Dodge", css: "color-dodge" },
  { id: 7, label: "Color Burn", css: "color-burn" },
  { id: 8, label: "Hard Light", css: "hard-light" },
  { id: 9, label: "Soft Light", css: "soft-light" },
  { id: 10, label: "Difference", css: "difference" },
  { id: 11, label: "Exclusion", css: "exclusion" },
  { id: 12, label: "Hue", css: "hue" },
  { id: 13, label: "Saturation", css: "saturation" },
  { id: 14, label: "Color", css: "color" },
  { id: 15, label: "Luminosity", css: "luminosity" }
]);
P.reduce(
  (i, e) => (i[e.id] = e, i),
  {}
);
P.reduce((i, e) => (i[e.css] = e.id, i), {});
P.map((i) => ({
  value: i.id,
  label: i.label
}));
var _ = Object.freeze({
  1: "invisible",
  2: "hidden",
  4: "print",
  8: "noZoom",
  16: "noRotate",
  32: "noView",
  64: "readOnly",
  128: "locked",
  256: "toggleNoView"
});
Object.entries(
  _
).reduce(
  (i, [e, t]) => (i[t] = Number(e), i),
  {}
);
function v(i, e, t) {
  if (i === e)
    return true;
  if (i == null || e == null)
    return i === e;
  const r = typeof i;
  if (r !== typeof e) return false;
  if (r === "object") {
    t || (t = /* @__PURE__ */ new Set());
    const n = x(i, e);
    if (t.has(n))
      return true;
    t.add(n);
    const a = Array.isArray(i), o = Array.isArray(e);
    return a && o ? U(i, e, t) : !a && !o ? B(i, e, t) : false;
  }
  return false;
}
function x(i, e) {
  return `${S(i)}__${S(e)}`;
}
var G = 0;
var d = /* @__PURE__ */ new WeakMap();
function S(i) {
  return d.has(i) || d.set(i, ++G), d.get(i);
}
function U(i, e, t) {
  if (i.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s = 0; s < i.length; s++) {
    const n = i[s];
    for (let a = 0; a < e.length; a++)
      if (!r[a] && v(n, e[a], t)) {
        r[a] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i, e, t) {
  const r = Object.keys(i).sort(), s = Object.keys(e).sort();
  if (r.length !== s.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s[n]) return false;
  for (const n of r) {
    const a = i[n], o = e[n];
    if (!v(a, o, t))
      return false;
  }
  return true;
}

// ../core/dist/index.js
var w2 = class {
  constructor(t, e) {
    if (this.id = t, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i, s, c) => {
      this.onStoreUpdated(c, s);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i, s, c) => {
      this.onCoreStoreUpdated(c, s);
    }), this.readyPromise = new Promise((i) => {
      this.readyResolve = i;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t = this.buildCapability();
      this._capability = Object.freeze(t);
    }
    return this._capability;
  }
  /**
   *  Get a copy of the current state
   */
  get state() {
    return this.pluginStore.getState();
  }
  /**
   *  Get a copy of the current core state
   */
  get coreState() {
    return this.coreStore.getState();
  }
  /**
   * @deprecated  use `this.state` Get a copy of the current state
   */
  getState() {
    return this.pluginStore.getState();
  }
  /**
   * @deprecated  use `this.coreState` Get a copy of the current core state
   */
  getCoreState() {
    return this.coreStore.getState();
  }
  /**
   * Core Dispatch
   */
  dispatchCoreAction(t) {
    return this.coreStore.dispatchToCore(t);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t) {
    return this.coreStore.dispatch(t);
  }
  /**
   * Dispatch an action
   */
  dispatch(t) {
    return this.pluginStore.dispatch(t);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t, e = 100) {
    const i = Date.now(), s = this.debouncedActions[t.type] || 0;
    return i - s >= e ? (this.debouncedActions[t.type] = i, this.dispatch(t), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t) {
    return this.pluginStore.subscribeToState(t);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t) {
    return this.coreStore.subscribe(t);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t, e) {
  }
  /**
   * Cleanup method to be called when plugin is being destroyed
   */
  destroy() {
    this.unsubscribeFromState && (this.unsubscribeFromState(), this.unsubscribeFromState = null), this.unsubscribeFromCoreStore && (this.unsubscribeFromCoreStore(), this.unsubscribeFromCoreStore = null);
  }
  /**
   * Returns a promise that resolves when the plugin is ready
   */
  ready() {
    return this.readyPromise;
  }
  /**
   * Mark the plugin as ready
   */
  markReady() {
    this.readyResolve();
  }
  /**
   * Reset the ready state (useful for plugins that need to reinitialize)
   */
  resetReady() {
    this.readyPromise = new Promise((t) => {
      this.readyResolve = t;
    });
  }
};
var b2 = class {
  constructor(t, e) {
    this.handler = t, this.options = e, this.lastRun = 0, this.handle = (i) => {
      this.options.mode === "debounce" ? this.debounce(i) : this.throttle(i);
    };
  }
  debounce(t) {
    this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(() => {
      this.handler(t), this.timeoutId = void 0;
    }, this.options.wait);
  }
  throttle(t) {
    if (this.options.mode === "debounce") return;
    const e = Date.now(), i = this.options.throttleMode || "leading-trailing";
    e - this.lastRun >= this.options.wait && (i === "leading-trailing" && this.handler(t), this.lastRun = e), this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(
      () => {
        this.handler(t), this.lastRun = Date.now(), this.timeoutId = void 0;
      },
      this.options.wait - (e - this.lastRun)
    );
  }
  destroy() {
    this.timeoutId && window.clearTimeout(this.timeoutId);
  }
};
function C(o, t = v) {
  const e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let s = o;
  const c = (r) => e.forEach((n) => n(r)), p2 = (r, n) => {
    let a = r, d2 = () => {
    };
    if (n) {
      const u2 = new b2(r, n);
      a = u2.handle, d2 = () => u2.destroy(), i.set(r, { wrapped: a, destroy: d2 });
    }
    return s !== void 0 && a(s), e.add(a), () => {
      e.delete(a), d2(), i.delete(r);
    };
  };
  return {
    /* emitter behaviour ---------------------------------------- */
    get value() {
      return s;
    },
    emit(r = void 0) {
      (s === void 0 || !t(s, r)) && (s = r, c(r));
    },
    on: p2,
    off(r) {
      const n = i.get(r);
      n ? (e.delete(n.wrapped), n.destroy(), i.delete(r)) : e.delete(r);
    },
    clear() {
      e.clear(), i.forEach((r) => r.destroy()), i.clear();
    },
    /* derived hook --------------------------------------------- */
    select(r, n = v) {
      return (a, d2) => {
        let u2;
        if (s !== void 0) {
          const h = r(s);
          u2 = h, a(h);
        }
        return p2(
          (h) => {
            const l2 = r(h);
            (u2 === void 0 || !n(u2, l2)) && (u2 = l2, a(l2));
          },
          d2
        );
      };
    }
  };
}

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
var SearchPlugin = class extends w2 {
  constructor(id, registry, engine) {
    super(id, registry);
    this.searchStop$ = C();
    this.searchStart$ = C();
    this.searchResult$ = C();
    this.searchActiveResultChange$ = C();
    this.searchResultState$ = C();
    this.searchState$ = C();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SEARCH_PLUGIN_ID,
  SearchPlugin,
  SearchPluginPackage,
  initialState,
  manifest
});
//# sourceMappingURL=index.cjs.map