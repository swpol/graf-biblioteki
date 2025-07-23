// src/lib/pan-plugin.ts
import { BasePlugin } from "@embedpdf/core";
import {
  InteractionManagerPlugin
} from "@embedpdf/plugin-interaction-manager";
var PanPlugin = class extends BasePlugin {
  constructor(id, registry) {
    super(id, registry);
    this.interactionManager = registry.getPlugin(InteractionManagerPlugin.id)?.provides();
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
export {
  PAN_PLUGIN_ID,
  PanPlugin,
  PanPluginPackage,
  manifest
};
//# sourceMappingURL=index.js.map