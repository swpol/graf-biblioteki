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
  PluginUIProvider: () => PluginUIProvider,
  useIcon: () => useIcon,
  useUICapability: () => useUICapability,
  useUIPlugin: () => useUIPlugin
});
module.exports = __toCommonJS(preact_exports);

// src/preact/hooks/use-ui.ts
var import_preact = require("@embedpdf/core/preact");
var import_plugin_ui = require("@embedpdf/plugin-ui");
var useUIPlugin = () => (0, import_preact.usePlugin)(import_plugin_ui.UIPlugin.id);
var useUICapability = () => (0, import_preact.useCapability)(import_plugin_ui.UIPlugin.id);

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
var import_hooks = require("preact/hooks");
var import_jsx_runtime = require("react/jsx-runtime");
function ComponentWrapper({
  component,
  parentContext = {}
}) {
  const [_, forceUpdate] = (0, import_hooks.useState)({});
  (0, import_hooks.useEffect)(() => {
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
      ({ component: child, id, className }) => className ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentWrapper, { component: child, parentContext: merged }, id) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentWrapper, { component: child, parentContext: merged }, id)
    );
  }
  return renderer(component.props, renderChildrenFn, childContext);
}

// src/preact/components/plugin-ui-provider.tsx
var import_jsx_runtime2 = require("preact/jsx-runtime");
function PluginUIProvider({ children }) {
  const { provides: uiProvides } = useUICapability();
  const wrapComponents = (components) => {
    return components.map((component) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ComponentWrapper, { component }, component.props.id));
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
    commandMenu: uiProvides?.getCommandMenu() ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ComponentWrapper, { component: uiProvides.getCommandMenu() }) : null
  };
  return children(componentMap);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginUIProvider,
  useIcon,
  useUICapability,
  useUIPlugin
});
//# sourceMappingURL=index.cjs.map