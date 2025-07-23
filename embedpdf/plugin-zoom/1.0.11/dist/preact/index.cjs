"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/preact/index.ts
var preact_exports = {};
__export(preact_exports, {
  MarqueeZoom: () => MarqueeZoom,
  PinchWrapper: () => PinchWrapper,
  usePinch: () => usePinch,
  useZoom: () => useZoom,
  useZoomCapability: () => useZoomCapability,
  useZoomPlugin: () => useZoomPlugin
});
module.exports = __toCommonJS(preact_exports);

// src/preact/hooks/use-zoom.ts
var import_preact = require("@embedpdf/core/preact");
var import_plugin_zoom = require("@embedpdf/plugin-zoom");
var import_hooks = require("preact/hooks");
var useZoomCapability = () => (0, import_preact.useCapability)(import_plugin_zoom.ZoomPlugin.id);
var useZoomPlugin = () => (0, import_preact.usePlugin)(import_plugin_zoom.ZoomPlugin.id);
var useZoom = () => {
  const { provides } = useZoomCapability();
  const [state, setState] = (0, import_hooks.useState)(import_plugin_zoom.initialState);
  (0, import_hooks.useEffect)(() => {
    return provides?.onStateChange((action) => {
      setState(action);
    });
  }, [provides]);
  return {
    state,
    provides
  };
};

// src/preact/hooks/use-pinch-zoom.ts
var import_hooks2 = require("preact/hooks");
var import_preact2 = require("@embedpdf/core/preact");
function usePinch() {
  const { provides: viewportProvides } = (0, import_preact2.useCapability)("viewport");
  const { provides: zoomProvides } = useZoomCapability();
  const elementRef = (0, import_hooks2.useRef)(null);
  (0, import_hooks2.useEffect)(() => {
    const element = elementRef.current;
    if (!element || !viewportProvides || !zoomProvides) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    let hammer;
    let initialZoom = 0;
    let lastCenter = { x: 0, y: 0 };
    const getState = () => zoomProvides.getState();
    const updateTransform = (scale) => {
      element.style.transform = `scale(${scale})`;
    };
    const resetTransform = () => {
      element.style.transform = "none";
      element.style.transformOrigin = "0 0";
    };
    const pinchStart = (e) => {
      initialZoom = getState().currentZoomLevel;
      const contRect = viewportProvides.getBoundingRect();
      lastCenter = {
        x: e.center.x - contRect.origin.x,
        y: e.center.y - contRect.origin.y
      };
      const innerRect = element.getBoundingClientRect();
      element.style.transformOrigin = `${e.center.x - innerRect.left}px ${e.center.y - innerRect.top}px`;
      if (e.srcEvent?.cancelable) {
        e.srcEvent.preventDefault();
        e.srcEvent.stopPropagation();
      }
    };
    const pinchMove = (e) => {
      updateTransform(e.scale);
      if (e.srcEvent?.cancelable) {
        e.srcEvent.preventDefault();
        e.srcEvent.stopPropagation();
      }
    };
    const pinchEnd = (e) => {
      const delta = (e.scale - 1) * initialZoom;
      zoomProvides.requestZoomBy(delta, { vx: lastCenter.x, vy: lastCenter.y });
      resetTransform();
      initialZoom = 0;
    };
    const setupHammer = async () => {
      try {
        const Hammer = (await import("hammerjs")).default;
        const inputClass = (() => {
          const MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
          const SUPPORT_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0;
          const SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
          if (SUPPORT_ONLY_TOUCH) return Hammer.TouchInput;
          if (!SUPPORT_TOUCH) return Hammer.MouseInput;
          return Hammer.TouchMouseInput;
        })();
        hammer = new Hammer(element, {
          touchAction: "pan-x pan-y",
          // allow scroll in every direction
          inputClass
        });
        hammer.get("pinch").set({ enable: true, pointers: 2, threshold: 0.1 });
        hammer.on("pinchstart", pinchStart);
        hammer.on("pinchmove", pinchMove);
        hammer.on("pinchend", pinchEnd);
      } catch (error) {
        console.warn("Failed to load HammerJS:", error);
      }
    };
    setupHammer();
    return () => {
      hammer?.destroy();
      resetTransform();
    };
  }, [viewportProvides, zoomProvides]);
  return { elementRef };
}

