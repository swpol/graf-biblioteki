import { R as o } from "./rotate-plugin-BYCSul3M.js";
const e = "rotate", n = {
  id: e,
  name: "Rotate Plugin",
  version: "1.0.0",
  provides: ["rotate"],
  requires: ["loader"],
  optional: ["spread"],
  defaultConfig: {
    enabled: !0
  }
}, s = {
  manifest: n,
  create: (t, i, a) => new o(e, t, a),
  reducer: () => {
  },
  initialState: {}
};
export {
  e as ROTATE_PLUGIN_ID,
  o as RotatePlugin,
  s as RotatePluginPackage,
  n as manifest
};
//# sourceMappingURL=index.js.map
