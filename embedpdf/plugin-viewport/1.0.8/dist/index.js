// src/lib/manifest.ts
var VIEWPORT_PLUGIN_ID = "viewport";
var manifest = {
  id: VIEWPORT_PLUGIN_ID,
  name: "Viewport Plugin",
  version: "1.0.0",
  provides: ["viewport"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: true,
    viewportGap: 10,
    scrollEndDelay: 300
  }
};

// src/lib/actions.ts
var SET_VIEWPORT_METRICS = "SET_VIEWPORT_METRICS";
var SET_VIEWPORT_SCROLL_METRICS = "SET_VIEWPORT_SCROLL_METRICS";
var SET_VIEWPORT_GAP = "SET_VIEWPORT_GAP";
var SET_SCROLL_ACTIVITY = "SET_SCROLL_ACTIVITY";
function setViewportGap(viewportGap) {
  return {
    type: SET_VIEWPORT_GAP,
    payload: viewportGap
  };
}
function setViewportMetrics(viewportMetrics) {
  return {
    type: SET_VIEWPORT_METRICS,
    payload: viewportMetrics
  };
}
function setViewportScrollMetrics(scrollMetrics) {
  return {
    type: SET_VIEWPORT_SCROLL_METRICS,
    payload: scrollMetrics
  };
}
function setScrollActivity(isScrolling) {
  return { type: SET_SCROLL_ACTIVITY, payload: isScrolling };
}

// src/lib/reducer.ts
var initialState = {
  viewportGap: 0,
  viewportMetrics: {
    width: 0,
    height: 0,
    scrollTop: 0,
    scrollLeft: 0,
    clientWidth: 0,
    clientHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    relativePosition: {
      x: 0,
      y: 0
    }
  },
  isScrolling: false
};
var viewportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWPORT_GAP:
      return { ...state, viewportGap: action.payload };
    case SET_VIEWPORT_METRICS:
      return {
        ...state,
        viewportMetrics: {
          width: action.payload.width,
          height: action.payload.height,
          scrollTop: action.payload.scrollTop,
          scrollLeft: action.payload.scrollLeft,
          clientWidth: action.payload.clientWidth,
          clientHeight: action.payload.clientHeight,
          scrollWidth: action.payload.scrollWidth,
          scrollHeight: action.payload.scrollHeight,
          relativePosition: {
            x: action.payload.scrollWidth <= action.payload.clientWidth ? 0 : action.payload.scrollLeft / (action.payload.scrollWidth - action.payload.clientWidth),
            y: action.payload.scrollHeight <= action.payload.clientHeight ? 0 : action.payload.scrollTop / (action.payload.scrollHeight - action.payload.clientHeight)
          }
        }
      };
    case SET_VIEWPORT_SCROLL_METRICS:
      return {
        ...state,
        viewportMetrics: {
          ...state.viewportMetrics,
          scrollTop: action.payload.scrollTop,
          scrollLeft: action.payload.scrollLeft
        },
        isScrolling: true
      };
    case SET_SCROLL_ACTIVITY:
      return { ...state, isScrolling: action.payload };
    default:
      return state;
  }
};

// src/lib/viewport-plugin.ts
import {
  BasePlugin,
  createEmitter,
  createBehaviorEmitter
} from "@embedpdf/core";
var ViewportPlugin = class extends BasePlugin {
  constructor(id, registry, config) {
    super(id, registry);
    this.id = id;
    this.viewportResize$ = createBehaviorEmitter();
    this.viewportMetrics$ = createBehaviorEmitter();
    this.scrollMetrics$ = createBehaviorEmitter();
    this.scrollReq$ = createEmitter();
    this.scrollActivity$ = createBehaviorEmitter();
    /* ------------------------------------------------------------------ */
    /* “live rect” infrastructure                                          */
    /* ------------------------------------------------------------------ */
    this.rectProvider = null;
    if (config.viewportGap) {
      this.dispatch(setViewportGap(config.viewportGap));
    }
    this.scrollEndDelay = config.scrollEndDelay || 300;
  }
  buildCapability() {
    return {
      getViewportGap: () => this.state.viewportGap,
      getMetrics: () => this.state.viewportMetrics,
      getBoundingRect: () => this.rectProvider?.() ?? {
        origin: { x: 0, y: 0 },
        size: { width: 0, height: 0 }
      },
      scrollTo: (pos) => this.scrollTo(pos),
      isScrolling: () => this.state.isScrolling,
      onScrollChange: this.scrollMetrics$.on,
      onViewportChange: this.viewportMetrics$.on,
      onViewportResize: this.viewportResize$.on,
      onScrollActivity: this.scrollActivity$.on
    };
  }
  setViewportResizeMetrics(viewportMetrics) {
    this.dispatch(setViewportMetrics(viewportMetrics));
    this.viewportResize$.emit(this.state.viewportMetrics);
  }
  setViewportScrollMetrics(scrollMetrics) {
    if (scrollMetrics.scrollTop !== this.state.viewportMetrics.scrollTop || scrollMetrics.scrollLeft !== this.state.viewportMetrics.scrollLeft) {
      this.dispatch(setViewportScrollMetrics(scrollMetrics));
      this.bumpScrollActivity();
      this.scrollMetrics$.emit({
        scrollTop: scrollMetrics.scrollTop,
        scrollLeft: scrollMetrics.scrollLeft
      });
    }
  }
  onScrollRequest(listener) {
    return this.scrollReq$.on(listener);
  }
  registerBoundingRectProvider(provider) {
    this.rectProvider = provider;
  }
  bumpScrollActivity() {
    this.debouncedDispatch(setScrollActivity(false), this.scrollEndDelay);
  }
  scrollTo(pos) {
    const { x, y, center, behavior = "auto" } = pos;
    if (center) {
      const metrics = this.state.viewportMetrics;
      const centeredX = x - metrics.clientWidth / 2;
      const centeredY = y - metrics.clientHeight / 2;
      this.scrollReq$.emit({
        x: centeredX,
        y: centeredY,
        behavior
      });
    } else {
      this.scrollReq$.emit({
        x,
        y,
        behavior
      });
    }
  }
  // Subscribe to store changes to notify onViewportChange
  onStoreUpdated(prevState, newState) {
    if (prevState !== newState) {
      this.viewportMetrics$.emit(newState.viewportMetrics);
      if (prevState.isScrolling !== newState.isScrolling) {
        this.scrollActivity$.emit(newState.isScrolling);
      }
    }
  }
  async initialize(_config) {
  }
  async destroy() {
    super.destroy();
    this.viewportMetrics$.clear();
    this.viewportResize$.clear();
    this.scrollMetrics$.clear();
    this.scrollReq$.clear();
    this.scrollActivity$.clear();
    this.rectProvider = null;
    if (this.scrollEndTimer) clearTimeout(this.scrollEndTimer);
  }
};
ViewportPlugin.id = "viewport";

// src/lib/index.ts
var ViewportPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new ViewportPlugin(VIEWPORT_PLUGIN_ID, registry, config),
  reducer: viewportReducer,
  initialState
};
export {
  VIEWPORT_PLUGIN_ID,
  ViewportPlugin,
  ViewportPluginPackage,
  manifest
};
//# sourceMappingURL=index.js.map