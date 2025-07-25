import { createContext as b } from "preact";
import { u as w } from "../jsxRuntime.module-Bzuv3cXw.js";
import { useState as a, useRef as m, useEffect as f, useContext as S } from "preact/hooks";
import { P as v, a as C } from "../math-ChSRQF3r.js";
const P = b({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function F({ engine: t, onInitialized: r, plugins: e, children: i }) {
  const [o, s] = a(null), [u, c] = a(!0), [y, d] = a(!1), l = m(r);
  return f(() => {
    l.current = r;
  }, [r]), f(() => {
    const n = new v(t);
    return n.registerPluginBatch(e), (async () => {
      var p;
      await n.initialize(), !n.isDestroyed() && (await ((p = l.current) == null ? void 0 : p.call(l, n)), !n.isDestroyed() && (n.pluginsReady().then(() => {
        n.isDestroyed() || d(!0);
      }), s(n), c(!1)));
    })().catch(console.error), () => {
      n.destroy(), s(null), c(!0), d(!1);
    };
  }, [t, e]), /* @__PURE__ */ w(P.Provider, { value: { registry: o, isInitializing: u, pluginsReady: y }, children: typeof i == "function" ? i({ registry: o, isInitializing: u, pluginsReady: y }) : i });
}
function g() {
  const t = S(P);
  if (t === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t;
  if (e)
    return t;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t;
}
function h(t) {
  const { registry: r } = g();
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
  const { plugin: r, isLoading: e, ready: i } = h(t);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: i
    };
  if (!r.provides)
    throw new Error(`Plugin ${t} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: i
  };
}
function V() {
  const { registry: t } = g(), [r, e] = a(null);
  return f(() => {
    if (!t) return;
    e(t.getStore().getState());
    const i = t.getStore().subscribe((o, s) => {
      e(s);
    });
    return () => i();
  }, [t]), r;
}
function $() {
  const { registry: t } = g(), [r, e] = a(null);
  return f(() => {
    if (!t) return;
    const i = t.getStore();
    e(i.getState().core);
    const o = i.subscribe((s, u, c) => {
      i.isCoreAction(s) && !C(u.core, c.core) && e(u.core);
    });
    return () => o();
  }, [t]), r;
}
export {
  F as EmbedPDF,
  P as PDFContext,
  L as useCapability,
  $ as useCoreState,
  h as usePlugin,
  g as useRegistry,
  V as useStoreState
};
//# sourceMappingURL=index.js.map
