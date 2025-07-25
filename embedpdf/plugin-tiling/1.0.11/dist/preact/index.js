import { createContext as L } from "preact";
import { useContext as R, useState as g, useRef as h, useEffect as f } from "preact/hooks";
import { T as p, i as P, P as b } from "../tiling-plugin-CEXbViPQ.js";
import { u as c } from "../jsxRuntime.module-Bzuv3cXw.js";
const T = L({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function C() {
  const r = R(T);
  if (r === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: e, isInitializing: n } = r;
  if (n)
    return r;
  if (e === null)
    throw new Error("PDF registry failed to initialize properly");
  return r;
}
function y(r) {
  const { registry: e } = C();
  if (e === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const n = e.getPlugin(r);
  if (!n)
    throw new Error(`Plugin ${r} not found`);
  return {
    plugin: n,
    isLoading: !1,
    ready: n.ready()
  };
}
function U(r) {
  const { plugin: e, isLoading: n, ready: t } = y(r);
  if (!e)
    return {
      provides: null,
      isLoading: n,
      ready: t
    };
  if (!e.provides)
    throw new Error(`Plugin ${r} does not provide a capability`);
  return {
    provides: e.provides(),
    isLoading: n,
    ready: t
  };
}
const O = () => y(p.id), m = () => U(p.id);
function E({ pageIndex: r, tile: e, dpr: n, scale: t }) {
  const { provides: o } = m(), [s, l] = g(), i = h(null), u = t / e.srcScale;
  f(() => {
    if (e.status === "ready" && i.current || !o) return;
    const a = o.renderTile({ pageIndex: r, tile: e, dpr: n });
    return a.wait((w) => {
      const d = URL.createObjectURL(w);
      i.current = d, l(d);
    }, P), () => {
      i.current ? (URL.revokeObjectURL(i.current), i.current = null) : a.abort({
        code: b.Cancelled,
        message: "canceled render task"
      });
    };
  }, [r, e.id]);
  const v = () => {
    i.current && (URL.revokeObjectURL(i.current), i.current = null);
  };
  return s ? /* @__PURE__ */ c(
    "img",
    {
      src: s,
      onLoad: v,
      style: {
        position: "absolute",
        left: e.screenRect.origin.x * u,
        top: e.screenRect.origin.y * u,
        width: e.screenRect.size.width * u,
        height: e.screenRect.size.height * u,
        display: "block"
      }
    }
  ) : null;
}
function S({ pageIndex: r, scale: e, style: n, ...t }) {
  const { provides: o } = m(), [s, l] = g([]);
  return f(() => {
    if (o)
      return o.onTileRendering((i) => l(i[r]));
  }, [o]), /* @__PURE__ */ c(
    "div",
    {
      style: {
        ...n
      },
      ...t,
      children: s == null ? void 0 : s.map((i) => /* @__PURE__ */ c(
        E,
        {
          pageIndex: r,
          tile: i,
          dpr: window.devicePixelRatio,
          scale: e
        },
        i.id
      ))
    }
  );
}
export {
  S as TilingLayer,
  m as useTilingCapability,
  O as useTilingPlugin
};
//# sourceMappingURL=index.js.map
