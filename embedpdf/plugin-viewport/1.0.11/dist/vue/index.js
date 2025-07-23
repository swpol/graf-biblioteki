import { ref as c, onMounted as a, onUnmounted as g, defineComponent as h, useAttrs as v, watch as w, createElementBlock as m, openBlock as R, mergeProps as P, unref as V, renderSlot as _ } from "vue";
import { useCapability as b, usePlugin as L } from "@embedpdf/core/vue";
import { ViewportPlugin as p } from "@embedpdf/plugin-viewport";
const y = () => L(p.id), B = () => b(p.id);
function H() {
  const { plugin: l } = y(), i = c(null);
  return a(() => {
    const t = l.value, e = i.value;
    if (!e || !t) return;
    const n = () => {
      const r = e.getBoundingClientRect();
      return {
        origin: { x: r.left, y: r.top },
        size: { width: r.width, height: r.height }
      };
    };
    t.registerBoundingRectProvider(n);
    const o = () => {
      t.setViewportScrollMetrics({
        scrollTop: e.scrollTop,
        scrollLeft: e.scrollLeft
      });
    };
    e.addEventListener("scroll", o);
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
    const u = t.onScrollRequest(
      ({ x: r, y: d, behavior: f = "auto" }) => {
        requestAnimationFrame(() => {
          e.scrollTo({ left: r, top: d, behavior: f });
        });
      }
    );
    g(() => {
      t.registerBoundingRectProvider(null), e.removeEventListener("scroll", o), s.disconnect(), u();
    });
  }), i;
}
const z = /* @__PURE__ */ h({
  __name: "viewport",
  setup(l) {
    const i = v(), { provides: t } = B(), e = c(0);
    w(
      t,
      (o) => {
        o && (e.value = o.getViewportGap());
      },
      { immediate: !0 }
    );
    const n = H();
    return (o, s) => (R(), m("div", P({
      ref_key: "viewportRef",
      ref: n
    }, V(i), {
      style: { padding: `${e.value}px` }
    }), [
      _(o.$slots, "default")
    ], 16));
  }
});
export {
  z as Viewport,
  B as useViewportCapability,
  y as useViewportPlugin,
  H as useViewportRef
};
//# sourceMappingURL=index.js.map
