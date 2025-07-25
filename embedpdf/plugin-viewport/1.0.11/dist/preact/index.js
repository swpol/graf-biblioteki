import { createContext as f } from "preact";
import { useContext as g, useRef as a, useLayoutEffect as w, useState as h, useEffect as v } from "preact/hooks";
import { V as c } from "../viewport-plugin-CewlD1yp.js";
import { u as y } from "../jsxRuntime.module-D89ud_rY.js";
const P = f({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function m() {
  const t = g(P);
  if (t === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t;
  if (e)
    return t;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t;
}
function u(t) {
  const { registry: r } = m();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(t);
  if (!e)
    throw new Error(`Plugin ${t} not found`);
  return {
    plugin: e,
    isLoading: !1,
    ready: e.ready()
  };
}
function L(t) {
  const { plugin: r, isLoading: e, ready: o } = u(t);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: o
    };
  if (!r.provides)
    throw new Error(`Plugin ${t} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: o
  };
}
const R = () => u(c.id), b = () => L(c.id);
function V() {
  const { plugin: t } = R(), r = a(null);
  return w(() => {
    if (!t) return;
    const e = r.current;
    if (!e) return;
    const o = () => {
      const i = e.getBoundingClientRect();
      return {
        origin: { x: i.left, y: i.top },
        size: { width: i.width, height: i.height }
      };
    };
    t.registerBoundingRectProvider(o);
    const s = () => {
      t.setViewportScrollMetrics({
        scrollTop: e.scrollTop,
        scrollLeft: e.scrollLeft
      });
    };
    e.addEventListener("scroll", s);
    const n = new ResizeObserver(() => {
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
    n.observe(e);
    const l = t.onScrollRequest(
      ({ x: i, y: p, behavior: d = "auto" }) => {
        requestAnimationFrame(() => {
          e.scrollTo({ left: i, top: p, behavior: d });
        });
      }
    );
    return () => {
      t.registerBoundingRectProvider(null), e.removeEventListener("scroll", s), n.disconnect(), l();
    };
  }, [t]), r;
}
function H({ children: t, ...r }) {
  const [e, o] = h(0), s = V(), { provides: n } = b();
  v(() => {
    n && o(n.getViewportGap());
  }, [n]);
  const { style: l, ...i } = r;
  return /* @__PURE__ */ y(
    "div",
    {
      ...i,
      ref: s,
      style: {
        ...typeof l == "object" ? l : {},
        padding: `${e}px`
      },
      children: t
    }
  );
}
export {
  H as Viewport,
  b as useViewportCapability,
  R as useViewportPlugin
};
//# sourceMappingURL=index.js.map
