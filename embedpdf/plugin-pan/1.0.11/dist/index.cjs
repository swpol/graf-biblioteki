"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  PAN_PLUGIN_ID: () => PAN_PLUGIN_ID,
  PanPlugin: () => PanPlugin,
  PanPluginPackage: () => PanPluginPackage,
  manifest: () => manifest
});
module.exports = __toCommonJS(index_exports);

// src/lib/pan-plugin.ts
var import_core = require("@embedpdf/core");
var import_plugin_interaction_manager = require("@embedpdf/plugin-interaction-manager");
var PanPlugin = class extends import_core.BasePlugin {
  constructor(id, registry) {
    super(id, registry);
    this.interactionManager = registry.getPlugin(import_plugin_interaction_manager.InteractionManagerPlugin.id)?.provides();
    this.interactionManager.registerMode({
      id: "panMode",
      scope: "global",
      exclusive: false,
      cursor: "grab"
    });
  }
  async initialize(_) {
  }
  buildCapability() {
    return {
      enablePan: () => this.interactionManager.activate("panMode"),
      disablePan: () => this.interactionManager.activate("default"),
      togglePan: () => {
        if (this.interactionManager.getActiveMode() === "panMode") {
          this.interactionManager.activate("default");
        } else {
          this.interactionManager.activate("panMode");
        }
      }
    };
  }
};
PanPlugin.id = "pan";

// src/lib/manifest.ts
var PAN_PLUGIN_ID = "pan";
var manifest = {
  id: PAN_PLUGIN_ID,
  name: "Pan Plugin",
  version: "1.0.0",
  provides: ["pan"],
  requires: ["interaction-manager"],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

// src/lib/index.ts
var PanPluginPackage = {
  manifest,
  create: (registry) => new PanPlugin(PAN_PLUGIN_ID, registry),
  reducer: () => {
  },
  initialState: {}
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PAN_PLUGIN_ID,
  PanPlugin,
  PanPluginPackage,
  manifest
});
//# sourceMappingURL=index.cjs.map