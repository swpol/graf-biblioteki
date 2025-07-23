import { inject as p, ref as u, onMounted as a, onBeforeUnmount as l, shallowRef as d, watch as v, computed as y, defineComponent as m, provide as w, renderSlot as P } from "vue";
import { arePropsEqual as h, PluginRegistry as S } from "@embedpdf/core";
const f = Symbol("pdfKey");
function c() {
  const r = p(f);
  if (!r) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return r;
}
function b() {
  const { registry: r } = c(), e = u();
  return a(() => {
    const o = r.value.getStore();
    e.value = o.getState().core;
    const t = o.subscribe((s, n, i) => {
      o.isCoreAction(s) && !h(n.core, i.core) && (e.value = n.core);
    });
    l(t);
  }), e;
}
function R(r) {
  const { registry: e } = c(), o = d(null), t = u(!0), s = u(new Promise(() => {
  })), n = () => {
    var g;
    if (!e.value) return;
    const i = e.value.getPlugin(r);
    if (!i) throw new Error(`Plugin ${r} not found`);
    o.value = i, t.value = !1, s.value = ((g = i.ready) == null ? void 0 : g.call(i)) ?? Promise.resolve();
  };
  return a(n), v(e, n), { plugin: o, isLoading: t, ready: s };
}
function z(r) {
  const { plugin: e, isLoading: o, ready: t } = R(r);
  return { provides: y(() => {
    if (!e.value) return null;
    if (!e.value.provides)
      throw new Error(`Plugin ${r} does not implement provides()`);
    return e.value.provides();
  }), isLoading: o, ready: t };
}
function C() {
  const { registry: r } = c(), e = u();
  function o() {
    return r.value ? (e.value = r.value.getStore().getState(), r.value.getStore().subscribe((s, n) => e.value = n)) : () => {
    };
  }
  let t = o();
  return v(r, () => {
    t == null || t(), t = o();
  }), l(() => t == null ? void 0 : t()), e;
}
const F = /* @__PURE__ */ m({
  __name: "embed-pdf",
  props: {
    engine: {},
    plugins: {},
    onInitialized: { type: Function }
  },
  setup(r) {
    const e = r, o = d(null), t = u(!0), s = u(!1);
    return w(f, { registry: o, isInitializing: t, pluginsReady: s }), a(async () => {
      var i;
      const n = new S(e.engine);
      n.registerPluginBatch(e.plugins), await n.initialize(), await ((i = e.onInitialized) == null ? void 0 : i.call(e, n)), o.value = n, t.value = !1, n.pluginsReady().then(() => s.value = !0);
    }), l(() => {
      var n;
      return (n = o.value) == null ? void 0 : n.destroy();
    }), (n, i) => P(n.$slots, "default", {
      registry: o.value,
      isInitializing: t.value,
      pluginsReady: s.value
    });
  }
});
export {
  F as EmbedPDF,
  z as useCapability,
  b as useCoreState,
  R as usePlugin,
  c as useRegistry,
  C as useStoreState
};
//# sourceMappingURL=index.js.map
