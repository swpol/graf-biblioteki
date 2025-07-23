// src/preact/hooks/use-print.ts
import { useCapability, usePlugin } from "@embedpdf/core/preact";
import { PrintPlugin } from "@embedpdf/plugin-print";
var usePrintPlugin = () => usePlugin(PrintPlugin.id);
var usePrintCapability = () => useCapability(PrintPlugin.id);

// src/preact/components/print.tsx
import { createContext, render } from "preact";
import { useContext, useRef, useEffect, useState } from "preact/hooks";
import { jsx, jsxs } from "preact/jsx-runtime";
var PrintContext = createContext(null);
var PrintPage = ({ pageResult }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("style", { children: `
        @media print {
          body { margin: 0; padding: 0; }
        }
      ` }),
        pages.map((pageResult) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PrintPage, { pageResult }) }, pageResult.pageIndex))
      ]
    }
  );
};
function PrintProvider({ children }) {
  const { provides: printCapability } = usePrintCapability();
  const iframeRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pages, setPages] = useState([]);
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
  useEffect(() => {
    const iframe = iframeRef.current;
    const mountNode = iframe?.contentWindow?.document?.body;
    if (mountNode && pages.length > 0) {
      render(/* @__PURE__ */ jsx(PrintLayout, { pages }), mountNode);
      setIsReady(true);
      return () => {
        if (mountNode) {
          render(null, mountNode);
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
  return /* @__PURE__ */ jsxs(PrintContext.Provider, { value: contextValue, children: [
    children,
    /* @__PURE__ */ jsx(
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
  const context = useContext(PrintContext);
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
export {
  PrintProvider,
  usePrintAction,
  usePrintCapability,
  usePrintContext,
  usePrintPlugin
};
//# sourceMappingURL=index.js.map