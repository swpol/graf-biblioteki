import { computed as R, shallowRef as b, ref as d, onMounted as g, watch as P, inject as k, defineComponent as f, toRaw as L, onBeforeUnmount as m, createElementBlock as p, createCommentVNode as T, openBlock as c, normalizeStyle as x, mergeProps as I, Fragment as C, renderList as B, createBlock as E } from "vue";
import { T as y, i as S, P as U } from "../tiling-plugin-CEXbViPQ.js";
const _ = Symbol("pdfKey");
function j() {
  const l = k(_);
  if (!l) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return l;
}
function w(l) {
  const { registry: e } = j(), i = b(null), r = d(!0), n = d(new Promise(() => {
  })), t = () => {
    var s;
    if (!e.value) return;
    const o = e.value.getPlugin(l);
    if (!o) throw new Error(`Plugin ${l} not found`);
    i.value = o, r.value = !1, n.value = ((s = o.ready) == null ? void 0 : s.call(o)) ?? Promise.resolve();
  };
  return g(t), P(e, t), { plugin: i, isLoading: r, ready: n };
}
function z(l) {
  const { plugin: e, isLoading: i, ready: r } = w(l);
  return { provides: R(() => {
    if (!e.value) return null;
    if (!e.value.provides)
      throw new Error(`Plugin ${l} does not implement provides()`);
    return e.value.provides();
  }), isLoading: i, ready: r };
}
const D = () => w(y.id), h = () => z(y.id), O = ["src"], $ = /* @__PURE__ */ f({
  __name: "tile-img",
  props: {
    pageIndex: {},
    tile: {},
    scale: {},
    dpr: { default: () => window.devicePixelRatio },
    style: { type: [Boolean, null, String, Object, Array] }
  },
  setup(l) {
    const e = l, { provides: i } = h(), r = d();
    let n = null, t = null;
    function s() {
      n && (URL.revokeObjectURL(n), n = null);
    }
    function o() {
      t && !n && t.abort({
        code: U.Cancelled,
        message: "canceled tile render"
      });
    }
    g(() => {
      if (!i.value) return;
      const a = i.value.renderTile({
        pageIndex: e.pageIndex,
        tile: L(e.tile),
        dpr: e.dpr
      });
      t = a, a.wait((v) => {
        n = URL.createObjectURL(v), r.value = n, t = null;
      }, S);
    }), m(() => {
      o(), s();
    });
    const u = e.scale / e.tile.srcScale;
    return (a, v) => r.value ? (c(), p("img", {
      key: 0,
      src: r.value,
      style: x([
        {
          position: "absolute",
          left: a.tile.screenRect.origin.x * u + "px",
          top: a.tile.screenRect.origin.y * u + "px",
          width: a.tile.screenRect.size.width * u + "px",
          height: a.tile.screenRect.size.height * u + "px",
          display: "block"
        },
        e.style
      ]),
      onLoad: s
    }, null, 44, O)) : T("", !0);
  }
}), K = /* @__PURE__ */ f({
  __name: "tiling-layer",
  props: {
    pageIndex: {},
    scale: {},
    style: { type: [Boolean, null, String, Object, Array] }
  },
  setup(l) {
    const e = l, i = d([]), { provides: r } = h();
    let n;
    return g(() => {
      r.value && (n = r.value.onTileRendering((t) => {
        i.value = t[e.pageIndex] ?? [];
      }));
    }), m(() => {
      n == null || n();
    }), (t, s) => (c(), p("div", I({ style: t.style }, t.$attrs), [
      (c(!0), p(C, null, B(i.value, (o) => (c(), E($, {
        key: o.id,
        pageIndex: t.pageIndex,
        tile: o,
        scale: t.scale
      }, null, 8, ["pageIndex", "tile", "scale"]))), 128))
    ], 16));
  }
});
export {
  $ as TileImg,
  K as TilingLayer,
  h as useTilingCapability,
  D as useTilingPlugin
};
//# sourceMappingURL=index.js.map
