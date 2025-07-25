import { M as v, U as I, T as m } from "./tiling-plugin-CEXbViPQ.js";
const b = "tiling", S = {
  id: b,
  name: "Tiling Plugin",
  version: "1.0.0",
  provides: ["tiling"],
  requires: ["render", "scroll", "viewport"],
  optional: [],
  defaultConfig: {
    enabled: !0,
    tileSize: 768,
    overlapPx: 2.5,
    extraRings: 0
  }
}, k = {
  visibleTiles: {}
}, y = (i, t) => {
  var T, u;
  switch (t.type) {
    case I: {
      const d = t.payload, o = { ...i.visibleTiles };
      for (const g in d) {
        const n = Number(g), a = d[n], p = o[n] ?? [], f = (T = p.find((c) => !c.isFallback)) == null ? void 0 : T.srcScale, l = a[0].srcScale;
        if (f !== void 0 && f !== l) {
          const c = p.filter((s) => !s.isFallback && s.status === "ready").map((s) => ({ ...s, isFallback: !0 })), r = c.length > 0 ? [] : p.filter((s) => s.isFallback);
          o[n] = [...r, ...c, ...a];
        } else {
          const c = new Set(a.map((e) => e.id)), r = [], s = /* @__PURE__ */ new Set();
          for (const e of p)
            (e.isFallback || c.has(e.id)) && (r.push(e), s.add(e.id));
          for (const e of a)
            s.has(e.id) || r.push(e);
          o[n] = r;
        }
      }
      return { ...i, visibleTiles: o };
    }
    case v: {
      const { pageIndex: d, tileId: o, status: g } = t.payload, n = ((u = i.visibleTiles[d]) == null ? void 0 : u.map(
        (l) => l.id === o ? { ...l, status: g } : l
      )) ?? [], a = n.filter((l) => !l.isFallback), f = a.every((l) => l.status === "ready") ? a : n;
      return {
        ...i,
        visibleTiles: { ...i.visibleTiles, [d]: f }
      };
    }
    default:
      return i;
  }
}, P = {
  manifest: S,
  create: (i, t, T) => new m(b, i, T),
  reducer: (i, t) => y(i, t),
  initialState: k
};
export {
  b as TILING_PLUGIN_ID,
  m as TilingPlugin,
  P as TilingPluginPackage,
  S as manifest
};
//# sourceMappingURL=index.js.map
