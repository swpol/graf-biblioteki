import { createContext as a } from "preact";
import { useContext as u } from "preact/hooks";
import { R as o } from "../rotate-plugin-BYCSul3M.js";
import { u as l } from "../jsxRuntime.module-D89ud_rY.js";
const d = a({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function g() {
  const i = u(d);
  if (i === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t } = i;
  if (t)
    return i;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return i;
}
function e(i) {
  const { registry: r } = g();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const t = r.getPlugin(i);
  if (!t)
    throw new Error(`Plugin ${i} not found`);
  return {
    plugin: t,
    isLoading: !1,
    ready: t.ready()
  };
}
function f(i) {
  const { plugin: r, isLoading: t, ready: n } = e(i);
  if (!r)
    return {
      provides: null,
      isLoading: t,
      ready: n
    };
  if (!r.provides)
    throw new Error(`Plugin ${i} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t,
    ready: n
  };
}
const h = () => e(o.id), p = () => f(o.id);
function P({ children: i, pageSize: r, ...t }) {
  const { provides: n } = p(), s = (n == null ? void 0 : n.getMatrix({
    w: r.width,
    h: r.height
  })) || "matrix(1, 0, 0, 1, 0, 0)";
  return /* @__PURE__ */ l(
    "div",
    {
      ...t,
      style: {
        position: "absolute",
        transformOrigin: "0 0",
        transform: s
      },
      children: i
    }
  );
}
export {
  P as Rotate,
  p as useRotateCapability,
  h as useRotatePlugin
};
//# sourceMappingURL=index.js.map
