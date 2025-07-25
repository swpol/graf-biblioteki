import { computed as S, shallowRef as L, ref as p, onMounted as x, watch as C, inject as D, watchEffect as w, defineComponent as _, useAttrs as $, createElementBlock as n, createCommentVNode as j, unref as m, openBlock as l, mergeProps as A, createElementVNode as B, normalizeStyle as u, Fragment as f, renderList as h, renderSlot as H, createBlock as N, resolveDynamicComponent as R } from "vue";
import { c as b, S as W } from "../scroll-plugin-DIl4FWp0.js";
const F = Symbol("pdfKey");
function P() {
  const r = D(F);
  if (!r) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return r;
}
function k(r) {
  const { registry: t } = P(), a = L(null), o = p(!0), c = p(new Promise(() => {
  })), s = () => {
    var e;
    if (!t.value) return;
    const d = t.value.getPlugin(r);
    if (!d) throw new Error(`Plugin ${r} not found`);
    a.value = d, o.value = !1, c.value = ((e = d.ready) == null ? void 0 : e.call(d)) ?? Promise.resolve();
  };
  return x(s), C(t, s), { plugin: a, isLoading: o, ready: c };
}
function G(r) {
  const { plugin: t, isLoading: a, ready: o } = k(r);
  return { provides: S(() => {
    if (!t.value) return null;
    if (!t.value.provides)
      throw new Error(`Plugin ${r} does not implement provides()`);
    return t.value.provides();
  }), isLoading: a, ready: o };
}
const V = () => k(b.id), z = () => G(b.id);
function M() {
  const { provides: r } = z(), t = p(1), a = p(1);
  return w((o) => {
    if (!r.value) return;
    const c = r.value.onPageChange(({ pageNumber: s, totalPages: e }) => {
      t.value = s, a.value = e;
    });
    o(c);
  }), {
    scroll: r,
    currentPage: t,
    totalPages: a
  };
}
const O = /* @__PURE__ */ _({
  __name: "scroller",
  props: {
    style: { type: [Boolean, null, String, Object, Array] },
    overlayElements: { default: () => [] }
  },
  setup(r) {
    const t = r, a = $(), { provides: o } = z(), { plugin: c } = V(), { registry: s } = P(), e = p(null);
    w((i) => {
      if (!o.value) return;
      e.value = o.value.getScrollerLayout();
      const v = o.value.onScrollerData((g) => e.value = g);
      i(v);
    }), x(() => {
      var i;
      (i = c.value) == null || i.setLayoutReady();
    });
    function d(i) {
      const v = s.value.getStore().getState().core;
      return {
        ...i,
        rotation: v.rotation,
        scale: v.scale,
        document: v.document
      };
    }
    const E = S(() => e.value ? [
      typeof t.style == "object" && !Array.isArray(t.style) ? { ...t.style } : t.style ?? {},
      {
        width: `${e.value.totalWidth}px`,
        height: `${e.value.totalHeight}px`,
        position: "relative",
        boxSizing: "border-box",
        margin: "0 auto",
        ...e.value.strategy === W.Horizontal && {
          display: "flex",
          flexDirection: "row"
        }
      }
    ] : t.style);
    return (i, v) => e.value && m(s) ? (l(), n("div", A({
      key: 0,
      style: E.value
    }, m(a)), [
      e.value.strategy === "horizontal" ? (l(), n("div", {
        key: 0,
        style: u({ width: e.value.startSpacing + "px", height: "100%", flexShrink: 0 })
      }, null, 4)) : (l(), n("div", {
        key: 1,
        style: u({ height: e.value.startSpacing + "px", width: "100%" })
      }, null, 4)),
      B("div", {
        style: u({
          gap: e.value.pageGap + "px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          flexDirection: e.value.strategy === "horizontal" ? "row" : "column",
          minHeight: e.value.strategy === "horizontal" ? "100%" : void 0,
          minWidth: e.value.strategy === "vertical" ? "fit-content" : void 0
        })
      }, [
        (l(!0), n(f, null, h(e.value.items, (g) => (l(), n("div", {
          key: g.pageNumbers[0],
          style: u({ display: "flex", justifyContent: "center", gap: e.value.pageGap + "px" })
        }, [
          (l(!0), n(f, null, h(g.pageLayouts, (y) => (l(), n("div", {
            key: y.pageNumber,
            style: u({ width: y.rotatedWidth + "px", height: y.rotatedHeight + "px" })
          }, [
            H(i.$slots, "default", {
              page: d(y)
            })
          ], 4))), 128))
        ], 4))), 128))
      ], 4),
      e.value.strategy === "horizontal" ? (l(), n("div", {
        key: 2,
        style: u({ width: e.value.endSpacing + "px", height: "100%", flexShrink: 0 })
      }, null, 4)) : (l(), n("div", {
        key: 3,
        style: u({ height: e.value.endSpacing + "px", width: "100%" })
      }, null, 4)),
      (l(!0), n(f, null, h(t.overlayElements, (g, y) => (l(), N(R(g), { key: y }))), 128))
    ], 16)) : j("", !0);
  }
});
export {
  O as Scroller,
  M as useScroll,
  z as useScrollCapability,
  V as useScrollPlugin
};
//# sourceMappingURL=index.js.map
