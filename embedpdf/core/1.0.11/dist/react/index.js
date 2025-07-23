import { createContext as b, useState as a, useRef as w, useEffect as f, useContext as S } from "react";
import { jsx as m } from "react/jsx-runtime";
import { PluginRegistry as v, arePropsEqual as C } from "@embedpdf/core";
const P = b({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function z({ engine: e, onInitialized: r, plugins: t, children: i }) {
  const [o, s] = a(null), [u, c] = a(!0), [y, d] = a(!1), l = w(r);
  return f(() => {
    l.current = r;
  }, [r]), f(() => {
    const n = new v(e);
    return n.registerPluginBatch(t), (async () => {
      var p;
      await n.initialize(), !n.isDestroyed() && (await ((p = l.current) == null ? void 0 : p.call(l, n)), !n.isDestroyed() && (n.pluginsReady().then(() => {
        n.isDestroyed() || d(!0);
      }), s(n), c(!1)));
    })().catch(console.error), () => {
      n.destroy(), s(null), c(!0), d(!1);
    };
  }, [e, t]), /* @__PURE__ */ m(P.Provider, { value: { registry: o, isInitializing: u, pluginsReady: y }, children: typeof i == "function" ? i({ registry: o, isInitializing: u, pluginsReady: y }) : i });
}
function g() {
  const e = S(P);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t } = e;
  if (t)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function h(e) {
  const { registry: r } = g();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const t = r.getPlugin(e);
  if (!t)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t,
    isLoading: !1,
    ready: t.ready()
  };
}
function F(e) {
  const { plugin: r, isLoading: t, ready: i } = h(e);
  if (!r)
    return {
      provides: null,
      isLoading: t,
      ready: i
    };
  if (!r.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: t,
    ready: i
  };
}
function L() {
  const { registry: e } = g(), [r, t] = a(null);
  return f(() => {
    if (!e) return;
    t(e.getStore().getState());
    const i = e.getStore().subscribe((o, s) => {
      t(s);
    });
    return () => i();
  }, [e]), r;
}
function V() {
  const { registry: e } = g(), [r, t] = a(null);
  return f(() => {
    if (!e) return;
    const i = e.getStore();
    t(i.getState().core);
    const o = i.subscribe((s, u, c) => {
      i.isCoreAction(s) && !C(u.core, c.core) && t(u.core);
    });
    return () => o();
  }, [e]), r;
}
export {
  z as EmbedPDF,
  P as PDFContext,
  F as useCapability,
  V as useCoreState,
  h as usePlugin,
  g as useRegistry,
  L as useStoreState
};
//# sourceMappingURL=index.js.map
