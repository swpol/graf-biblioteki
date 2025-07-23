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
  PanMode: () => PanMode,
  usePan: () => usePan,
  usePanCapability: () => usePanCapability,
  usePanPlugin: () => usePanPlugin
});
module.exports = __toCommonJS(preact_exports);

// src/preact/hooks/use-pan.ts
var import_preact = require("@embedpdf/core/preact");
var import_preact2 = require("@embedpdf/plugin-interaction-manager/preact");
var import_plugin_pan = require("@embedpdf/plugin-pan");
var import_hooks = require("preact/hooks");
var usePanPlugin = () => (0, import_preact.usePlugin)(import_plugin_pan.PanPlugin.id);
var usePanCapability = () => (0, import_preact.useCapability)(import_plugin_pan.PanPlugin.id);
var usePan = () => {
  const { provides } = usePanCapability();
  const { provides: interactionManager } = (0, import_preact2.useInteractionManagerCapability)();
  const [isPanning, setIsPanning] = (0, import_hooks.useState)(false);
  (0, import_hooks.useEffect)(() => {
    if (!interactionManager) return;
    return interactionManager.onStateChange((state) => {
      setIsPanning(state.activeMode === "panMode");
    });
  }, [interactionManager]);
  return {
    provides,
    isPanning
  };
};

// src/preact/components/pan-mode.tsx
var import_hooks2 = require("preact/hooks");
var import_preact3 = require("@embedpdf/plugin-interaction-manager/preact");
var import_preact4 = require("@embedpdf/plugin-viewport/preact");
var import_jsx_runtime = require("preact/jsx-runtime");
var PanMode = () => {
  const { register } = (0, import_preact3.usePointerHandlers)({ modeId: "panMode" });
  const { setCursor, removeCursor } = (0, import_preact3.useCursor)();
  const { provides: viewport } = (0, import_preact4.useViewportCapability)();
  const dragRef = (0, import_hooks2.useRef)(null);
  const handlers = (0, import_hooks2.useMemo)(
    () => ({
      onPointerDown: (_, pe) => {
        if (!viewport) return;
        const metrics = viewport.getMetrics();
        dragRef.current = {
          startX: pe.clientX,
          startY: pe.clientY,
          startLeft: metrics.scrollLeft,
          startTop: metrics.scrollTop
        };
        setCursor("panMode", "grabbing", 10);
      },
      onPointerMove: (_, pe) => {
        const drag = dragRef.current;
        if (!drag || !viewport) return;
        const dx = pe.clientX - drag.startX;
        const dy = pe.clientY - drag.startY;
        viewport.scrollTo({
          x: drag.startLeft - dx,
          y: drag.startTop - dy
        });
      },
      onPointerUp: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      },
      onPointerLeave: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      },
      onPointerCancel: () => {
        const drag = dragRef.current;
        if (!drag) return;
        dragRef.current = null;
        removeCursor("panMode");
      }
    }),
    [viewport, setCursor, removeCursor]
  );
  (0, import_hooks2.useEffect)(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PanMode,
  usePan,
  usePanCapability,
  usePanPlugin
});
//# sourceMappingURL=index.cjs.map