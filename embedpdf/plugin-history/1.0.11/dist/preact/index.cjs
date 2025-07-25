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

// src/preact/index.ts
var preact_exports = {};
__export(preact_exports, {
  useHistoryCapability: () => useHistoryCapability,
  useHistoryPlugin: () => useHistoryPlugin
});
module.exports = __toCommonJS(preact_exports);

// ../core/dist/preact/index.js
var import_preact2 = require("preact");

// ../core/dist/jsxRuntime.module-Bzuv3cXw.js
var import_preact = require("preact");

// ../core/dist/preact/index.js
var import_hooks = require("preact/hooks");

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
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P.map((i2) => ({
  value: i2.id,
  label: i2.label
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
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);

// ../core/dist/preact/index.js
var P2 = (0, import_preact2.createContext)({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function g() {
  const t2 = (0, import_hooks.useContext)(P2);
  if (t2 === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t2;
  if (e)
    return t2;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t2;
}
function h(t2) {
  const { registry: r } = g();
  if (r === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(t2);
  if (!e)
    throw new Error(`Plugin ${t2} not found`);
  return {
    plugin: e,
    isLoading: false,
    ready: e.ready()
  };
}
function L2(t2) {
  const { plugin: r, isLoading: e, ready: i2 } = h(t2);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: i2
    };
  if (!r.provides)
    throw new Error(`Plugin ${t2} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: i2
  };
}

// dist/index.js
var z2 = "\xAD";
var M2 = "\u200B";
var L3 = "\u2060";
var $2 = "\uFEFF";
var F2 = "\uFFFE";
var N2 = "\uFFFF";
var k2 = Object.freeze([
  z2,
  M2,
  L3,
  $2,
  F2,
  N2
]);
new RegExp(`[${k2.join("")}]`, "g");
var P3 = Object.freeze([
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
P3.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P3.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P3.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _2 = Object.freeze({
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
  _2
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);
var w2 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s, c) => {
      this.onStoreUpdated(c, s);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s, c) => {
      this.onCoreStoreUpdated(c, s);
    }), this.readyPromise = new Promise((i2) => {
      this.readyResolve = i2;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
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
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, e = 100) {
    const i2 = Date.now(), s = this.debouncedActions[t2.type] || 0;
    return i2 - s >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, e) {
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
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
function E2() {
  const o = /* @__PURE__ */ new Set();
  return {
    emit: (e = void 0) => o.forEach((i2) => i2(e)),
    on: (e) => (o.add(e), () => o.delete(e)),
    off: (e) => o.delete(e),
    clear: () => o.clear()
  };
}
var SET_HISTORY_STATE = "HISTORY/SET_STATE";
var setHistoryState = (state) => ({
  type: SET_HISTORY_STATE,
  payload: state
});
var HistoryPlugin = class extends w2 {
  constructor(id, registry) {
    super(id, registry);
    this.topicHistories = /* @__PURE__ */ new Map();
    this.globalTimeline = [];
    this.globalIndex = -1;
    this.historyChange$ = E2();
  }
  async initialize(_22) {
  }
  getHistoryState() {
    const topics = {};
    Array.from(this.topicHistories.entries()).forEach(([topic, history]) => {
      topics[topic] = {
        canUndo: history.currentIndex > -1,
        canRedo: history.currentIndex < history.commands.length - 1
      };
    });
    return {
      global: {
        canUndo: this.globalIndex > -1,
        canRedo: this.globalIndex < this.globalTimeline.length - 1
      },
      topics
    };
  }
  // The emit function now accepts the topic to broadcast.
  emitHistoryChange(topic) {
    this.dispatch(setHistoryState(this.getHistoryState()));
    this.historyChange$.emit(topic);
  }
  buildCapability() {
    return {
      getHistoryState: () => this.state,
      onHistoryChange: this.historyChange$.on,
      register: (command, topic) => {
        if (!this.topicHistories.has(topic)) {
          this.topicHistories.set(topic, { commands: [], currentIndex: -1 });
        }
        const topicHistory = this.topicHistories.get(topic);
        topicHistory.commands.splice(topicHistory.currentIndex + 1);
        topicHistory.commands.push(command);
        topicHistory.currentIndex++;
        const historyEntry = { command, topic };
        this.globalTimeline.splice(this.globalIndex + 1);
        this.globalTimeline.push(historyEntry);
        this.globalIndex++;
        command.execute();
        this.emitHistoryChange(topic);
      },
      undo: (topic) => {
        let affectedTopic;
        if (topic) {
          const topicHistory = this.topicHistories.get(topic);
          if (topicHistory && topicHistory.currentIndex > -1) {
            topicHistory.commands[topicHistory.currentIndex].undo();
            topicHistory.currentIndex--;
            affectedTopic = topic;
          }
        } else {
          if (this.globalIndex > -1) {
            const entry = this.globalTimeline[this.globalIndex];
            entry.command.undo();
            this.topicHistories.get(entry.topic).currentIndex--;
            this.globalIndex--;
            affectedTopic = entry.topic;
          }
        }
        if (affectedTopic) this.emitHistoryChange(affectedTopic);
      },
      redo: (topic) => {
        let affectedTopic;
        if (topic) {
          const topicHistory = this.topicHistories.get(topic);
          if (topicHistory && topicHistory.currentIndex < topicHistory.commands.length - 1) {
            topicHistory.currentIndex++;
            topicHistory.commands[topicHistory.currentIndex].execute();
            affectedTopic = topic;
          }
        } else {
          if (this.globalIndex < this.globalTimeline.length - 1) {
            this.globalIndex++;
            const entry = this.globalTimeline[this.globalIndex];
            entry.command.execute();
            this.topicHistories.get(entry.topic).currentIndex++;
            affectedTopic = entry.topic;
          }
        }
        if (affectedTopic) this.emitHistoryChange(affectedTopic);
      },
      canUndo: (topic) => {
        if (topic) {
          const history = this.topicHistories.get(topic);
          return !!history && history.currentIndex > -1;
        }
        return this.globalIndex > -1;
      },
      canRedo: (topic) => {
        if (topic) {
          const history = this.topicHistories.get(topic);
          return !!history && history.currentIndex < history.commands.length - 1;
        }
        return this.globalIndex < this.globalTimeline.length - 1;
      }
    };
  }
};
HistoryPlugin.id = "history";

// src/preact/hooks/use-history.ts
var useHistoryPlugin = () => h(HistoryPlugin.id);
var useHistoryCapability = () => L2(HistoryPlugin.id);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useHistoryCapability,
  useHistoryPlugin
});
//# sourceMappingURL=index.cjs.map