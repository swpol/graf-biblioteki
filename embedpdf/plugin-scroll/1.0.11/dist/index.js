import { S as t, a as s, U as i, y as o, b as n, c } from "./scroll-plugin-DIl4FWp0.js";
const l = "scroll", g = {
  id: l,
  name: "Scroll Plugin",
  version: "1.0.0",
  provides: ["scroll"],
  requires: ["viewport"],
  optional: [],
  defaultConfig: {
    enabled: !0,
    pageGap: 10
  }
}, d = {
  currentPage: 1,
  visiblePages: [],
  pageVisibilityMetrics: [],
  renderedPageIndexes: [],
  scrollOffset: { x: 0, y: 0 },
  startSpacing: 0,
  endSpacing: 0
}, S = (e, a) => ({
  virtualItems: [],
  totalPages: e.pages.length,
  totalContentSize: { width: 0, height: 0 },
  desiredScrollPosition: { x: 0, y: 0 },
  strategy: a.strategy ?? t.Vertical,
  pageGap: a.pageGap ?? 10,
  scale: e.scale,
  ...d
}), p = (e, a) => {
  switch (a.type) {
    case n:
      return { ...e, totalPages: a.payload };
    case o:
      return { ...e, scale: a.payload };
    case i:
      return { ...e, ...a.payload };
    case s:
      return { ...e, desiredScrollPosition: a.payload };
    default:
      return e;
  }
}, P = {
  manifest: g,
  create: (e, a, r) => new c(l, e, r),
  reducer: p,
  initialState: (e, a) => S(e, a)
};
export {
  l as SCROLL_PLUGIN_ID,
  c as ScrollPlugin,
  P as ScrollPluginPackage,
  t as ScrollStrategy,
  g as manifest
};
//# sourceMappingURL=index.js.map
