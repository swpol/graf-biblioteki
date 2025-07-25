import { i as e, r as t, I as i } from "./reducer-Dda407Go.js";
const n = "interaction-manager", r = {
  id: n,
  name: "Interaction Manager Plugin",
  version: "1.0.0",
  provides: ["interaction-manager"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: !0
  }
}, c = {
  manifest: r,
  create: (a) => new i(n, a),
  reducer: t,
  initialState: e
};
export {
  n as INTERACTION_MANAGER_PLUGIN_ID,
  i as InteractionManagerPlugin,
  c as InteractionManagerPluginPackage,
  e as initialState,
  r as manifest,
  t as reducer
};
//# sourceMappingURL=index.js.map
