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
import { BasePlugin, createBehaviorEmitter, createEmitter } from "@embedpdf/core";

// src/lib/actions.ts
var SET_FULLSCREEN = "SET_FULLSCREEN";
function setFullscreen(payload) {
  return { type: SET_FULLSCREEN, payload };
}

// src/lib/fullscreen-plugin.ts
var FullscreenPlugin = class extends BasePlugin {
  constructor(id, registry) {
    super(id, registry);
    this.onStateChange$ = createBehaviorEmitter();
    this.fullscreenRequest$ = createEmitter();
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
export {
  FULLSCREEN_PLUGIN_ID,
  FullscreenPlugin,
  FullscreenPluginPackage,
  SET_FULLSCREEN,
  initialState,
  manifest,
  setFullscreen
};
//# sourceMappingURL=index.js.map