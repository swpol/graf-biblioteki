import { createContext as L } from "preact";
import { useContext as z, useState as P, useRef as S, useEffect as c, useCallback as k, useMemo as _ } from "preact/hooks";
import { e as F, g as C, l as b, P as $ } from "../selection-plugin-Bns-tQIi.js";
import { u as E } from "../jsxRuntime.module-D89ud_rY.js";
import { w as B } from "../index-Q-vI1_iw-B7e7p3tz.js";
const G = L({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function H() {
  const e = z(G);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t } = e;
  if (t)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function R(e) {
  const { registry: r } = H();
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
function T(e) {
  const { plugin: r, isLoading: t, ready: i } = R(e);
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
const x = () => T(F.id), X = () => R(F.id), I = L({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function j() {
  const e = z(I);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: t } = e;
  if (t)
    return e;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function q(e) {
  const { registry: r } = j();
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
function U(e) {
  const { plugin: r, isLoading: t, ready: i } = q(e);
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
const p = () => U(B.id);
function J() {
  const { provides: e } = p();
  return {
    setCursor: (r, t, i = 0) => {
      e == null || e.setCursor(r, t, i);
    },
    removeCursor: (r) => {
      e == null || e.removeCursor(r);
    }
  };
}
function K({ modeId: e, pageIndex: r }) {
  const { provides: t } = p();
  return {
    register: (i, s) => {
      const u = (s == null ? void 0 : s.modeId) ?? e, d = (s == null ? void 0 : s.pageIndex) ?? r;
      return u ? t == null ? void 0 : t.registerHandlers({
        modeId: u,
        handlers: i,
        pageIndex: d
      }) : t == null ? void 0 : t.registerAlways({
        scope: d !== void 0 ? { type: "page", pageIndex: d } : { type: "global" },
        handlers: i
      });
    }
  };
}
function Y({ pageIndex: e, scale: r, background: t = "rgba(33,150,243)" }) {
  const { provides: i } = x(), { provides: s } = p(), { register: u } = K({ pageIndex: e }), [d, y] = P([]), [l, v] = P(null), { setCursor: M, removeCursor: A } = J(), f = S(null);
  c(() => {
    if (i)
      return i.onSelectionChange(() => {
        (s == null ? void 0 : s.getActiveMode()) === "default" ? (y(i.getHighlightRectsForPage(e)), v(i.getBoundingRectForPage(e))) : (y([]), v(null));
      });
  }, [i, e]);
  const h = k((n) => {
    const o = f.current;
    return o ? C(o, n) : -1;
  }, []);
  c(() => {
    if (!i) return;
    const n = i.getGeometry(e);
    return n.wait((o) => f.current = o, b), () => {
      n.abort({
        code: $.Cancelled,
        message: "Cancelled"
      }), f.current = null;
    };
  }, [i, e]);
  const w = _(
    () => ({
      onPointerDown: (n, o, a) => {
        if (!i || !i.isEnabledForMode(a)) return;
        i.clear(), i.getGeometry(e).wait((D) => {
          const m = C(D, n);
          m !== -1 && i.begin(e, m);
        }, b);
      },
      onPointerMove: (n, o, a) => {
        if (!i || !i.isEnabledForMode(a)) return;
        const g = h(n);
        g !== -1 ? M("selection-text", "text", 10) : A("selection-text"), g !== -1 && i.update(e, g);
      },
      onPointerUp: (n, o, a) => {
        i && i.isEnabledForMode(a) && i.end();
      },
      onHandlerActiveEnd(n) {
        i && i.isEnabledForMode(n) && i.clear();
      }
    }),
    [i, e, h]
  );
  return c(() => {
    if (u)
      return u(w);
  }, [u, w]), l ? /* @__PURE__ */ E(
    "div",
    {
      style: {
        position: "absolute",
        left: l.origin.x * r,
        top: l.origin.y * r,
        width: l.size.width * r,
        height: l.size.height * r,
        mixBlendMode: "multiply",
        isolation: "isolate"
      },
      children: d.map((n, o) => /* @__PURE__ */ E(
        "div",
        {
          style: {
            position: "absolute",
            left: (n.origin.x - l.origin.x) * r,
            top: (n.origin.y - l.origin.y) * r,
            width: n.size.width * r,
            height: n.size.height * r,
            background: t,
            pointerEvents: "none"
          }
        },
        o
      ))
    }
  ) : null;
}
function Z() {
  const { provides: e } = x();
  return c(() => {
    if (e)
      return e.onCopyToClipboard((r) => {
        navigator.clipboard.writeText(r);
      });
  }, [e]), null;
}
export {
  Z as CopyToClipboard,
  Y as SelectionLayer,
  x as useSelectionCapability,
  X as useSelectionPlugin
};
//# sourceMappingURL=index.js.map
