import { createContext as x } from "preact";
import { useContext as w, useState as c, useEffect as d } from "preact/hooks";
import { c as h, S as g } from "../scroll-plugin-DIl4FWp0.js";
import { u as o } from "../jsxRuntime.module-D89ud_rY.js";
const v = x({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function f() {
  const t = w(v);
  if (t === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: i } = t;
  if (i)
    return t;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t;
}
function y(t) {
  const { registry: r } = f();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const i = r.getPlugin(t);
  if (!i)
    throw new Error(`Plugin ${t} not found`);
  return {
    plugin: i,
    isLoading: !1,
    ready: i.ready()
  };
}
function P(t) {
  const { plugin: r, isLoading: i, ready: n } = y(t);
  if (!r)
    return {
      provides: null,
      isLoading: i,
      ready: n
    };
  if (!r.provides)
    throw new Error(`Plugin ${t} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: i,
    ready: n
  };
}
const b = () => y(h.id), S = () => P(h.id), D = () => {
  const { provides: t } = S(), [r, i] = c(1), [n, l] = c(1);
  return d(() => {
    if (t)
      return t.onPageChange(({ pageNumber: a, totalPages: e }) => {
        i(a), l(e);
      });
  }, [t]), {
    ...t,
    currentPage: r,
    totalPages: n
  };
};
function $({ renderPage: t, overlayElements: r, ...i }) {
  const { provides: n } = S(), { plugin: l } = b(), { registry: a } = f(), [e, m] = c(
    () => (n == null ? void 0 : n.getScrollerLayout()) ?? null
  );
  if (d(() => {
    if (n)
      return n.onScrollerData(m);
  }, [n]), d(() => {
    l && l.setLayoutReady();
  }, [l]), !e || !a) return null;
  const u = a.getStore().getState();
  return /* @__PURE__ */ o(
    "div",
    {
      ...i,
      style: {
        width: `${e.totalWidth}px`,
        height: `${e.totalHeight}px`,
        position: "relative",
        boxSizing: "border-box",
        margin: "0 auto",
        ...e.strategy === g.Horizontal && {
          display: "flex",
          flexDirection: "row"
        }
      },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              ...e.strategy === g.Horizontal ? {
                width: e.startSpacing,
                height: "100%",
                flexShrink: 0
              } : {
                height: e.startSpacing,
                width: "100%"
              }
            }
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              gap: e.pageGap,
              display: "flex",
              alignItems: "center",
              position: "relative",
              boxSizing: "border-box",
              ...e.strategy === g.Horizontal ? {
                flexDirection: "row",
                minHeight: "100%"
              } : {
                flexDirection: "column",
                minWidth: "fit-content"
              }
            },
            children: e.items.map((p) => /* @__PURE__ */ o(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  gap: e.pageGap
                },
                children: p.pageLayouts.map((s) => /* @__PURE__ */ o(
                  "div",
                  {
                    style: {
                      width: `${s.rotatedWidth}px`,
                      height: `${s.rotatedHeight}px`
                    },
                    children: t({
                      ...s,
                      rotation: u.core.rotation,
                      scale: u.core.scale,
                      document: u.core.document
                    })
                  },
                  s.pageNumber
                ))
              },
              p.pageNumbers[0]
            ))
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              ...e.strategy === g.Horizontal ? {
                width: e.endSpacing,
                height: "100%",
                flexShrink: 0
              } : {
                height: e.endSpacing,
                width: "100%"
              }
            }
          }
        ),
        r
      ]
    }
  );
}
export {
  $ as Scroller,
  D as useScroll,
  S as useScrollCapability,
  b as useScrollPlugin
};
//# sourceMappingURL=index.js.map
