import { computed as g, shallowRef as x, ref as u, onMounted as b, watch as C, inject as E, watchEffect as c, readonly as f, defineComponent as P, createElementBlock as v, openBlock as d, renderSlot as m, createCommentVNode as w, unref as R } from "vue";
import { c as y, r as M } from "../index-Q-vI1_iw.js";
import { I as h, i as k } from "../reducer-Dda407Go.js";
const $ = Symbol("pdfKey");
function H() {
  const t = E($);
  if (!t) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return t;
}
function I(t) {
  const { registry: e } = H(), r = x(null), n = u(!0), o = u(new Promise(() => {
  })), a = () => {
    var i;
    if (!e.value) return;
    const s = e.value.getPlugin(t);
    if (!s) throw new Error(`Plugin ${t} not found`);
    r.value = s, n.value = !1, o.value = ((i = s.ready) == null ? void 0 : i.call(s)) ?? Promise.resolve();
  };
  return b(a), C(e, a), { plugin: r, isLoading: n, ready: o };
}
function S(t) {
  const { plugin: e, isLoading: r, ready: n } = I(t);
  return { provides: g(() => {
    if (!e.value) return null;
    if (!e.value.provides)
      throw new Error(`Plugin ${t} does not implement provides()`);
    return e.value.provides();
  }), isLoading: r, ready: n };
}
const F = () => I(h.id), l = () => S(h.id);
function W() {
  const { provides: t } = l(), e = u(k);
  return c((r) => {
    if (t.value) {
      const n = t.value.onStateChange((o) => {
        e.value = o;
      });
      r(n);
    }
  }), {
    provides: t,
    state: f(e)
  };
}
function j() {
  const { provides: t } = l();
  return {
    setCursor: (e, r, n = 0) => {
      var o;
      (o = t.value) == null || o.setCursor(e, r, n);
    },
    removeCursor: (e) => {
      var r;
      (r = t.value) == null || r.removeCursor(e);
    }
  };
}
function D({ modeId: t, pageIndex: e }) {
  const { provides: r } = l();
  return {
    register: (n, o) => {
      const a = (o == null ? void 0 : o.modeId) ?? t, i = (o == null ? void 0 : o.pageIndex) ?? e;
      if (r.value)
        return a ? r.value.registerHandlers({
          modeId: a,
          handlers: n,
          pageIndex: i
        }) : r.value.registerAlways({
          scope: i !== void 0 ? { type: "page", pageIndex: i } : { type: "global" },
          handlers: n
        });
    }
  };
}
function A() {
  const { provides: t } = l(), e = u(!1);
  return c((r) => {
    if (t.value) {
      const n = t.value.getActiveInteractionMode();
      e.value = (n == null ? void 0 : n.scope) === "page" && !!(n != null && n.exclusive);
      const o = t.value.onModeChange(() => {
        if (!t.value) return;
        const a = t.value.getActiveInteractionMode();
        e.value = (a == null ? void 0 : a.scope) === "page" && !!(a != null && a.exclusive);
      });
      r(o);
    }
  }), f(e);
}
const G = /* @__PURE__ */ P({
  __name: "global-pointer-provider",
  setup(t) {
    const e = u(null), { provides: r } = l();
    return c((n) => {
      if (r.value && e.value) {
        const o = y(r.value, { type: "global" }, e.value);
        n(o);
      }
    }), (n, o) => (d(), v("div", {
      ref_key: "divRef",
      ref: e,
      style: {
        width: "100%",
        height: "100%"
      }
    }, [
      m(n.$slots, "default")
    ], 512));
  }
}), B = {
  key: 0,
  style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }
}, K = /* @__PURE__ */ P({
  __name: "page-pointer-provider",
  props: {
    pageIndex: {},
    pageWidth: {},
    pageHeight: {},
    rotation: {},
    scale: {},
    convertEventToPoint: { type: Function }
  },
  setup(t) {
    const e = t, r = u(null), { provides: n } = l(), o = A(), a = g(() => (i, s) => {
      const p = s.getBoundingClientRect(), _ = {
        x: i.clientX - p.left,
        y: i.clientY - p.top
      };
      return M(
        { width: e.pageWidth, height: e.pageHeight },
        _,
        e.rotation,
        e.scale
      );
    });
    return c((i) => {
      if (n.value && r.value) {
        const s = y(
          n.value,
          { type: "page", pageIndex: e.pageIndex },
          r.value,
          e.convertEventToPoint || a.value
        );
        i(s);
      }
    }), (i, s) => (d(), v("div", {
      ref_key: "divRef",
      ref: r
    }, [
      m(i.$slots, "default"),
      R(o) ? (d(), v("div", B)) : w("", !0)
    ], 512));
  }
});
export {
  G as GlobalPointerProvider,
  K as PagePointerProvider,
  j as useCursor,
  W as useInteractionManager,
  l as useInteractionManagerCapability,
  F as useInteractionManagerPlugin,
  A as useIsPageExclusive,
  D as usePointerHandlers
};
//# sourceMappingURL=index.js.map
