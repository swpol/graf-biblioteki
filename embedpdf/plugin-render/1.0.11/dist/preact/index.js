import { createContext as m, Fragment as y } from "preact";
import { useContext as L, useState as P, useRef as R, useEffect as h } from "preact/hooks";
import { R as d, i as w, P as v } from "../render-plugin-ErV8zPxc.js";
import { u as l } from "../jsxRuntime.module-Bzuv3cXw.js";
const b = m({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function U() {
  const e = L(b);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: n } = e;
  if (n)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function c(e) {
  const { registry: r } = U();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const n = r.getPlugin(e);
  if (!n)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: n,
    isLoading: !1,
    ready: n.ready()
  };
}
function C(e) {
  const { plugin: r, isLoading: n, ready: t } = c(e);
  if (!r)
    return {
      provides: null,
      isLoading: n,
      ready: t
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: n,
    ready: t
  };
}
const O = () => c(d.id), E = () => C(d.id);
function D({
  pageIndex: e,
  scaleFactor: r = 1,
  dpr: n = 1,
  style: t,
  ...g
}) {
  const { provides: o } = E(), [s, f] = P(null), i = R(null);
  return h(() => {
    if (o) {
      const u = o.renderPage({ pageIndex: e, scaleFactor: r, dpr: n });
      return u.wait((p) => {
        const a = URL.createObjectURL(p);
        f(a), i.current = a;
      }, w), () => {
        i.current ? (URL.revokeObjectURL(i.current), i.current = null) : u.abort({
          code: v.Cancelled,
          message: "canceled render task"
        });
      };
    }
  }, [e, r, n, o]), /* @__PURE__ */ l(y, { children: s && /* @__PURE__ */ l(
    "img",
    {
      src: s,
      onLoad: () => {
        i.current && (URL.revokeObjectURL(i.current), i.current = null);
      },
      ...g,
      style: {
        width: "100%",
        height: "100%",
        ...t || {}
      }
    }
  ) });
}
export {
  D as RenderLayer,
  E as useRenderCapability,
  O as useRenderPlugin
};
//# sourceMappingURL=index.js.map
