import { createContext as l, Fragment as d } from "preact";
import { useContext as f, useRef as c, useEffect as p } from "preact/hooks";
import { L as s } from "../loader-plugin-DC0zA4Bl.js";
import { u } from "../jsxRuntime.module-Bzuv3cXw.js";
const g = l({
  registry: null,
  isInitializing: !0,
  pluginsReady: !1
});
function y() {
  const i = f(g);
  if (i === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = i;
  if (e)
    return i;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return i;
}
function a(i) {
  const { registry: r } = y();
  if (r === null)
    return {
      plugin: null,
      isLoading: !0,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(i);
  if (!e)
    throw new Error(`Plugin ${i} not found`);
  return {
    plugin: e,
    isLoading: !1,
    ready: e.ready()
  };
}
function m(i) {
  const { plugin: r, isLoading: e, ready: n } = a(i);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: n
    };
  if (!r.provides)
    throw new Error(`Plugin ${i} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: n
  };
}
const v = () => a(s.id), w = () => m(s.id);
function C() {
  const { provides: i } = w(), r = c(null);
  return p(() => i ? i.onOpenFileRequest((t) => {
    t === "open" && r.current && r.current.click();
  }) : void 0, [i]), /* @__PURE__ */ u(d, { children: /* @__PURE__ */ u(
    "input",
    {
      ref: r,
      type: "file",
      accept: "application/pdf",
      style: { display: "none" },
      onChange: async (n) => {
        var o;
        const t = (o = n.currentTarget.files) == null ? void 0 : o[0];
        t && i && await i.loadDocument({
          type: "buffer",
          pdfFile: {
            id: Math.random().toString(36).substring(2, 15),
            content: await t.arrayBuffer()
          }
        });
      }
    }
  ) });
}
export {
  C as FilePicker,
  w as useLoaderCapability,
  v as useLoaderPlugin
};
//# sourceMappingURL=index.js.map
