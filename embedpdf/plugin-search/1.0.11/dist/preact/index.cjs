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
  SearchLayer: () => SearchLayer,
  useSearch: () => useSearch,
  useSearchCapability: () => useSearchCapability,
  useSearchPlugin: () => useSearchPlugin
});
module.exports = __toCommonJS(preact_exports);

// src/preact/hooks/use-search.ts
var import_preact = require("@embedpdf/core/preact");
var import_plugin_search = require("@embedpdf/plugin-search");
var import_hooks = require("preact/hooks");
var useSearchPlugin = () => (0, import_preact.usePlugin)(import_plugin_search.SearchPlugin.id);
var useSearchCapability = () => (0, import_preact.useCapability)(import_plugin_search.SearchPlugin.id);
var useSearch = () => {
  const { provides } = useSearchCapability();
  const [searchState, setSearchState] = (0, import_hooks.useState)({
    flags: [],
    results: [],
    total: 0,
    activeResultIndex: 0,
    showAllResults: true,
    query: "",
    loading: false,
    active: false
  });
  (0, import_hooks.useEffect)(() => {
    return provides?.onStateChange((state) => setSearchState(state));
  }, [provides]);
  return {
    state: searchState,
    provides
  };
};

// src/preact/components/search-layer.tsx
var import_hooks2 = require("preact/hooks");
var import_jsx_runtime = require("preact/jsx-runtime");
function SearchLayer({
  pageIndex,
  scale,
  style,
  highlightColor = "#FFFF00",
  activeHighlightColor = "#FFBF00",
  ...props
}) {
  const { provides: searchProvides } = useSearchCapability();
  const [searchResultState, setSearchResultState] = (0, import_hooks2.useState)(null);
  (0, import_hooks2.useEffect)(() => {
    return searchProvides?.onSearchResultStateChange((state) => {
      setSearchResultState(state);
    });
  }, [searchProvides]);
  if (!searchResultState) {
    return null;
  }
  const pageResults = searchResultState.results.map((result, originalIndex) => ({ result, originalIndex })).filter(({ result }) => result.pageIndex === pageIndex);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      style: {
        ...style
      },
      ...props,
      children: pageResults.map(
        ({ result, originalIndex }) => result.rects.map((rect) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              position: "absolute",
              top: rect.origin.y * scale,
              left: rect.origin.x * scale,
              width: rect.size.width * scale,
              height: rect.size.height * scale,
              backgroundColor: originalIndex === searchResultState.activeResultIndex ? activeHighlightColor : highlightColor,
              mixBlendMode: "multiply",
              transform: "scale(1.02)",
              transformOrigin: "center",
              transition: "opacity .3s ease-in-out",
              opacity: 1
            }
          }
        ))
      )
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SearchLayer,
  useSearch,
  useSearchCapability,
  useSearchPlugin
});
//# sourceMappingURL=index.cjs.map