import { computed as w, shallowRef as h, ref as u, onMounted as d, watch as p, inject as m, onUnmounted as R, defineComponent as P, useAttrs as y, createElementBlock as b, openBlock as L, mergeProps as V, unref as _, renderSlot as E } from "vue";
import { V as a } from "../viewport-plugin-CewlD1yp.js";
const S = Symbol("pdfKey");
function z() {
  const r = m(S);
  if (!r) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return r;
}
function f(r) {
  const { registry: o } = z(), t = h(null), e = u(!0), n = u(new Promise(() => {
  })), i = () => {
    var s;
    if (!o.value) return;
    const l = o.value.getPlugin(r);
    if (!l) throw new Error(`Plugin ${r} not found`);
    t.value = l, e.value = !1, n.value = ((s = l.ready) == null ? void 0 : s.call(l)) ?? Promise.resolve();
  };
  return d(i), p(o, i), { plugin: t, isLoading: e, ready: n };
}
function B(r) {
  const { plugin: o, isLoading: t, ready: e } = f(r);
  return { provides: w(() => {
    if (!o.value) return null;
    if (!o.value.provides)
      throw new Error(`Plugin ${r} does not implement provides()`);
    return o.value.provides();
  }), isLoading: t, ready: e };
}
const H = () => f(a.id), T = () => B(a.id);
function W() {
  const { plugin: r } = H(), o = u(null);
  return d(() => {
    const t = r.value, e = o.value;
    if (!e || !t) return;
    const n = () => {
      const c = e.getBoundingClientRect();
      return {
        origin: { x: c.left, y: c.top },
        size: { width: c.width, height: c.height }
      };
    };
    t.registerBoundingRectProvider(n);
    const i = () => {
      t.setViewportScrollMetrics({
        scrollTop: e.scrollTop,
        scrollLeft: e.scrollLeft
      });
    };
    e.addEventListener("scroll", i);
    const s = new ResizeObserver(() => {
      t.setViewportResizeMetrics({
        width: e.offsetWidth,
        height: e.offsetHeight,
        clientWidth: e.clientWidth,
        clientHeight: e.clientHeight,
        scrollTop: e.scrollTop,
        scrollLeft: e.scrollLeft,
        scrollWidth: e.scrollWidth,
        scrollHeight: e.scrollHeight
      });
    });
    s.observe(e);
    const l = t.onScrollRequest(
      ({ x: c, y: v, behavior: g = "auto" }) => {
        requestAnimationFrame(() => {
          e.scrollTo({ left: c, top: v, behavior: g });
        });
      }
    );
    R(() => {
      t.registerBoundingRectProvider(null), e.removeEventListener("scroll", i), s.disconnect(), l();
    });
  }), o;
}
const q = /* @__PURE__ */ P({
  __name: "viewport",
  setup(r) {
    const o = y(), { provides: t } = T(), e = u(0);
    p(
      t,
      (i) => {
        i && (e.value = i.getViewportGap());
      },
      { immediate: !0 }
    );
    const n = W();
    return (i, s) => (L(), b("div", V({
      ref_key: "viewportRef",
      ref: n
    }, _(o), {
      style: { padding: `${e.value}px` }
    }), [
      E(i.$slots, "default")
    ], 16));
  }
});
export {
  q as Viewport,
  T as useViewportCapability,
  H as useViewportPlugin,
  W as useViewportRef
};
//# sourceMappingURL=index.js.map
