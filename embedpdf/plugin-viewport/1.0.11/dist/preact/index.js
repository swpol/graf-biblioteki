import { usePlugin as f, useCapability as d } from "@embedpdf/core/preact";
import { ViewportPlugin as c } from "@embedpdf/plugin-viewport";
import { jsx as g } from "preact/jsx-runtime";
import { useRef as h, useLayoutEffect as w, useState as a, useEffect as v } from "preact/hooks";
const R = () => f(c.id), m = () => d(c.id);
function V() {
  const { plugin: t } = R(), i = h(null);
  return w(() => {
    if (!t) return;
    const e = i.current;
    if (!e) return;
    const l = () => {
      const o = e.getBoundingClientRect();
      return {
        origin: { x: o.left, y: o.top },
        size: { width: o.width, height: o.height }
      };
    };
    t.registerBoundingRectProvider(l);
    const s = () => {
      t.setViewportScrollMetrics({
        scrollTop: e.scrollTop,
        scrollLeft: e.scrollLeft
      });
    };
    e.addEventListener("scroll", s);
    const r = new ResizeObserver(() => {
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
    r.observe(e);
    const n = t.onScrollRequest(
      ({ x: o, y: p, behavior: u = "auto" }) => {
        requestAnimationFrame(() => {
          e.scrollTo({ left: o, top: p, behavior: u });
        });
      }
    );
    return () => {
      t.registerBoundingRectProvider(null), e.removeEventListener("scroll", s), r.disconnect(), n();
    };
  }, [t]), i;
}
function H({ children: t, ...i }) {
  const [e, l] = a(0), s = V(), { provides: r } = m();
  v(() => {
    r && l(r.getViewportGap());
  }, [r]);
  const { style: n, ...o } = i;
  return /* @__PURE__ */ g(
    "div",
    {
      ...o,
      ref: s,
      style: {
        ...typeof n == "object" ? n : {},
        padding: `${e}px`
      },
      children: t
    }
  );
}
export {
  H as Viewport,
  m as useViewportCapability,
  R as useViewportPlugin
};
//# sourceMappingURL=index.js.map
