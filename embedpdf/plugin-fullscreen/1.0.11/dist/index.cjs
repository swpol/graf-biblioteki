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
  FULLSCREEN_PLUGIN_ID: () => FULLSCREEN_PLUGIN_ID,
  FullscreenPlugin: () => FullscreenPlugin,
  FullscreenPluginPackage: () => FullscreenPluginPackage,
  SET_FULLSCREEN: () => SET_FULLSCREEN,
  initialState: () => initialState,
  manifest: () => manifest,
  setFullscreen: () => setFullscreen
});
module.exports = __toCommonJS(index_exports);

// src/lib/manifest.ts
var FULLSCREEN_PLUGIN_ID = "fullscreen";
var manifest = {
  id: FULLSCREEN_PLUGIN_ID,
  name: "Fullscreen Plugin",
  version: "1.0.0",
  provides: ["fullscreen"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

// src/lib/fullscreen-plugin.ts
var import_core = require("@embedpdf/core");

// src/lib/actions.ts
var SET_FULLSCREEN = "SET_FULLSCREEN";
function setFullscreen(payload) {
  return { type: SET_FULLSCREEN, payload };
}

// src/lib/fullscreen-plugin.ts
var FullscreenPlugin = class extends import_core.BasePlugin {
  constructor(id, registry) {
    super(id, registry);
    this.onStateChange$ = (0, import_core.createBehaviorEmitter)();
    this.fullscreenRequest$ = (0, import_core.createEmitter)();
  }
  async initialize(_) {
  }
  buildCapability() {
    return {
      isFullscreen: () => this.state.isFullscreen,
      enableFullscreen: () => this.enableFullscreen(),
      exitFullscreen: () => this.exitFullscreen(),
      toggleFullscreen: () => this.toggleFullscreen(),
      onRequest: this.fullscreenRequest$.on,
      onStateChange: this.onStateChange$.on
    };
  }
  toggleFullscreen() {
    if (this.state.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enableFullscreen();
    }
  }
  enableFullscreen() {
    this.fullscreenRequest$.emit("enter");
  }
  exitFullscreen() {
    this.fullscreenRequest$.emit("exit");
  }
  onStoreUpdated(_, newState) {
    this.onStateChange$.emit(newState);
  }
  setFullscreenState(isFullscreen) {
    this.dispatch(setFullscreen(isFullscreen));
  }
  async destroy() {
    this.fullscreenRequest$.clear();
    super.destroy();
  }
};
FullscreenPlugin.id = "fullscreen";

// src/lib/reducer.ts
var initialState = {
  isFullscreen: false
};
var reducer = (state, action) => {
  switch (action.type) {
    case SET_FULLSCREEN:
      return { ...state, isFullscreen: action.payload };
    default:
      return state;
  }
};

// src/lib/index.ts
var FullscreenPluginPackage = {
  manifest,
  create: (registry) => new FullscreenPlugin(FULLSCREEN_PLUGIN_ID, registry),
  reducer,
  initialState
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FULLSCREEN_PLUGIN_ID,
  FullscreenPlugin,
  FullscreenPluginPackage,
  SET_FULLSCREEN,
  initialState,
  manifest,
  setFullscreen
});
//# sourceMappingURL=index.cjs.map