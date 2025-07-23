// src/react/hooks/use-pan.ts
import { useCapability, usePlugin } from "@embedpdf/core/react";
import { useInteractionManagerCapability } from "@embedpdf/plugin-interaction-manager/react";
import { PanPlugin } from "@embedpdf/plugin-pan";
import { useEffect, useState } from "react";
var usePanPlugin = () => usePlugin(PanPlugin.id);
var usePanCapability = () => useCapability(PanPlugin.id);
var usePan = () => {
  const { provides } = usePanCapability();
  const { provides: interactionManager } = useInteractionManagerCapability();
  const [isPanning, setIsPanning] = useState(false);
  useEffect(() => {
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
import { useEffect as useEffect2, useMemo, useRef } from "react";
import { useCursor, usePointerHandlers } from "@embedpdf/plugin-interaction-manager/react";
import { useViewportCapability } from "@embedpdf/plugin-viewport/react";
import { Fragment, jsx } from "react/jsx-runtime";
var PanMode = () => {
  const { register } = usePointerHandlers({ modeId: "panMode" });
  const { setCursor, removeCursor } = useCursor();
  const { provides: viewport } = useViewportCapability();
  const dragRef = useRef(null);
  const handlers = useMemo(
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
  useEffect2(() => {
    if (!register) return;
    return register(handlers);
  }, [register, handlers]);
  return /* @__PURE__ */ jsx(Fragment, {});
};
export {
  PanMode,
  usePan,
  usePanCapability,
  usePanPlugin
};
//# sourceMappingURL=index.js.map