import { BasePlugin as g, createBehaviorEmitter as l, createEmitter as R } from "@embedpdf/core";
const h = "viewport", S = {
  id: h,
  name: "Viewport Plugin",
  version: "1.0.0",
  provides: ["viewport"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: !0,
    viewportGap: 10,
    scrollEndDelay: 300
  }
}, a = "SET_VIEWPORT_METRICS", d = "SET_VIEWPORT_SCROLL_METRICS", n = "SET_VIEWPORT_GAP", y = "SET_SCROLL_ACTIVITY";
function E(e) {
  return {
    type: n,
    payload: e
  };
}
function f(e) {
  return {
    type: a,
    payload: e
  };
}
function M(e) {
  return {
    type: d,
    payload: e
  };
}
function _(e) {
  return { type: y, payload: e };
}
const v = {
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
  isScrolling: !1
}, $ = (e = v, t) => {
  switch (t.type) {
    case n:
      return { ...e, viewportGap: t.payload };
    case a:
      return {
        ...e,
        viewportMetrics: {
          width: t.payload.width,
          height: t.payload.height,
          scrollTop: t.payload.scrollTop,
          scrollLeft: t.payload.scrollLeft,
          clientWidth: t.payload.clientWidth,
          clientHeight: t.payload.clientHeight,
          scrollWidth: t.payload.scrollWidth,
          scrollHeight: t.payload.scrollHeight,
          relativePosition: {
            x: t.payload.scrollWidth <= t.payload.clientWidth ? 0 : t.payload.scrollLeft / (t.payload.scrollWidth - t.payload.clientWidth),
            y: t.payload.scrollHeight <= t.payload.clientHeight ? 0 : t.payload.scrollTop / (t.payload.scrollHeight - t.payload.clientHeight)
          }
        }
      };
    case d:
      return {
        ...e,
        viewportMetrics: {
          ...e.viewportMetrics,
          scrollTop: t.payload.scrollTop,
          scrollLeft: t.payload.scrollLeft
        },
        isScrolling: !0
      };
    case y:
      return { ...e, isScrolling: t.payload };
    default:
      return e;
  }
}, o = class o extends g {
  constructor(t, i, r) {
    super(t, i), this.id = t, this.viewportResize$ = l(), this.viewportMetrics$ = l(), this.scrollMetrics$ = l(), this.scrollReq$ = R(), this.scrollActivity$ = l(), this.rectProvider = null, r.viewportGap && this.dispatch(E(r.viewportGap)), this.scrollEndDelay = r.scrollEndDelay || 300;
  }
  buildCapability() {
    return {
      getViewportGap: () => this.state.viewportGap,
      getMetrics: () => this.state.viewportMetrics,
      getBoundingRect: () => {
        var t;
        return ((t = this.rectProvider) == null ? void 0 : t.call(this)) ?? {
          origin: { x: 0, y: 0 },
          size: { width: 0, height: 0 }
        };
      },
      scrollTo: (t) => this.scrollTo(t),
      isScrolling: () => this.state.isScrolling,
      onScrollChange: this.scrollMetrics$.on,
      onViewportChange: this.viewportMetrics$.on,
      onViewportResize: this.viewportResize$.on,
      onScrollActivity: this.scrollActivity$.on
    };
  }
  setViewportResizeMetrics(t) {
    this.dispatch(f(t)), this.viewportResize$.emit(this.state.viewportMetrics);
  }
  setViewportScrollMetrics(t) {
    (t.scrollTop !== this.state.viewportMetrics.scrollTop || t.scrollLeft !== this.state.viewportMetrics.scrollLeft) && (this.dispatch(M(t)), this.bumpScrollActivity(), this.scrollMetrics$.emit({
      scrollTop: t.scrollTop,
      scrollLeft: t.scrollLeft
    }));
  }
  onScrollRequest(t) {
    return this.scrollReq$.on(t);
  }
  registerBoundingRectProvider(t) {
    this.rectProvider = t;
  }
  bumpScrollActivity() {
    this.debouncedDispatch(_(!1), this.scrollEndDelay);
  }
  scrollTo(t) {
    const { x: i, y: r, center: w, behavior: c = "auto" } = t;
    if (w) {
      const p = this.state.viewportMetrics, T = i - p.clientWidth / 2, u = r - p.clientHeight / 2;
      this.scrollReq$.emit({
        x: T,
        y: u,
        behavior: c
      });
    } else
      this.scrollReq$.emit({
        x: i,
        y: r,
        behavior: c
      });
  }
  // Subscribe to store changes to notify onViewportChange
  onStoreUpdated(t, i) {
    t !== i && (this.viewportMetrics$.emit(i.viewportMetrics), t.isScrolling !== i.isScrolling && this.scrollActivity$.emit(i.isScrolling));
  }
  async initialize(t) {
  }
  async destroy() {
    super.destroy(), this.viewportMetrics$.clear(), this.viewportResize$.clear(), this.scrollMetrics$.clear(), this.scrollReq$.clear(), this.scrollActivity$.clear(), this.rectProvider = null, this.scrollEndTimer && clearTimeout(this.scrollEndTimer);
  }
};
o.id = "viewport";
let s = o;
const P = {
  manifest: S,
  create: (e, t, i) => new s(h, e, i),
  reducer: $,
  initialState: v
};
export {
  h as VIEWPORT_PLUGIN_ID,
  s as ViewportPlugin,
  P as ViewportPluginPackage,
  S as manifest
};
//# sourceMappingURL=index.js.map
