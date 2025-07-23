// src/lib/manifest.ts
var PRINT_PLUGIN_ID = "print";
var manifest = {
  id: PRINT_PLUGIN_ID,
  name: "Print Plugin",
  version: "1.0.0",
  provides: ["print"],
  requires: ["render"],
  optional: [],
  defaultConfig: {
    enabled: true
  }
};

// src/lib/print-plugin.ts
import { BasePlugin } from "@embedpdf/core";

// ../plugin-render/dist/index.js
import { BasePlugin as f } from "@embedpdf/core";

// ../models/dist/index.js
var Rotation = /* @__PURE__ */ ((Rotation2) => {
  Rotation2[Rotation2["Degree0"] = 0] = "Degree0";
  Rotation2[Rotation2["Degree90"] = 1] = "Degree90";
  Rotation2[Rotation2["Degree180"] = 2] = "Degree180";
  Rotation2[Rotation2["Degree270"] = 3] = "Degree270";
  return Rotation2;
})(Rotation || {});
var PdfSoftHyphenMarker = "\xAD";
var PdfZeroWidthSpace = "\u200B";
var PdfWordJoiner = "\u2060";
var PdfBomOrZwnbsp = "\uFEFF";
var PdfNonCharacterFFFE = "\uFFFE";
var PdfNonCharacterFFFF = "\uFFFF";
var PdfUnwantedTextMarkers = Object.freeze([
  PdfSoftHyphenMarker,
  PdfZeroWidthSpace,
  PdfWordJoiner,
  PdfBomOrZwnbsp,
  PdfNonCharacterFFFE,
  PdfNonCharacterFFFF
]);
var PdfUnwantedTextRegex = new RegExp(`[${PdfUnwantedTextMarkers.join("")}]`, "g");
var MixedBlendMode = Symbol("mixed");
var BLEND_MODE_INFOS = Object.freeze([
  { id: 0, label: "Normal", css: "normal" },
  { id: 1, label: "Multiply", css: "multiply" },
  { id: 2, label: "Screen", css: "screen" },
  { id: 3, label: "Overlay", css: "overlay" },
  { id: 4, label: "Darken", css: "darken" },
  { id: 5, label: "Lighten", css: "lighten" },
  { id: 6, label: "Color Dodge", css: "color-dodge" },
  { id: 7, label: "Color Burn", css: "color-burn" },
  { id: 8, label: "Hard Light", css: "hard-light" },
  { id: 9, label: "Soft Light", css: "soft-light" },
  { id: 10, label: "Difference", css: "difference" },
  { id: 11, label: "Exclusion", css: "exclusion" },
  { id: 12, label: "Hue", css: "hue" },
  { id: 13, label: "Saturation", css: "saturation" },
  { id: 14, label: "Color", css: "color" },
  { id: 15, label: "Luminosity", css: "luminosity" }
]);
var enumToInfo = BLEND_MODE_INFOS.reduce(
  (m, info) => {
    m[info.id] = info;
    return m;
  },
  {}
);
var cssToEnum = BLEND_MODE_INFOS.reduce((m, info) => {
  m[info.css] = info.id;
  return m;
}, {});
var blendModeSelectOptions = BLEND_MODE_INFOS.map((info) => ({
  value: info.id,
  label: info.label
}));
var PdfAnnotationFlagName = Object.freeze({
  [
    1
    /* INVISIBLE */
  ]: "invisible",
  [
    2
    /* HIDDEN */
  ]: "hidden",
  [
    4
    /* PRINT */
  ]: "print",
  [
    8
    /* NO_ZOOM */
  ]: "noZoom",
  [
    16
    /* NO_ROTATE */
  ]: "noRotate",
  [
    32
    /* NO_VIEW */
  ]: "noView",
  [
    64
    /* READ_ONLY */
  ]: "readOnly",
  [
    128
    /* LOCKED */
  ]: "locked",
  [
    256
    /* TOGGLE_NOVIEW */
  ]: "toggleNoView"
});
var PdfAnnotationFlagValue = Object.entries(
  PdfAnnotationFlagName
).reduce(
  (acc, [bit, name]) => {
    acc[name] = Number(bit);
    return acc;
  },
  {}
);

// ../plugin-render/dist/index.js
var g = class g2 extends f {
  constructor(e, n, r) {
    super(e, n), this.engine = r;
  }
  async initialize(e) {
  }
  buildCapability() {
    return {
      renderPage: this.renderPage.bind(this),
      renderPageRect: this.renderPageRect.bind(this)
    };
  }
  renderPage({
    pageIndex: e,
    scaleFactor: n = 1,
    dpr: r = 1,
    rotation: a = Rotation.Degree0,
    options: s = { withAnnotations: false },
    imageType: d = "image/webp"
  }) {
    const o = this.coreState.core;
    if (!o.document)
      throw new Error("document does not open");
    const t = o.document.pages.find((i) => i.index === e);
    if (!t)
      throw new Error("page does not exist");
    return this.engine.renderPage(
      o.document,
      t,
      n,
      a,
      r,
      s,
      d
    );
  }
  renderPageRect({
    pageIndex: e,
    scaleFactor: n = 1,
    dpr: r = 1,
    rect: a,
    rotation: s = Rotation.Degree0,
    options: d = { withAnnotations: false },
    imageType: o = "image/webp"
  }) {
    const t = this.coreState.core;
    if (!t.document)
      throw new Error("document does not open");
    const i = t.document.pages.find((m) => m.index === e);
    if (!i)
      throw new Error("page does not exist");
    return this.engine.renderPageRect(
      t.document,
      i,
      n,
      s,
      r,
      a,
      d,
      o
    );
  }
};
g.id = "render";
var c = g;

