// src/preact/hooks/use-ui.ts
import { useCapability, usePlugin } from "@embedpdf/core/preact";
import { UIPlugin } from "@embedpdf/plugin-ui";
var useUIPlugin = () => usePlugin(UIPlugin.id);
var useUICapability = () => useCapability(UIPlugin.id);

// src/preact/hooks/use-icon.ts
function useIcon() {
  const { provides: uiProvides } = useUICapability();
  if (!uiProvides) {
    throw new Error("useIcon must be used within a UI context");
  }
  const {
    registerIcon,
    registerIcons,
    getIcon,
    getAllIcons,
    getSvgString,
    isSvgString,
    isSvgDataUri,
    dataUriToSvgString,
    svgStringToDataUri
  } = uiProvides;
  return {
    registerIcon,
    registerIcons,
    getIcon,
    getAllIcons,
    getSvgString,
    isSvgString,
    isSvgDataUri,
    dataUriToSvgString,
    svgStringToDataUri
  };
}

// src/preact/components/component-wrapper.tsx
import { useState, useEffect } from "preact/hooks";
import { jsx } from "react/jsx-runtime";
function ComponentWrapper({
  component,
  parentContext = {}
}) {
  const [_, forceUpdate] = useState({});
  useEffect(() => {
    const updateCallback = () => forceUpdate({});
    if (component.onUpdate(updateCallback)) {
      forceUpdate({});
    }
    return () => component.offUpdate(updateCallback);
  }, [component]);
  const childContext = component.getChildContext(parentContext);
  const renderer = component.getRenderer();
  if (!renderer) {
    throw new Error(`No renderer for type: ${component.getRenderType}`);
  }
  function renderChildrenFn(options) {
    const merged = options?.context ? { ...childContext, ...options.context } : childContext;
    return component.getChildren().filter(({ id }) => {
      return !options?.filter || options.filter(id);
    }).map(
      ({ component: child, id, className }) => className ? /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(ComponentWrapper, { component: child, parentContext: merged }, id) }) : /* @__PURE__ */ jsx(ComponentWrapper, { component: child, parentContext: merged }, id)
    );
  }
  return renderer(component.props, renderChildrenFn, childContext);
}

// src/preact/components/plugin-ui-provider.tsx
import { jsx as jsx2 } from "preact/jsx-runtime";
function PluginUIProvider({ children }) {
  const { provides: uiProvides } = useUICapability();
  const wrapComponents = (components) => {
    return components.map((component) => /* @__PURE__ */ jsx2(ComponentWrapper, { component }, component.props.id));
  };
  const componentMap = {
    headers: {
      top: wrapComponents(uiProvides?.getHeadersByPlacement("top") || []),
      bottom: wrapComponents(uiProvides?.getHeadersByPlacement("bottom") || []),
      left: wrapComponents(uiProvides?.getHeadersByPlacement("left") || []),
      right: wrapComponents(uiProvides?.getHeadersByPlacement("right") || [])
    },
    panels: {
      left: wrapComponents(uiProvides?.getPanelsByLocation("left") || []),
      right: wrapComponents(uiProvides?.getPanelsByLocation("right") || [])
    },
    floating: {
      insideScroller: wrapComponents(uiProvides?.getFloatingComponents("inside") || []),
      outsideScroller: wrapComponents(uiProvides?.getFloatingComponents("outside") || [])
    },
    commandMenu: uiProvides?.getCommandMenu() ? /* @__PURE__ */ jsx2(ComponentWrapper, { component: uiProvides.getCommandMenu() }) : null
  };
  return children(componentMap);
}
export {
  PluginUIProvider,
  useIcon,
  useUICapability,
  useUIPlugin
};
//# sourceMappingURL=index.js.map