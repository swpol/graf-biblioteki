import { R as n, S as l, a as i, C as o, E as u, b as E, c as g, d as S, e as d } from "./selection-plugin-Bns-tQIi.js";
import { j as I, g as _, m as R, h as L, i as N, f as O, r as v, k as A, s as P } from "./selection-plugin-Bns-tQIi.js";
const t = "selection", p = {
  id: t,
  name: "Selection Plugin",
  version: "1.0.0",
  provides: ["selection"],
  requires: ["interaction-manager"],
  optional: [],
  defaultConfig: {
    enabled: !0
  }
}, r = {
  geometry: {},
  rects: {},
  slices: {},
  selection: null,
  active: !1,
  selecting: !1
}, T = (e = r, s) => {
  switch (s.type) {
    case S: {
      const { page: c, geo: a } = s.payload;
      return { ...e, geometry: { ...e.geometry, [c]: a } };
    }
    case g:
      return { ...e, selection: s.payload, active: !0 };
    case E:
      return { ...e, selecting: !0, selection: null, rects: {} };
    case u:
      return { ...e, selecting: !1 };
    case o:
      return { ...e, selecting: !1, selection: null, rects: {}, active: !1 };
    case i:
      return { ...e, rects: s.payload };
    case l:
      return { ...e, slices: s.payload };
    case n:
      return r;
    default:
      return e;
  }
}, m = {
  manifest: p,
  create: (e, s) => new d(t, e, s),
  reducer: T,
  initialState: r
};
export {
  t as SELECTION_PLUGIN_ID,
  d as SelectionPlugin,
  m as SelectionPluginPackage,
  I as getVerticalOverlap,
  _ as glyphAt,
  p as manifest,
  R as mergeAdjacentRects,
  L as rectIntersect,
  N as rectIsEmpty,
  O as rectUnion,
  v as rectsWithinSlice,
  A as shouldMergeHorizontalRects,
  P as sliceBounds
};
//# sourceMappingURL=index.js.map
