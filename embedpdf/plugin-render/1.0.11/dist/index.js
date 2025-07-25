import { R as i } from "./render-plugin-ErV8zPxc.js";
const e = "render", t = {
  id: e,
  name: "Render Plugin",
  version: "1.0.0",
  provides: ["render"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: !0
  }
}, o = {
  manifest: t,
  create: (n, r) => new i(e, n, r),
  reducer: () => {
  },
  initialState: {}
};
export {
  i as RenderPlugin,
  o as RenderPluginPackage
};
//# sourceMappingURL=index.js.map
