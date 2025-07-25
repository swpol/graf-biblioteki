import { u as g } from "../jsxRuntime.module-D89ud_rY.js";
import { useContext as E, useState as y, useEffect as a, useRef as P, useCallback as M } from "preact/hooks";
import { c as v, r as L } from "../index-Q-vI1_iw.js";
import { createContext as z } from "preact";
import { I, i as S } from "../reducer-Dda407Go.js";
const A = z({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function R() {
  const e = E(A);
  if (e === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: n, isInitializing: t } = e;
  if (t)
    return e;
  if (n === null)
    throw new Error("PDF registry failed to initialize properly");
  return e;
}
function x(e) {
  const { registry: n } = R();
  if (n === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const t = n.getPlugin(e);
  if (!t)
    throw new Error(`Plugin ${e} not found`);
  return {
    plugin: t,
    isLoading: !1,
    ready: t.ready()
  };
}
function D(e) {
  const { plugin: n, isLoading: t, ready: r } = x(e);
  if (!n)
    return {
      provides: null,
      isLoading: t,
      ready: r
    };
  if (!n.provides)
    throw new Error(`Plugin ${e} does not provide a capability`);
  return {
    provides: n.provides(),
    isLoading: t,
    ready: r
  };
}
const X = () => x(I.id), s = () => D(I.id);
function Y() {
  const { provides: e } = s(), [n, t] = y(S);
  return a(() => {
    if (e)
      return e.onStateChange((r) => {
        t(r);
      });
  }, [e]), {
    provides: e,
    state: n
  };
}
function j() {
  const { provides: e } = s();
  return {
    setCursor: (n, t, r = 0) => {
      e == null || e.setCursor(n, t, r);
    },
    removeCursor: (n) => {
      e == null || e.removeCursor(n);
    }
  };
}
function q({ modeId: e, pageIndex: n }) {
  const { provides: t } = s();
  return {
    register: (r, i) => {
      const u = (i == null ? void 0 : i.modeId) ?? e, o = (i == null ? void 0 : i.pageIndex) ?? n;
      return u ? t == null ? void 0 : t.registerHandlers({
        modeId: u,
        handlers: r,
        pageIndex: o
      }) : t == null ? void 0 : t.registerAlways({
        scope: o !== void 0 ? { type: "page", pageIndex: o } : { type: "global" },
        handlers: r
      });
    }
  };
}
function F() {
  const { provides: e } = s(), [n, t] = y(() => {
    const r = e == null ? void 0 : e.getActiveInteractionMode();
    return (r == null ? void 0 : r.scope) === "page" && !!r.exclusive;
  });
  return a(() => {
    if (e)
      return e.onModeChange(() => {
        const r = e.getActiveInteractionMode();
        t((r == null ? void 0 : r.scope) === "page" && !!(r != null && r.exclusive));
      });
  }, [e]), n;
}
const J = ({
  children: e,
  style: n,
  ...t
}) => {
  const r = P(null), { provides: i } = s();
  return a(() => {
    if (!(!i || !r.current))
      return v(i, { type: "global" }, r.current);
  }, [i]), /* @__PURE__ */ g(
    "div",
    {
      ref: r,
      style: {
        width: "100%",
        height: "100%",
        ...n
      },
      ...t,
      children: e
    }
  );
}, K = ({
  pageIndex: e,
  children: n,
  pageWidth: t,
  pageHeight: r,
  rotation: i,
  scale: u,
  convertEventToPoint: o,
  style: C,
  ...h
}) => {
  const c = P(null), { provides: l } = s(), m = F(), d = M(
    (f, w) => {
      const p = w.getBoundingClientRect(), b = {
        x: f.clientX - p.left,
        y: f.clientY - p.top
      };
      return L(
        { width: t, height: r },
        b,
        i,
        u
      );
    },
    [t, r, i, u]
  );
  return a(() => {
    if (!(!l || !c.current))
      return v(
        l,
        { type: "page", pageIndex: e },
        c.current,
        o || d
      );
  }, [l, e, o, d]), /* @__PURE__ */ g(
    "div",
    {
      ref: c,
      style: {
        ...C
      },
      ...h,
      children: [
        n,
        m && /* @__PURE__ */ g("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 } })
      ]
    }
  );
};
export {
  J as GlobalPointerProvider,
  K as PagePointerProvider,
  j as useCursor,
  Y as useInteractionManager,
  s as useInteractionManagerCapability,
  X as useInteractionManagerPlugin,
  F as useIsPageExclusive,
  q as usePointerHandlers
};
//# sourceMappingURL=index.js.map