// src/lib/types.ts
var PrintQuality = /* @__PURE__ */ ((PrintQuality2) => {
  PrintQuality2["Normal"] = "normal";
  PrintQuality2["High"] = "high";
  return PrintQuality2;
})(PrintQuality || {});
var PageRangeType = /* @__PURE__ */ ((PageRangeType2) => {
  PageRangeType2["Current"] = "current";
  PageRangeType2["All"] = "all";
  PageRangeType2["Custom"] = "custom";
  return PageRangeType2;
})(PageRangeType || {});

// src/lib/print-plugin.ts
var PrintPlugin = class extends BasePlugin {
  constructor(id, registry, config) {
    super(id, registry);
    this.config = config;
    this.renderCapability = this.registry.getPlugin(c.id)?.provides();
  }
  async initialize(_config) {
  }
  buildCapability() {
    return {
      preparePrint: this.preparePrint.bind(this),
      parsePageRange: this.parsePageRange.bind(this)
    };
  }
  async preparePrint(options, onProgress, onPageReady) {
    const coreState = this.coreState.core;
    if (!coreState.document) {
      throw new Error("No document loaded");
    }
    const pagesToPrint = this.getPagesToPrint(options, coreState.document.pages.length);
    const totalPages = pagesToPrint.length;
    const batchSize = this.config?.batchSize || 3;
    onProgress?.({
      current: 0,
      total: totalPages,
      status: "preparing",
      message: `Preparing to render ${totalPages} page${totalPages !== 1 ? "s" : ""}...`
    });
    const scaleFactor = this.getScaleFactor(options.quality);
    const dpr = 1;
    for (let batchStart = 0; batchStart < pagesToPrint.length; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize, pagesToPrint.length);
      const batch = pagesToPrint.slice(batchStart, batchEnd);
      const batchPromises = batch.map(async (pageIndex, batchIndex) => {
        const overallIndex = batchStart + batchIndex;
        onProgress?.({
          current: overallIndex,
          total: totalPages,
          status: "rendering",
          message: `Rendering page ${pageIndex + 1}...`
        });
        const blob = await this.renderPage(pageIndex, scaleFactor, dpr, options.includeAnnotations);
        onPageReady?.({
          pageIndex,
          blob
        });
        return;
      });
      await Promise.all(batchPromises);
    }
    onProgress?.({
      current: totalPages,
      total: totalPages,
      status: "complete",
      message: "All pages rendered successfully"
    });
  }
  async renderPage(pageIndex, scaleFactor, dpr, withAnnotations) {
    return new Promise((resolve, reject) => {
      const renderTask = this.renderCapability.renderPage({
        pageIndex,
        scaleFactor,
        dpr,
        rotation: Rotation.Degree0,
        options: {
          withAnnotations
        }
      });
      renderTask.wait(
        (blob) => resolve(blob),
        (error) => reject(
          new Error(
            `Failed to render page ${pageIndex + 1}: ${error.reason.message || "Unknown error"}`
          )
        )
      );
    });
  }
  getScaleFactor(quality) {
    switch (quality) {
      case "high" /* High */:
        return 1.5;
      // Higher resolution for better print quality
      case "normal" /* Normal */:
      default:
        return 1;
    }
  }
  getPagesToPrint(options, totalPages) {
    const { pageRange } = options;
    switch (pageRange.type) {
      case "current" /* Current */:
        return pageRange.currentPage !== void 0 ? [pageRange.currentPage] : [0];
      case "all" /* All */:
        return Array.from({ length: totalPages }, (_, i) => i);
      case "custom" /* Custom */:
        if (!pageRange.pages) return [0];
        return pageRange.pages.filter((page) => page >= 0 && page < totalPages).sort((a, b) => a - b);
      default:
        return [0];
    }
  }
  parsePageRange(rangeString) {
    try {
      const totalPages = this.coreState.core.document?.pages.length || 0;
      const pages = [];
      const parts = rangeString.split(",").map((s) => s.trim());
      for (const part of parts) {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map((s) => parseInt(s.trim()));
          if (isNaN(start) || isNaN(end)) {
            return { pages: [], isValid: false, error: `Invalid range: ${part}` };
          }
          if (start > end) {
            return { pages: [], isValid: false, error: `Invalid range: ${part} (start > end)` };
          }
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) {
              pages.push(i - 1);
            }
          }
        } else {
          const pageNum = parseInt(part);
          if (isNaN(pageNum)) {
            return { pages: [], isValid: false, error: `Invalid page number: ${part}` };
          }
          if (pageNum >= 1 && pageNum <= totalPages) {
            pages.push(pageNum - 1);
          }
        }
      }
      const uniquePages = [...new Set(pages)].sort((a, b) => a - b);
      return {
        pages: uniquePages,
        isValid: true
      };
    } catch (error) {
      return {
        pages: [],
        isValid: false,
        error: `Parsing error: ${error instanceof Error ? error.message : "Unknown error"}`
      };
    }
  }
};
PrintPlugin.id = "print";

// src/lib/index.ts
var PrintPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new PrintPlugin(PRINT_PLUGIN_ID, registry, config),
  reducer: () => {
  },
  initialState: {}
};
export {
  PRINT_PLUGIN_ID,
  PageRangeType,
  PrintPlugin,
  PrintPluginPackage,
  PrintQuality,
  manifest
};
//# sourceMappingURL=index.js.map