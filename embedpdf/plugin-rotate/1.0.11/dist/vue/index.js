import { shallowRef as p, ref as u, onMounted as f, watch as g, computed as l, inject as m, defineComponent as v, createElementBlock as w, openBlock as y, normalizeStyle as h, renderSlot as P } from "vue";
import { R as d } from "../rotate-plugin-BYCSul3M.js";
const R = Symbol("pdfKey");
function S() {
  const e = m(R);
  if (!e) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return e;
}
function c(e) {
  const { registry: t } = S(), r = p(null), o = u(!0), n = u(new Promise(() => {
  })), a = () => {
    var s;
    if (!t.value) return;
    const i = t.value.getPlugin(e);
    if (!i) throw new Error(`Plugin ${e} not found`);
    r.value = i, o.value = !1, n.value = ((s = i.ready) == null ? void 0 : s.call(i)) ?? Promise.resolve();
  };
  return f(a), g(t, a), { plugin: r, isLoading: o, ready: n };
}
function b(e) {
  const { plugin: t, isLoading: r, ready: o } = c(e);
  return { provides: l(() => {
    if (!t.value) return null;
    if (!t.value.provides)
      throw new Error(`Plugin ${e} does not implement provides()`);
    return t.value.provides();
  }), isLoading: r, ready: o };
}
const x = () => c(d.id), z = () => b(d.id), L = /* @__PURE__ */ v({
  __name: "rotate",
  props: {
    pageSize: {}
  },
  setup(e) {
    const t = e, { provides: r } = z(), o = l(() => r.value ? r.value.getMatrix({
      w: t.pageSize.width,
      h: t.pageSize.height,
      asString: !0
    }) : "matrix(1, 0, 0, 1, 0, 0)");
    return (n, a) => (y(), w("div", {
      style: h({
        position: "absolute",
        transformOrigin: "0 0",
        transform: o.value
      })
    }, [
      P(n.$slots, "default")
    ], 4));
  }
});
export {
  L as Rotate,
  z as useRotateCapability,
  x as useRotatePlugin
};
//# sourceMappingURL=index.js.map
