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
  SearchLayer: () => SearchLayer,
  useSearch: () => useSearch,
  useSearchCapability: () => useSearchCapability,
  useSearchPlugin: () => useSearchPlugin
});
module.exports = __toCommonJS(react_exports);

// src/react/hooks/use-search.ts
var import_react = require("@embedpdf/core/react");
var import_plugin_search = require("@embedpdf/plugin-search");
var import_react2 = require("react");
var useSearchPlugin = () => (0, import_react.usePlugin)(import_plugin_search.SearchPlugin.id);
var useSearchCapability = () => (0, import_react.useCapability)(import_plugin_search.SearchPlugin.id);
var useSearch = () => {
  const { provides } = useSearchCapability();
  const [searchState, setSearchState] = (0, import_react2.useState)({
    flags: [],
    results: [],
    total: 0,
    activeResultIndex: 0,
    showAllResults: true,
    query: "",
    loading: false,
    active: false
  });
  (0, import_react2.useEffect)(() => {
    return provides?.onStateChange((state) => setSearchState(state));
  }, [provides]);
  return {
    state: searchState,
    provides
  };
};

// src/react/components/search-layer.tsx
var import_react3 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function SearchLayer({
  pageIndex,
  scale,
  style,
  highlightColor = "#FFFF00",
  activeHighlightColor = "#FFBF00",
  ...props
}) {
  const { provides: searchProvides } = useSearchCapability();
  const [searchResultState, setSearchResultState] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
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