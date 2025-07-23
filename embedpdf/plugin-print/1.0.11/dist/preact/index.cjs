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
  PrintProvider: () => PrintProvider,
  usePrintAction: () => usePrintAction,
  usePrintCapability: () => usePrintCapability,
  usePrintContext: () => usePrintContext,
  usePrintPlugin: () => usePrintPlugin
});
module.exports = __toCommonJS(preact_exports);

// src/preact/hooks/use-print.ts
var import_preact = require("@embedpdf/core/preact");
var import_plugin_print = require("@embedpdf/plugin-print");
var usePrintPlugin = () => (0, import_preact.usePlugin)(import_plugin_print.PrintPlugin.id);
var usePrintCapability = () => (0, import_preact.useCapability)(import_plugin_print.PrintPlugin.id);

// src/preact/components/print.tsx
var import_preact2 = require("preact");
var import_hooks = require("preact/hooks");
var import_jsx_runtime = require("preact/jsx-runtime");
var PrintContext = (0, import_preact2.createContext)(null);
var PrintPage = ({ pageResult }) => {
  const [imageUrl, setImageUrl] = (0, import_hooks.useState)("");
  (0, import_hooks.useEffect)(() => {
    const url = URL.createObjectURL(pageResult.blob);
    setImageUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [pageResult.blob]);
  const handleLoad = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      style: {
        pageBreakAfter: "always",
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        background: "white",
        position: "relative"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "img",
        {
          src: imageUrl,
          onLoad: handleLoad,
          alt: `Page ${pageResult.pageIndex + 1}`,
          style: {
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain"
          }
        }
      )
    }
  );
};
var PrintLayout = ({ pages }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.4",
        color: "#000",
        backgroundColor: "#fff"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @media print {
          body { margin: 0; padding: 0; }
        }
      ` }),
        pages.map((pageResult) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintPage, { pageResult }) }, pageResult.pageIndex))
      ]
    }
  );
};
function PrintProvider({ children }) {
  const { provides: printCapability } = usePrintCapability();
  const iframeRef = (0, import_hooks.useRef)(null);
  const [progress, setProgress] = (0, import_hooks.useState)(null);
  const [isReady, setIsReady] = (0, import_hooks.useState)(false);
  const [isPrinting, setIsPrinting] = (0, import_hooks.useState)(false);
  const [pages, setPages] = (0, import_hooks.useState)([]);
  const executePrint = async (options) => {
    if (!printCapability) {
      throw new Error("Print capability not available");
    }
    if (!iframeRef.current?.contentWindow) {
      throw new Error("Print iframe not ready");
    }
    setIsPrinting(true);
    setProgress(null);
    setPages([]);
    setIsReady(false);
    try {
      const collectedPages = [];
      await printCapability.preparePrint(
        options,
        // Progress callback
        (progressUpdate) => {
          setProgress(progressUpdate);
        },
        // Page ready callback
        (pageResult) => {
          collectedPages.push(pageResult);
          setPages([...collectedPages]);
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      const printWindow = iframeRef.current.contentWindow;
      printWindow.focus();
      printWindow.print();
      setProgress({
        current: progress?.total || 0,
        total: progress?.total || 0,
        status: "complete",
        message: "Print dialog opened"
      });
    } catch (error) {
      setProgress({
        current: 0,
        total: 0,
        status: "error",
        message: `Print failed: ${error instanceof Error ? error.message : "Unknown error"}`
      });
      throw error;
    } finally {
      setIsPrinting(false);
    }
  };
  (0, import_hooks.useEffect)(() => {
    const iframe = iframeRef.current;
    const mountNode = iframe?.contentWindow?.document?.body;
    if (mountNode && pages.length > 0) {
      (0, import_preact2.render)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintLayout, { pages }), mountNode);
      setIsReady(true);
      return () => {
        if (mountNode) {
          (0, import_preact2.render)(null, mountNode);
        }
      };
    }
  }, [pages]);
  const contextValue = {
    parsePageRange: printCapability?.parsePageRange || (() => ({ pages: [], isValid: false })),
    executePrint,
    progress,
    isReady,
    isPrinting
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrintContext.Provider, { value: contextValue, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "iframe",
      {
        ref: iframeRef,
        style: {
          display: "none",
          width: "210mm",
          height: "297mm"
        },
        title: "Print Preview"
      }
    )
  ] });
}
function usePrintContext() {
  const context = (0, import_hooks.useContext)(PrintContext);
  if (!context) {
    throw new Error("usePrintContext must be used within a PrintProvider");
  }
  return context;
}

// src/preact/hooks/use-print-action.ts
var usePrintAction = () => {
  const { executePrint, progress, isReady, isPrinting, parsePageRange } = usePrintContext();
  return {
    executePrint,
    progress,
    isReady,
    isPrinting,
    parsePageRange
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrintProvider,
  usePrintAction,
  usePrintCapability,
  usePrintContext,
  usePrintPlugin
});
//# sourceMappingURL=index.cjs.map