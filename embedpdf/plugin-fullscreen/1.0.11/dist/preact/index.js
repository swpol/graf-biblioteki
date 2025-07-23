// src/preact/hooks/use-fullscreen.ts
import { useCapability, usePlugin } from "@embedpdf/core/preact";
import { FullscreenPlugin, initialState } from "@embedpdf/plugin-fullscreen";
import { useState, useEffect } from "preact/hooks";
var useFullscreenPlugin = () => usePlugin(FullscreenPlugin.id);
var useFullscreenCapability = () => useCapability(FullscreenPlugin.id);
var useFullscreen = () => {
  const { provides } = useFullscreenCapability();
  const [state, setState] = useState(initialState);
  useEffect(() => {
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
import { useEffect as useEffect2, useRef } from "preact/hooks";
import { jsx } from "preact/jsx-runtime";
function FullscreenProvider({ children, ...props }) {
  const { provides: fullscreenCapability } = useFullscreenCapability();
  const { plugin } = useFullscreenPlugin();
  const ref = useRef(null);
  useEffect2(() => {
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
  useEffect2(() => {
    if (!plugin) return;
    const handler = () => plugin.setFullscreenState(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [plugin]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      style: { position: "relative", width: "100%", height: "100%", ...props.style },
      ref,
      children
    }
  );
}
export {
  FullscreenProvider,
  useFullscreen,
  useFullscreenCapability,
  useFullscreenPlugin
};
//# sourceMappingURL=index.js.map