import { L as n } from "./loader-plugin-DC0zA4Bl.js";
const e = "loader", i = {
  id: e,
  name: "Loader Plugin",
  version: "1.0.0",
  provides: ["loader"],
  requires: [],
  optional: [],
  metadata: {
    name: "Loader Plugin",
    description: "A plugin for loading PDF documents",
    version: "1.0.0",
    author: "EmbedPDF",
    license: "MIT"
  },
  defaultConfig: {
    enabled: !0
  }
}, t = {
  manifest: i,
  create: (a, o) => new n(e, a, o),
  reducer: () => {
  },
  initialState: {}
};
export {
  e as LOADER_PLUGIN_ID,
  n as LoaderPlugin,
  t as LoaderPluginPackage,
  i as manifest
};
//# sourceMappingURL=index.js.map
