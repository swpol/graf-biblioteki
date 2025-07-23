import { usePlugin as y, useCapability as L } from "@embedpdf/core/react";
import { TilingPlugin as f } from "@embedpdf/plugin-tiling";
import { jsx as u } from "react/jsx-runtime";
import { useState as g, useRef as h, useEffect as m } from "react";
import { ignore as v, PdfErrorCode as T } from "@embedpdf/models";
const O = () => y(f.id), p = () => L(f.id);
function U({ pageIndex: n, tile: r, dpr: c, scale: s }) {
  const { provides: t } = p(), [i, l] = g(), e = h(null), o = s / r.srcScale;
  m(() => {
    if (r.status === "ready" && e.current || !t) return;
    const a = t.renderTile({ pageIndex: n, tile: r, dpr: c });
    return a.wait((b) => {
      const d = URL.createObjectURL(b);
      e.current = d, l(d);
    }, v), () => {
      e.current ? (URL.revokeObjectURL(e.current), e.current = null) : a.abort({
        code: T.Cancelled,
        message: "canceled render task"
      });
    };
  }, [n, r.id]);
  const R = () => {
    e.current && (URL.revokeObjectURL(e.current), e.current = null);
  };
  return i ? /* @__PURE__ */ u(
    "img",
    {
      src: i,
      onLoad: R,
      style: {
        position: "absolute",
        left: r.screenRect.origin.x * o,
        top: r.screenRect.origin.y * o,
        width: r.screenRect.size.width * o,
        height: r.screenRect.size.height * o,
        display: "block"
      }
    }
  ) : null;
}
function S({ pageIndex: n, scale: r, style: c, ...s }) {
  const { provides: t } = p(), [i, l] = g([]);
  return m(() => {
    if (t)
      return t.onTileRendering((e) => l(e[n]));
  }, [t]), /* @__PURE__ */ u(
    "div",
    {
      style: {
        ...c
      },
      ...s,
      children: i == null ? void 0 : i.map((e) => /* @__PURE__ */ u(
        U,
        {
          pageIndex: n,
          tile: e,
          dpr: window.devicePixelRatio,
          scale: r
        },
        e.id
      ))
    }
  );
}
export {
  S as TilingLayer,
  p as useTilingCapability,
  O as useTilingPlugin
};
//# sourceMappingURL=index.js.map
