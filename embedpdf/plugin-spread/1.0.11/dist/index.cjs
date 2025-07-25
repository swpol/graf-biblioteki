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
  SPREAD_PLUGIN_ID: () => SPREAD_PLUGIN_ID,
  SpreadMode: () => SpreadMode,
  SpreadPlugin: () => SpreadPlugin,
  SpreadPluginPackage: () => SpreadPluginPackage,
  manifest: () => manifest
});
module.exports = __toCommonJS(index_exports);

// ../core/dist/math-ChSRQF3r.js
var E = "SET_PAGES";
var Q = (i) => ({
  type: E,
  payload: i
});
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
function E2() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => o.forEach((i) => i(e)),
    on: (e) => (o.add(e), () => o.delete(e)),
    off: (e) => o.delete(e),
    clear: () => o.clear()
  };
}

// src/lib/types.ts
var SpreadMode = /* @__PURE__ */ ((SpreadMode2) => {
  SpreadMode2["None"] = "none";
  SpreadMode2["Odd"] = "odd";
  SpreadMode2["Even"] = "even";
  return SpreadMode2;
})(SpreadMode || {});

// src/lib/actions.ts
var SET_SPREAD_MODE = "SET_SPREAD_MODE";
function setSpreadMode(mode) {
  return {
    type: SET_SPREAD_MODE,
    payload: mode
  };
}

// src/lib/spread-plugin.ts
var SpreadPlugin = class extends w2 {
  constructor(id, registry, cfg) {
    super(id, registry);
    this.spreadEmitter$ = E2();
    this.resetReady();
    this.dispatch(setSpreadMode(cfg.defaultSpreadMode ?? "none" /* None */));
    const loaderPlugin = registry.getPlugin("loader");
    loaderPlugin.provides().onDocumentLoaded((document) => this.documentLoaded(document));
  }
  async initialize(config) {
    if (config.defaultSpreadMode) {
      this.dispatch(setSpreadMode(config.defaultSpreadMode));
    }
  }
  documentLoaded(document) {
    this.dispatchCoreAction(Q(this.getSpreadPagesObjects(document.pages)));
    this.markReady();
  }
  getSpreadPagesObjects(pages) {
    if (!pages.length) return [];
    switch (this.state.spreadMode) {
      case "none" /* None */:
        return pages.map((page) => [page]);
      case "odd" /* Odd */:
        return Array.from(
          { length: Math.ceil(pages.length / 2) },
          (_2, i) => pages.slice(i * 2, i * 2 + 2)
        );
      case "even" /* Even */:
        return [
          [pages[0]],
          ...Array.from(
            { length: Math.ceil((pages.length - 1) / 2) },
            (_2, i) => pages.slice(1 + i * 2, 1 + i * 2 + 2)
          )
        ];
      default:
        return pages.map((page) => [page]);
    }
  }
  setSpreadMode(mode) {
    const currentMode = this.state.spreadMode;
    const document = this.coreState.core.document;
    if (!document) {
      throw new Error("Document not loaded");
    }
    if (currentMode !== mode) {
      this.dispatch(setSpreadMode(mode));
      this.dispatchCoreAction(Q(this.getSpreadPagesObjects(document.pages)));
      this.notifySpreadChange(mode);
    }
  }
  notifySpreadChange(spreadMode) {
    this.spreadEmitter$.emit(spreadMode);
  }
  buildCapability() {
    return {
      onSpreadChange: this.spreadEmitter$.on,
      setSpreadMode: (mode) => this.setSpreadMode(mode),
      getSpreadMode: () => this.state.spreadMode,
      getSpreadPagesObjects: (pages) => this.getSpreadPagesObjects(pages)
    };
  }
  async destroy() {
    this.spreadEmitter$.clear();
  }
};
SpreadPlugin.id = "spread";

// src/lib/manifest.ts
var SPREAD_PLUGIN_ID = "spread";
var manifest = {
  id: SPREAD_PLUGIN_ID,
  name: "Spread Plugin",
  version: "1.0.0",
  provides: ["spread"],
  requires: ["loader"],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

// src/lib/reducer.ts
var initialState = {
  spreadMode: "none" /* None */
};
var spreadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPREAD_MODE:
      return {
        ...state,
        spreadMode: action.payload
      };
    default:
      return state;
  }
};

// src/lib/index.ts
var SpreadPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new SpreadPlugin(SPREAD_PLUGIN_ID, registry, config),
  reducer: spreadReducer,
  initialState
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SPREAD_PLUGIN_ID,
  SpreadMode,
  SpreadPlugin,
  SpreadPluginPackage,
  manifest
});
//# sourceMappingURL=index.cjs.map