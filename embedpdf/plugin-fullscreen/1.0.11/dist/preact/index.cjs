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

// src/preact/index.ts
var preact_exports = {};
__export(preact_exports, {
  FullscreenProvider: () => FullscreenProvider,
  useFullscreen: () => useFullscreen,
  useFullscreenCapability: () => useFullscreenCapability,
  useFullscreenPlugin: () => useFullscreenPlugin
});
module.exports = __toCommonJS(preact_exports);

// src/preact/hooks/use-fullscreen.ts
var import_preact = require("@embedpdf/core/preact");
var import_plugin_fullscreen = require("@embedpdf/plugin-fullscreen");
var import_hooks = require("preact/hooks");
var useFullscreenPlugin = () => (0, import_preact.usePlugin)(import_plugin_fullscreen.FullscreenPlugin.id);
var useFullscreenCapability = () => (0, import_preact.useCapability)(import_plugin_fullscreen.FullscreenPlugin.id);
var useFullscreen = () => {
  const { provides } = useFullscreenCapability();
  const [state, setState] = (0, import_hooks.useState)(import_plugin_fullscreen.initialState);
  (0, import_hooks.useEffect)(() => {
    return provides?.onStateChange((state2) => {
      setState(state2);
    });
  }, [provides]);
  return {
    provides,
    state
  };
};

// src/preact/components/fullscreen.tsx
var import_hooks2 = require("preact/hooks");
var import_jsx_runtime = require("preact/jsx-runtime");
function FullscreenProvider({ children, ...props }) {
  const { provides: fullscreenCapability } = useFullscreenCapability();
  const { plugin } = useFullscreenPlugin();
  const ref = (0, import_hooks2.useRef)(null);
  (0, import_hooks2.useEffect)(() => {
    if (!fullscreenCapability) return;
    const unsub = fullscreenCapability.onRequest(async (action) => {
      if (action === "enter") {
        const el = ref.current;
        if (el && !document.fullscreenElement) await el.requestFullscreen();
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
      }
    });
    return unsub;
  }, [fullscreenCapability]);
  (0, import_hooks2.useEffect)(() => {
    if (!plugin) return;
    const handler = () => plugin.setFullscreenState(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [plugin]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ...props,
      style: { position: "relative", width: "100%", height: "100%", ...props.style },
      ref,
      children
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FullscreenProvider,
  useFullscreen,
  useFullscreenCapability,
  useFullscreenPlugin
});
//# sourceMappingURL=index.cjs.map