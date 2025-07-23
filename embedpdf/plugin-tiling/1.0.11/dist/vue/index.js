import { defineComponent as g, ref as m, onMounted as y, toRaw as k, onBeforeUnmount as f, createElementBlock as u, createCommentVNode as R, openBlock as s, normalizeStyle as h, mergeProps as x, Fragment as I, renderList as T, createBlock as C } from "vue";
import { ignore as L, PdfErrorCode as P } from "@embedpdf/models";
import { useCapability as w, usePlugin as B } from "@embedpdf/core/vue";
import { TilingPlugin as v } from "@embedpdf/plugin-tiling";
const A = () => B(v.id), b = () => w(v.id), U = ["src"], _ = /* @__PURE__ */ g({
  __name: "tile-img",
  props: {
    pageIndex: {},
    tile: {},
    scale: {},
    dpr: { default: () => window.devicePixelRatio },
    style: { type: [Boolean, null, String, Object, Array] }
  },
  setup(c) {
    const t = c, { provides: r } = b(), i = m();
    let e = null, l = null;
    function p() {
      e && (URL.revokeObjectURL(e), e = null);
    }
    function o() {
      l && !e && l.abort({
        code: P.Cancelled,
        message: "canceled tile render"
      });
    }
    y(() => {
      if (!r.value) return;
      const n = r.value.renderTile({
        pageIndex: t.pageIndex,
        tile: k(t.tile),
        dpr: t.dpr
      });
      l = n, n.wait((d) => {
        e = URL.createObjectURL(d), i.value = e, l = null;
      }, L);
    }), f(() => {
      o(), p();
    });
    const a = t.scale / t.tile.srcScale;
    return (n, d) => i.value ? (s(), u("img", {
      key: 0,
      src: i.value,
      style: h([
        {
          position: "absolute",
          left: n.tile.screenRect.origin.x * a + "px",
          top: n.tile.screenRect.origin.y * a + "px",
          width: n.tile.screenRect.size.width * a + "px",
          height: n.tile.screenRect.size.height * a + "px",
          display: "block"
        },
        t.style
      ]),
      onLoad: p
    }, null, 44, U)) : R("", !0);
  }
}), E = /* @__PURE__ */ g({
  __name: "tiling-layer",
  props: {
    pageIndex: {},
    scale: {},
    style: { type: [Boolean, null, String, Object, Array] }
  },
  setup(c) {
    const t = c, r = m([]), { provides: i } = b();
    let e;
    return y(() => {
      i.value && (e = i.value.onTileRendering((l) => {
        r.value = l[t.pageIndex] ?? [];
      }));
    }), f(() => {
      e == null || e();
    }), (l, p) => (s(), u("div", x({ style: l.style }, l.$attrs), [
      (s(!0), u(I, null, T(r.value, (o) => (s(), C(_, {
        key: o.id,
        pageIndex: l.pageIndex,
        tile: o,
        scale: l.scale
      }, null, 8, ["pageIndex", "tile", "scale"]))), 128))
    ], 16));
  }
});
export {
  _ as TileImg,
  E as TilingLayer,
  b as useTilingCapability,
  A as useTilingPlugin
};
//# sourceMappingURL=index.js.map
