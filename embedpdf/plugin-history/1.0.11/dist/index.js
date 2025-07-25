// src/lib/manifest.ts
var HISTORY_PLUGIN_ID = "history";
var manifest = {
  id: HISTORY_PLUGIN_ID,
  name: "History Plugin",
  version: "1.0.0",
  provides: ["history"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

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

// src/lib/actions.ts
var SET_HISTORY_STATE = "HISTORY/SET_STATE";
var setHistoryState = (state) => ({
  type: SET_HISTORY_STATE,
  payload: state
});

// src/lib/history-plugin.ts
var HistoryPlugin = class extends w2 {
  constructor(id, registry) {
    super(id, registry);
    this.topicHistories = /* @__PURE__ */ new Map();
    this.globalTimeline = [];
    this.globalIndex = -1;
    // This emitter will now broadcast the topic string of the affected history.
    this.historyChange$ = E2();
  }
  async initialize(_2) {
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

// src/lib/reducer.ts
var initialState = {
  global: {
    canUndo: false,
    canRedo: false
  },
  topics: {}
};
var reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

// src/lib/index.ts
var HistoryPluginPackage = {
  manifest,
  create: (registry, _engine) => new HistoryPlugin(HISTORY_PLUGIN_ID, registry),
  reducer,
  initialState
};
export {
  HISTORY_PLUGIN_ID,
  HistoryPlugin,
  HistoryPluginPackage,
  manifest
};
//# sourceMappingURL=index.js.map