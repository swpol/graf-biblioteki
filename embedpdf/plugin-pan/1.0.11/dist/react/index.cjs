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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  PanMode: () => PanMode,
  usePan: () => usePan,
  usePanCapability: () => usePanCapability,
  usePanPlugin: () => usePanPlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/hooks/use-pan.ts
var import_react = require("@embedpdf/core/react");
var import_react2 = require("@embedpdf/plugin-interaction-manager/react");
var import_plugin_pan = require("@embedpdf/plugin-pan");
var import_react3 = require("react");
var usePanPlugin = () => (0, import_react.usePlugin)(import_plugin_pan.PanPlugin.id);
var usePanCapability = () => (0, import_react.useCapability)(import_plugin_pan.PanPlugin.id);
var usePan = () => {
  const { provides } = usePanCapability();
  const { provides: interactionManager } = (0, import_react2.useInteractionManagerCapability)();
  const [isPanning, setIsPanning] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
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

// src/react/components/pan-mode.tsx
var import_react4 = require("react");
var import_react5 = require("@embedpdf/plugin-interaction-manager/react");
var import_react6 = require("@embedpdf/plugin-viewport/react");
var import_jsx_runtime = require("react/jsx-runtime");
var PanMode = () => {
  const { register } = (0, import_react5.usePointerHandlers)({ modeId: "panMode" });
  const { setCursor, removeCursor } = (0, import_react5.useCursor)();
  const { provides: viewport } = (0, import_react6.useViewportCapability)();
  const dragRef = (0, import_react4.useRef)(null);
  const handlers = (0, import_react4.useMemo)(
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
  (0, import_react4.useEffect)(() => {
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