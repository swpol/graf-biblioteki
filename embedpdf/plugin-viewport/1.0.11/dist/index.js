import { S as t, a as p, b as s, c as a, V as d } from "./viewport-plugin-CewlD1yp.js";
const r = "viewport", c = {
  id: r,
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
}, o = {
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
}, h = (e = o, l) => {
  switch (l.type) {
    case a:
      return { ...e, viewportGap: l.payload };
    case s:
      return {
        ...e,
        viewportMetrics: {
          width: l.payload.width,
          height: l.payload.height,
          scrollTop: l.payload.scrollTop,
          scrollLeft: l.payload.scrollLeft,
          clientWidth: l.payload.clientWidth,
          clientHeight: l.payload.clientHeight,
          scrollWidth: l.payload.scrollWidth,
          scrollHeight: l.payload.scrollHeight,
          relativePosition: {
            x: l.payload.scrollWidth <= l.payload.clientWidth ? 0 : l.payload.scrollLeft / (l.payload.scrollWidth - l.payload.clientWidth),
            y: l.payload.scrollHeight <= l.payload.clientHeight ? 0 : l.payload.scrollTop / (l.payload.scrollHeight - l.payload.clientHeight)
          }
        }
      };
    case p:
      return {
        ...e,
        viewportMetrics: {
          ...e.viewportMetrics,
          scrollTop: l.payload.scrollTop,
          scrollLeft: l.payload.scrollLeft
        },
        isScrolling: !0
      };
    case t:
      return { ...e, isScrolling: l.payload };
    default:
      return e;
  }
}, g = {
  manifest: c,
  create: (e, l, i) => new d(r, e, i),
  reducer: h,
  initialState: o
};
export {
  r as VIEWPORT_PLUGIN_ID,
  d as ViewportPlugin,
  g as ViewportPluginPackage,
  c as manifest
};
//# sourceMappingURL=index.js.map