// src/preact/components/pinch-wrapper.tsx
var import_jsx_runtime = require("preact/jsx-runtime");
function PinchWrapper({ children, style, ...props }) {
  const { elementRef } = usePinch();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: elementRef,
      ...props,
      style: {
        ...style,
        display: "block",
        width: "fit-content",
        overflow: "visible",
        boxSizing: "border-box",
        margin: "0px auto"
      },
      children
    }
  );
}

// src/preact/components/marquee-zoom.tsx
var import_hooks4 = require("preact/hooks");
var import_preact3 = require("@embedpdf/plugin-interaction-manager/preact");
var import_jsx_runtime2 = require("preact/jsx-runtime");
var MarqueeZoom = ({
  pageIndex,
  scale,
  pageWidth,
  pageHeight,
  className,
  stroke = "rgba(33,150,243,0.8)",
  fill = "rgba(33,150,243,0.15)"
}) => {
  const { provides: zoom } = useZoomCapability();
  const { register } = (0, import_preact3.usePointerHandlers)({ modeId: "marqueeZoom", pageIndex });
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const startRef = (0, import_hooks4.useRef)(null);
  const [rect, setRect] = (0, import_hooks4.useState)(null);
  const pageWidthPDF = pageWidth / scale;
  const pageHeightPDF = pageHeight / scale;
  const handlers = (0, import_hooks4.useMemo)(
    () => ({
      onPointerDown: (pos, evt) => {
        startRef.current = pos;
        setRect({ origin: { x: pos.x, y: pos.y }, size: { width: 0, height: 0 } });
        evt.target?.setPointerCapture?.(evt.pointerId);
      },
      onPointerMove: (pos) => {
        if (!startRef.current) return;
        const curX = clamp(pos.x, 0, pageWidthPDF);
        const curY = clamp(pos.y, 0, pageHeightPDF);
        const { x: sx, y: sy } = startRef.current;
        const left = Math.min(sx, curX);
        const top = Math.min(sy, curY);
        const width = Math.abs(curX - sx);
        const height = Math.abs(curY - sy);
        setRect({ origin: { x: left, y: top }, size: { width, height } });
      },
      onPointerUp: (_, evt) => {
        if (rect && zoom) {
          const dragPx = Math.max(rect.size.width, rect.size.height) * scale;
          if (dragPx > 5) {
            zoom.zoomToArea(pageIndex, rect);
          } else {
            zoom.zoomIn();
          }
        }
        startRef.current = null;
        setRect(null);
        evt.target?.releasePointerCapture?.(evt.pointerId);
      },
      onPointerCancel: (_, evt) => {
        startRef.current = null;
        setRect(null);
        evt.target?.releasePointerCapture?.(evt.pointerId);
      }
    }),
    [pageWidthPDF, pageWidthPDF, zoom, scale, rect, pageIndex]
  );
  (0, import_hooks4.useEffect)(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  if (!rect) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      style: {
        position: "absolute",
        pointerEvents: "none",
        // ignore hits – underlying page still gets events
        left: rect.origin.x * scale,
        top: rect.origin.y * scale,
        width: rect.size.width * scale,
        height: rect.size.height * scale,
        border: `1px solid ${stroke}`,
        background: fill,
        boxSizing: "border-box"
      },
      className
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarqueeZoom,
  PinchWrapper,
  usePinch,
  useZoom,
  useZoomCapability,
  useZoomPlugin
});
//# sourceMappingURL=index.cjs.map