import { computed as g, shallowRef as m, ref as s, onMounted as y, watch as c, inject as R, defineComponent as P, onBeforeUnmount as w, createElementBlock as h, createCommentVNode as b, openBlock as k } from "vue";
import { R as p, i as L, P as _ } from "../render-plugin-ErV8zPxc.js";
const U = Symbol("pdfKey");
function x() {
  const r = R(U);
  if (!r) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return r;
}
function f(r) {
  const { registry: e } = x(), o = m(null), n = s(!0), t = s(new Promise(() => {
  })), l = () => {
    var u;
    if (!e.value) return;
    const a = e.value.getPlugin(r);
    if (!a) throw new Error(`Plugin ${r} not found`);
    o.value = a, n.value = !1, t.value = ((u = a.ready) == null ? void 0 : u.call(a)) ?? Promise.resolve();
  };
  return y(l), c(e, l), { plugin: o, isLoading: n, ready: t };
}
function C(r) {
  const { plugin: e, isLoading: o, ready: n } = f(r);
  return { provides: g(() => {
    if (!e.value) return null;
    if (!e.value.provides)
      throw new Error(`Plugin ${r} does not implement provides()`);
    return e.value.provides();
  }), isLoading: o, ready: n };
}
const j = () => f(p.id), E = () => C(p.id), F = ["src"], O = /* @__PURE__ */ P({
  __name: "render-layer",
  props: {
    pageIndex: {},
    scaleFactor: { default: 1 },
    dpr: { default: 1 }
  },
  setup(r) {
    const e = r, { provides: o } = E(), n = s(null);
    let t = null, l = null;
    function u() {
      l && !t && l.abort({
        code: _.Cancelled,
        message: "canceled render task"
      });
    }
    function a() {
      t && (URL.revokeObjectURL(t), t = null);
    }
    function v() {
      if (u(), a(), n.value = null, l = null, !o.value) return;
      const i = o.value.renderPage({
        pageIndex: e.pageIndex,
        scaleFactor: e.scaleFactor,
        dpr: e.dpr
      });
      l = i, i.wait((d) => {
        t = URL.createObjectURL(d), n.value = t, l = null;
      }, L);
    }
    return c(() => [e.pageIndex, e.scaleFactor, e.dpr, o.value], v, {
      immediate: !0
    }), w(() => {
      u(), a();
    }), (i, d) => n.value ? (k(), h("img", {
      key: 0,
      src: n.value,
      style: { width: "100%", height: "100%" },
      onLoad: a
    }, null, 40, F)) : b("", !0);
  }
});
export {
  O as RenderLayer,
  E as useRenderCapability,
  j as useRenderPlugin
};
//# sourceMappingURL=index.js.map
