// src/preact/hooks/use-zoom.ts
import { useCapability, usePlugin } from "@embedpdf/core/preact";
import { initialState, ZoomPlugin } from "@embedpdf/plugin-zoom";
import { useEffect, useState } from "preact/hooks";
var useZoomCapability = () => useCapability(ZoomPlugin.id);
var useZoomPlugin = () => usePlugin(ZoomPlugin.id);
var useZoom = () => {
  const { provides } = useZoomCapability();
  const [state, setState] = useState(initialState);
  useEffect(() => {
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
import { useEffect as useEffect2, useRef } from "preact/hooks";
import { useCapability as useCapability2 } from "@embedpdf/core/preact";
function usePinch() {
  const { provides: viewportProvides } = useCapability2("viewport");
  const { provides: zoomProvides } = useZoomCapability();
  const elementRef = useRef(null);
  useEffect2(() => {
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
import { jsx } from "preact/jsx-runtime";
function PinchWrapper({ children, style, ...props }) {
  const { elementRef } = usePinch();
  return /* @__PURE__ */ jsx(
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
import { useEffect as useEffect3, useMemo, useRef as useRef2, useState as useState2 } from "preact/hooks";
import { usePointerHandlers } from "@embedpdf/plugin-interaction-manager/preact";
import { jsx as jsx2 } from "preact/jsx-runtime";
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
  const { register } = usePointerHandlers({ modeId: "marqueeZoom", pageIndex });
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const startRef = useRef2(null);
  const [rect, setRect] = useState2(null);
  const pageWidthPDF = pageWidth / scale;
  const pageHeightPDF = pageHeight / scale;
  const handlers = useMemo(
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
  useEffect3(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  if (!rect) return null;
  return /* @__PURE__ */ jsx2(
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
export {
  MarqueeZoom,
  PinchWrapper,
  usePinch,
  useZoom,
  useZoomCapability,
  useZoomPlugin
};
//# sourceMappingURL=index.js.map