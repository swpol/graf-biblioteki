// src/react/hooks/use-search.ts
import { useCapability, usePlugin } from "@embedpdf/core/react";
import { SearchPlugin } from "@embedpdf/plugin-search";
import { useEffect, useState } from "react";
var useSearchPlugin = () => usePlugin(SearchPlugin.id);
var useSearchCapability = () => useCapability(SearchPlugin.id);
var useSearch = () => {
  const { provides } = useSearchCapability();
  const [searchState, setSearchState] = useState({
    flags: [],
    results: [],
    total: 0,
    activeResultIndex: 0,
    showAllResults: true,
    query: "",
    loading: false,
    active: false
  });
  useEffect(() => {
    return provides?.onStateChange((state) => setSearchState(state));
  }, [provides]);
  return {
    state: searchState,
    provides
  };
};

// src/react/components/search-layer.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { jsx } from "react/jsx-runtime";
function SearchLayer({
  pageIndex,
  scale,
  style,
  highlightColor = "#FFFF00",
  activeHighlightColor = "#FFBF00",
  ...props
}) {
  const { provides: searchProvides } = useSearchCapability();
  const [searchResultState, setSearchResultState] = useState2(null);
  useEffect2(() => {
    return searchProvides?.onSearchResultStateChange((state) => {
      setSearchResultState(state);
    });
  }, [searchProvides]);
  if (!searchResultState) {
    return null;
  }
  const pageResults = searchResultState.results.map((result, originalIndex) => ({ result, originalIndex })).filter(({ result }) => result.pageIndex === pageIndex);
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        ...style
      },
      ...props,
      children: pageResults.map(
        ({ result, originalIndex }) => result.rects.map((rect) => /* @__PURE__ */ jsx(
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
export {
  SearchLayer,
  useSearch,
  useSearchCapability,
  useSearchPlugin
};
//# sourceMappingURL=index.js.map