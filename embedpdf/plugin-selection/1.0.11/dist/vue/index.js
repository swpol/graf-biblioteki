import { computed as h, shallowRef as E, ref as p, onMounted as I, watch as $, inject as k, defineComponent as F, watchEffect as g, createElementBlock as m, createCommentVNode as z, openBlock as y, normalizeStyle as x, Fragment as A, renderList as B } from "vue";
import { e as S, l as P, P as D, g as C } from "../selection-plugin-Bns-tQIi.js";
import { w as H } from "../index-Q-vI1_iw-B7e7p3tz.js";
const T = Symbol("pdfKey");
function j() {
  const o = k(T);
  if (!o) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return o;
}
function L(o) {
  const { registry: n } = j(), e = E(null), t = p(!0), l = p(new Promise(() => {
  })), s = () => {
    var u;
    if (!n.value) return;
    const i = n.value.getPlugin(o);
    if (!i) throw new Error(`Plugin ${o} not found`);
    e.value = i, t.value = !1, l.value = ((u = i.ready) == null ? void 0 : u.call(i)) ?? Promise.resolve();
  };
  return I(s), $(n, s), { plugin: e, isLoading: t, ready: l };
}
function G(o) {
  const { plugin: n, isLoading: e, ready: t } = L(o);
  return { provides: h(() => {
    if (!n.value) return null;
    if (!n.value.provides)
      throw new Error(`Plugin ${o} does not implement provides()`);
    return n.value.provides();
  }), isLoading: e, ready: t };
}
const _ = () => G(S.id), X = () => L(S.id), K = Symbol("pdfKey");
function N() {
  const o = k(K);
  if (!o) throw new Error("useRegistry must be used inside <EmbedPDF>");
  return o;
}
function U(o) {
  const { registry: n } = N(), e = E(null), t = p(!0), l = p(new Promise(() => {
  })), s = () => {
    var u;
    if (!n.value) return;
    const i = n.value.getPlugin(o);
    if (!i) throw new Error(`Plugin ${o} not found`);
    e.value = i, t.value = !1, l.value = ((u = i.ready) == null ? void 0 : u.call(i)) ?? Promise.resolve();
  };
  return I(s), $(n, s), { plugin: e, isLoading: t, ready: l };
}
function V(o) {
  const { plugin: n, isLoading: e, ready: t } = U(o);
  return { provides: h(() => {
    if (!n.value) return null;
    if (!n.value.provides)
      throw new Error(`Plugin ${o} does not implement provides()`);
    return n.value.provides();
  }), isLoading: e, ready: t };
}
const b = () => V(H.id);
function q() {
  const { provides: o } = b();
  return {
    setCursor: (n, e, t = 0) => {
      var l;
      (l = o.value) == null || l.setCursor(n, e, t);
    },
    removeCursor: (n) => {
      var e;
      (e = o.value) == null || e.removeCursor(n);
    }
  };
}
function J({ modeId: o, pageIndex: n }) {
  const { provides: e } = b();
  return {
    register: (t, l) => {
      const s = (l == null ? void 0 : l.modeId) ?? o, u = (l == null ? void 0 : l.pageIndex) ?? n;
      if (e.value)
        return s ? e.value.registerHandlers({
          modeId: s,
          handlers: t,
          pageIndex: u
        }) : e.value.registerAlways({
          scope: u !== void 0 ? { type: "page", pageIndex: u } : { type: "global" },
          handlers: t
        });
    }
  };
}
const Y = /* @__PURE__ */ F({
  __name: "selection-layer",
  props: {
    pageIndex: {},
    scale: {},
    background: { default: "rgba(33, 150, 243)" }
  },
  setup(o) {
    const n = o, { provides: e } = _(), { provides: t } = b(), { register: l } = J({ pageIndex: n.pageIndex }), { setCursor: s, removeCursor: u } = q(), i = p([]), c = p(null);
    g((r) => {
      if (e.value) {
        const d = e.value.onSelectionChange(() => {
          var v;
          ((v = t.value) == null ? void 0 : v.getActiveMode()) === "default" ? (i.value = e.value.getHighlightRectsForPage(n.pageIndex), c.value = e.value.getBoundingRectForPage(n.pageIndex)) : (i.value = [], c.value = null);
        });
        r(d);
      }
    });
    let f;
    g((r) => {
      if (e.value) {
        const d = e.value.getGeometry(n.pageIndex);
        d.wait((a) => f = a, P), r(() => {
          d.abort({
            code: D.Cancelled,
            message: "SelectionLayer unmounted"
          });
        });
      }
    });
    const M = h(
      () => ({
        onPointerDown: (r, d, a) => {
          if (!e.value || !e.value.isEnabledForMode(a)) return;
          e.value.clear(), e.value.getGeometry(n.pageIndex).wait((R) => {
            const w = C(R, r);
            w !== -1 && e.value.begin(n.pageIndex, w);
          }, P);
        },
        onPointerMove: (r, d, a) => {
          if (!e.value || !e.value.isEnabledForMode(a)) return;
          const v = f ? C(f, r) : -1;
          v !== -1 ? (s("selection-text", "text", 10), e.value.update(n.pageIndex, v)) : u("selection-text");
        },
        onPointerUp: (r, d, a) => {
          !e.value || !e.value.isEnabledForMode(a) || e.value.end();
        },
        onHandlerActiveEnd: (r) => {
          !e.value || !e.value.isEnabledForMode(r) || e.value.clear();
        }
      })
    );
    return g((r) => {
      if (l) {
        const d = l(M.value);
        d && r(d);
      }
    }), (r, d) => c.value ? (y(), m("div", {
      key: 0,
      style: x({
        position: "absolute",
        left: `${c.value.origin.x * r.scale}px`,
        top: `${c.value.origin.y * r.scale}px`,
        width: `${c.value.size.width * r.scale}px`,
        height: `${c.value.size.height * r.scale}px`,
        mixBlendMode: "multiply",
        isolation: "isolate",
        pointerEvents: "none"
      })
    }, [
      (y(!0), m(A, null, B(i.value, (a, v) => (y(), m("div", {
        key: v,
        style: x({
          position: "absolute",
          left: `${(a.origin.x - c.value.origin.x) * r.scale}px`,
          top: `${(a.origin.y - c.value.origin.y) * r.scale}px`,
          width: `${a.size.width * r.scale}px`,
          height: `${a.size.height * r.scale}px`,
          background: r.background
        })
      }, null, 4))), 128))
    ], 4)) : z("", !0);
  }
}), Z = /* @__PURE__ */ F({
  __name: "copy-to-clipboard",
  setup(o) {
    const { provides: n } = _();
    return g((e) => {
      if (n.value) {
        const t = n.value.onCopyToClipboard((l) => {
          navigator.clipboard.writeText(l).catch((s) => {
            console.error("Failed to copy text to clipboard:", s);
          });
        });
        e(t);
      }
    }), (e, t) => null;
  }
});
export {
  Z as CopyToClipboard,
  Y as SelectionLayer,
  _ as useSelectionCapability,
  X as useSelectionPlugin
};
//# sourceMappingURL=index.js.map
