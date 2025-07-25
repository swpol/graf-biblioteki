// ../core/dist/preact/index.js
import { createContext as b } from "preact";

// ../core/dist/jsxRuntime.module-Bzuv3cXw.js
import { options as i } from "preact";

// ../core/dist/preact/index.js
import { useState as a, useRef as m, useEffect as f, useContext as S } from "preact/hooks";

// ../core/dist/math-ChSRQF3r.js
var z = "\xAD";
var M = "\u200B";
var L = "\u2060";
var $ = "\uFEFF";
var F = "\uFFFE";
var N = "\uFFFF";
var k = Object.freeze([
  z,
  M,
  L,
  $,
  F,
  N
]);
new RegExp(`[${k.join("")}]`, "g");
var P = Object.freeze([
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
P.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _ = Object.freeze({
  1: "invisible",
  2: "hidden",
  4: "print",
  8: "noZoom",
  16: "noRotate",
  32: "noView",
  64: "readOnly",
  128: "locked",
  256: "toggleNoView"
});
Object.entries(
  _
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);

// ../core/dist/preact/index.js
var P2 = b({
  registry: null,
  isInitializing: true,
  pluginsReady: false
});
function g() {
  const t2 = S(P2);
  if (t2 === void 0)
    throw new Error("useCapability must be used within a PDFContext.Provider");
  const { registry: r, isInitializing: e } = t2;
  if (e)
    return t2;
  if (r === null)
    throw new Error("PDF registry failed to initialize properly");
  return t2;
}
function h(t2) {
  const { registry: r } = g();
  if (r === null)
    return {
      plugin: null,
      isLoading: true,
      ready: new Promise(() => {
      })
    };
  const e = r.getPlugin(t2);
  if (!e)
    throw new Error(`Plugin ${t2} not found`);
  return {
    plugin: e,
    isLoading: false,
    ready: e.ready()
  };
}
function L2(t2) {
  const { plugin: r, isLoading: e, ready: i2 } = h(t2);
  if (!r)
    return {
      provides: null,
      isLoading: e,
      ready: i2
    };
  if (!r.provides)
    throw new Error(`Plugin ${t2} does not provide a capability`);
  return {
    provides: r.provides(),
    isLoading: e,
    ready: i2
  };
}

// dist/index.js
var z2 = "\xAD";
var M2 = "\u200B";
var L3 = "\u2060";
var $2 = "\uFEFF";
var F2 = "\uFFFE";
var N2 = "\uFFFF";
var k2 = Object.freeze([
  z2,
  M2,
  L3,
  $2,
  F2,
  N2
]);
new RegExp(`[${k2.join("")}]`, "g");
var P3 = Object.freeze([
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
P3.reduce(
  (i2, e) => (i2[e.id] = e, i2),
  {}
);
P3.reduce((i2, e) => (i2[e.css] = e.id, i2), {});
P3.map((i2) => ({
  value: i2.id,
  label: i2.label
}));
var _2 = Object.freeze({
  1: "invisible",
  2: "hidden",
  4: "print",
  8: "noZoom",
  16: "noRotate",
  32: "noView",
  64: "readOnly",
  128: "locked",
  256: "toggleNoView"
});
Object.entries(
  _2
).reduce(
  (i2, [e, t2]) => (i2[t2] = Number(e), i2),
  {}
);
function v2(i2, e, t2) {
  if (i2 === e)
    return true;
  if (i2 == null || e == null)
    return i2 === e;
  const r = typeof i2;
  if (r !== typeof e) return false;
  if (r === "object") {
    t2 || (t2 = /* @__PURE__ */ new Set());
    const n = x(i2, e);
    if (t2.has(n))
      return true;
    t2.add(n);
    const a2 = Array.isArray(i2), o = Array.isArray(e);
    return a2 && o ? U(i2, e, t2) : !a2 && !o ? B(i2, e, t2) : false;
  }
  return false;
}
function x(i2, e) {
  return `${S2(i2)}__${S2(e)}`;
}
var G = 0;
var d = /* @__PURE__ */ new WeakMap();
function S2(i2) {
  return d.has(i2) || d.set(i2, ++G), d.get(i2);
}
function U(i2, e, t2) {
  if (i2.length !== e.length) return false;
  const r = new Array(e.length).fill(false);
  e: for (let s = 0; s < i2.length; s++) {
    const n = i2[s];
    for (let a2 = 0; a2 < e.length; a2++)
      if (!r[a2] && v2(n, e[a2], t2)) {
        r[a2] = true;
        continue e;
      }
    return false;
  }
  return true;
}
function B(i2, e, t2) {
  const r = Object.keys(i2).sort(), s = Object.keys(e).sort();
  if (r.length !== s.length) return false;
  for (let n = 0; n < r.length; n++)
    if (r[n] !== s[n]) return false;
  for (const n of r) {
    const a2 = i2[n], o = e[n];
    if (!v2(a2, o, t2))
      return false;
  }
  return true;
}
var w2 = class {
  constructor(t2, e) {
    if (this.id = t2, this.registry = e, this.debouncedActions = {}, this.unsubscribeFromState = null, this.unsubscribeFromCoreStore = null, t2 !== this.constructor.id)
      throw new Error(
        `Plugin ID mismatch: ${t2} !== ${this.constructor.id}`
      );
    this.coreStore = this.registry.getStore(), this.pluginStore = this.coreStore.getPluginStore(this.id), this.unsubscribeFromState = this.pluginStore.subscribeToState((i2, s, c) => {
      this.onStoreUpdated(c, s);
    }), this.unsubscribeFromCoreStore = this.coreStore.subscribe((i2, s, c) => {
      this.onCoreStoreUpdated(c, s);
    }), this.readyPromise = new Promise((i2) => {
      this.readyResolve = i2;
    }), this.readyResolve();
  }
  provides() {
    if (!this._capability) {
      const t2 = this.buildCapability();
      this._capability = Object.freeze(t2);
    }
    return this._capability;
  }
  /**
   *  Get a copy of the current state
   */
  get state() {
    return this.pluginStore.getState();
  }
  /**
   *  Get a copy of the current core state
   */
  get coreState() {
    return this.coreStore.getState();
  }
  /**
   * @deprecated  use `this.state` Get a copy of the current state
   */
  getState() {
    return this.pluginStore.getState();
  }
  /**
   * @deprecated  use `this.coreState` Get a copy of the current core state
   */
  getCoreState() {
    return this.coreStore.getState();
  }
  /**
   * Core Dispatch
   */
  dispatchCoreAction(t2) {
    return this.coreStore.dispatchToCore(t2);
  }
  /**
   * Dispatch an action to all plugins
   */
  dispatchToAllPlugins(t2) {
    return this.coreStore.dispatch(t2);
  }
  /**
   * Dispatch an action
   */
  dispatch(t2) {
    return this.pluginStore.dispatch(t2);
  }
  /**
   * Dispatch an action with debouncing to prevent rapid repeated calls
   * @param action The action to dispatch
   * @param debounceTime Time in ms to debounce (default: 100ms)
   * @returns boolean indicating whether the action was dispatched or debounced
   */
  debouncedDispatch(t2, e = 100) {
    const i2 = Date.now(), s = this.debouncedActions[t2.type] || 0;
    return i2 - s >= e ? (this.debouncedActions[t2.type] = i2, this.dispatch(t2), true) : false;
  }
  /**
   * Subscribe to state changes
   */
  subscribe(t2) {
    return this.pluginStore.subscribeToState(t2);
  }
  /**
   * Subscribe to core store changes
   */
  subscribeToCoreStore(t2) {
    return this.coreStore.subscribe(t2);
  }
  /**
   * Called when the plugin store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onStoreUpdated(t2, e) {
  }
  /**
   * Called when the core store state is updated
   * @param oldState Previous state
   * @param newState New state
   */
  onCoreStoreUpdated(t2, e) {
  }
  /**
   * Cleanup method to be called when plugin is being destroyed
   */
  destroy() {
    this.unsubscribeFromState && (this.unsubscribeFromState(), this.unsubscribeFromState = null), this.unsubscribeFromCoreStore && (this.unsubscribeFromCoreStore(), this.unsubscribeFromCoreStore = null);
  }
  /**
   * Returns a promise that resolves when the plugin is ready
   */
  ready() {
    return this.readyPromise;
  }
  /**
   * Mark the plugin as ready
   */
  markReady() {
    this.readyResolve();
  }
  /**
   * Reset the ready state (useful for plugins that need to reinitialize)
   */
  resetReady() {
    this.readyPromise = new Promise((t2) => {
      this.readyResolve = t2;
    });
  }
};
var UIComponent = class {
  constructor(componentConfig, registry) {
    this.children = [];
    this.updateCallbacks = [];
    this.hadUpdateBeforeListeners = false;
    this.componentConfig = componentConfig;
    const props = componentConfig.props || {};
    if (typeof props === "function") {
      const initialProps = props(componentConfig.initialState);
      this.props = { ...initialProps, id: componentConfig.id };
    } else {
      this.props = { ...props, id: componentConfig.id };
    }
    this.type = componentConfig.type;
    this.registry = registry;
  }
  addChild(id, child, priority = 0, className) {
    this.children.push({ id, component: child, priority, className });
    this.sortChildren();
  }
  // Helper to sort children by priority
  sortChildren() {
    this.children.sort((a2, b2) => a2.priority - b2.priority);
  }
  removeChild(child) {
    this.children = this.children.filter((c) => c.component !== child);
  }
  clearChildren() {
    this.children = [];
  }
  get getRenderType() {
    return this.componentConfig.render || this.type;
  }
  getRenderer() {
    return this.registry[this.getRenderType];
  }
  getChildren() {
    return this.children;
  }
  // Optionally, a component can provide a function to extend the context for its children.
  // For instance, a header could supply a "direction" based on its position.
  getChildContext(context) {
    const childContextProp = this.componentConfig.getChildContext;
    if (typeof childContextProp === "function") {
      return { ...context, ...childContextProp(this.props) };
    } else if (childContextProp && typeof childContextProp === "object") {
      return { ...context, ...childContextProp };
    }
    return context;
  }
  update(newProps) {
    const { id, ...otherProps } = newProps;
    this.props = { ...this.props, ...otherProps };
    if (this.updateCallbacks.length === 0) {
      this.hadUpdateBeforeListeners = true;
    }
    this.notifyUpdate();
  }
  onUpdate(callback) {
    this.updateCallbacks.push(callback);
    return this.hadUpdateBeforeListeners;
  }
  offUpdate(callback) {
    this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback);
  }
  notifyUpdate() {
    this.updateCallbacks.forEach((cb) => cb());
  }
};
var UI_INIT_COMPONENTS = "UI_INIT_COMPONENTS";
var UI_SET_HEADER_VISIBLE = "UI_SET_HEADER_VISIBLE";
var UI_TOGGLE_PANEL = "UI_TOGGLE_PANEL";
var UI_SHOW_COMMAND_MENU = "UI_SHOW_COMMAND_MENU";
var UI_HIDE_COMMAND_MENU = "UI_HIDE_COMMAND_MENU";
var UI_UPDATE_COMPONENT_STATE = "UI_UPDATE_COMPONENT_STATE";
var uiInitComponents = (state) => ({
  type: UI_INIT_COMPONENTS,
  payload: state
});
var uiTogglePanel = (payload) => ({
  type: UI_TOGGLE_PANEL,
  payload
});
var uiSetHeaderVisible = (payload) => ({
  type: UI_SET_HEADER_VISIBLE,
  payload
});
var uiShowCommandMenu = (payload) => ({
  type: UI_SHOW_COMMAND_MENU,
  payload
});
var uiHideCommandMenu = (payload) => ({
  type: UI_HIDE_COMMAND_MENU,
  payload
});
var uiUpdateComponentState = (payload) => ({
  type: UI_UPDATE_COMPONENT_STATE,
  payload
});
var initialState = {
  panel: {},
  header: {},
  groupedItems: {},
  divider: {},
  iconButton: {},
  tabButton: {},
  selectButton: {},
  custom: {},
  floating: {},
  commandMenu: {}
};
function createEventController() {
  const eventMap = /* @__PURE__ */ new Map();
  return {
    emit(eventType, data) {
      const callbacks = eventMap.get(eventType);
      if (callbacks) {
        callbacks.forEach((callback) => callback(data));
      }
    },
    on(eventType, callback) {
      if (!eventMap.has(eventType)) {
        eventMap.set(eventType, /* @__PURE__ */ new Set());
      }
      const callbacks = eventMap.get(eventType);
      callbacks.add(callback);
      return () => this.off(eventType, callback);
    },
    off(eventType, callback) {
      const callbacks = eventMap.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          eventMap.delete(eventType);
        }
      }
    }
  };
}
function resolveMenuItem(item, state) {
  const dyn = (v22) => typeof v22 === "function" ? v22(state) : v22;
  if (item.type === "group") {
    return {
      ...item,
      label: dyn(item.label) ?? ""
    };
  }
  return {
    ...item,
    icon: dyn(item.icon) ?? "",
    label: dyn(item.label) ?? "",
    visible: dyn(item.visible) ?? true,
    active: dyn(item.active) ?? false,
    disabled: dyn(item.disabled) ?? false
  };
}
var _MenuManager = class _MenuManager2 {
  constructor(items = {}, pluginRegistry) {
    this.registry = {};
    this.shortcutMap = {};
    this.eventController = createEventController();
    this.pluginRegistry = pluginRegistry;
    this.registerItems(items);
    this.setupKeyboardListeners();
  }
  /**
   * Get the current state of the plugin registry
   */
  get state() {
    return this.pluginRegistry.getStore().getState();
  }
  /**
   * Register a single menu item
   */
  registerItem(item) {
    if (this.registry[item.id]) {
      console.warn(`Menu item with ID ${item.id} already exists and will be overwritten`);
    }
    this.registry[item.id] = item;
    if ("shortcut" in item && item.shortcut) {
      this.shortcutMap[this.normalizeShortcut(item.shortcut)] = item.id;
    }
  }
  /**
   * Register multiple menu items at once
   */
  registerItems(items) {
    Object.values(items).forEach((item) => {
      this.registerItem(item);
    });
  }
  /**
   * Resolve a menu item by ID
   */
  resolve(id) {
    const raw = this.registry[id];
    return resolveMenuItem(raw, this.state);
  }
  /**
   * Get a menu item by ID with type information
   */
  getMenuItem(id) {
    const item = this.resolve(id);
    if (!item) return void 0;
    return {
      item,
      isGroup: item.type === "group",
      isMenu: item.type === "menu",
      isAction: item.type === "action"
    };
  }
  /**
   * Get a action by ID (only returns Action type items)
   */
  getAction(id) {
    const resolved = this.getMenuItem(id);
    if (!resolved || !resolved.isAction) return void 0;
    return resolved.item;
  }
  /**
   * Get menu or action by ID
   */
  getMenuOrAction(id) {
    const resolved = this.getMenuItem(id);
    if (!resolved) return void 0;
    return resolved.item;
  }
  /**
   * Get all registered menu items
   */
  getAllItems() {
    return { ...this.registry };
  }
  /**
   * Get menu items by their IDs
   */
  getItemsByIds(ids) {
    return ids.map((id) => this.resolve(id)).filter((item) => item !== void 0);
  }
  /**
   * Get child items for a given menu ID
   * If flatten is true, it will recursively include submenu children but not groups
   */
  getChildItems(menuId, options = {}) {
    const item = this.resolve(menuId);
    if (!item || !("children" in item) || !item.children?.length) {
      return [];
    }
    const children = this.getItemsByIds(item.children);
    if (!options.flatten) {
      return children;
    }
    const flattened = [];
    for (const child of children) {
      if (child.type === "group") {
        flattened.push(child);
      } else if (child.type === "menu") {
        const menuChildren = this.getChildItems(child.id, { flatten: true });
        flattened.push(...menuChildren);
      } else {
        flattened.push(child);
      }
    }
    return flattened;
  }
  /**
   * Execute a command by ID
   */
  executeCommand(id, options = {}) {
    const resolved = this.getMenuItem(id);
    if (!resolved) {
      console.warn(`Menu item '${id}' not found`);
      return;
    }
    if (resolved.item.type === "group") {
      console.warn(`Cannot execute group '${id}'`);
      return;
    }
    const { item } = resolved;
    if (item.disabled) {
      console.warn(`Menu item '${id}' is disabled`);
      return;
    }
    if (resolved.isAction) {
      item.action(this.pluginRegistry, this.state);
      this.eventController.emit(_MenuManager2.EVENTS.COMMAND_EXECUTED, {
        command: item,
        source: options.source || "api"
      });
    } else if ("children" in item && item.children?.length) {
      this.handleSubmenu(item, options);
    }
  }
  /**
   * Execute a command from a keyboard shortcut
   */
  executeShortcut(shortcut) {
    const normalizedShortcut = this.normalizeShortcut(shortcut);
    const itemId = this.shortcutMap[normalizedShortcut];
    if (itemId) {
      this.executeCommand(itemId, { source: "shortcut" });
      this.eventController.emit(_MenuManager2.EVENTS.SHORTCUT_EXECUTED, {
        shortcut: normalizedShortcut,
        itemId
      });
      return true;
    }
    return false;
  }
  /**
   * Subscribe to menu events
   */
  on(eventType, callback) {
    return this.eventController.on(eventType, callback);
  }
  /**
   * Remove an event subscription
   */
  off(eventType, callback) {
    this.eventController.off(eventType, callback);
  }
  /**
   * Handle a menu item that has children (showing a submenu)
   */
  handleSubmenu(menuItem, options) {
    this.eventController.emit(_MenuManager2.EVENTS.MENU_REQUESTED, {
      menuId: menuItem.id,
      triggerElement: options.triggerElement,
      position: options.position,
      flatten: options.flatten || false
    });
  }
  /**
   * Set up keyboard listeners for shortcuts
   */
  setupKeyboardListeners() {
    if (typeof window === "undefined") return;
    const handleKeyDown = (event) => {
      const target = event.target;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      const shortcut = this.buildShortcutString(event);
      if (shortcut && this.executeShortcut(shortcut)) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }
  /**
   * Convert a KeyboardEvent to a shortcut string
   */
  buildShortcutString(event) {
    const modifiers = [];
    if (event.ctrlKey) modifiers.push("Ctrl");
    if (event.shiftKey) modifiers.push("Shift");
    if (event.altKey) modifiers.push("Alt");
    if (event.metaKey) modifiers.push("Meta");
    const key = event.key;
    const isModifier = ["Control", "Shift", "Alt", "Meta"].includes(key);
    if (!isModifier) {
      const displayKey = key.length === 1 ? key.toUpperCase() : key;
      return [...modifiers, displayKey].join("+");
    }
    return null;
  }
  /**
   * Normalize a shortcut string for consistent comparison
   */
  normalizeShortcut(shortcut) {
    return shortcut.split("+").map((part) => part.trim()).join("+");
  }
  /**
   * Get capabilities for the MenuManager
   */
  capabilities() {
    return {
      registerItem: this.registerItem.bind(this),
      registerItems: this.registerItems.bind(this),
      executeCommand: this.executeCommand.bind(this),
      getAction: this.getAction.bind(this),
      getMenuOrAction: this.getMenuOrAction.bind(this),
      getChildItems: this.getChildItems.bind(this),
      getItemsByIds: this.getItemsByIds.bind(this),
      getAllItems: this.getAllItems.bind(this)
    };
  }
};
_MenuManager.EVENTS = {
  COMMAND_EXECUTED: "menu:command_executed",
  MENU_REQUESTED: "menu:requested",
  SHORTCUT_EXECUTED: "menu:shortcut_executed"
};
var MenuManager = _MenuManager;
var IconManager = class {
  constructor(icons) {
    this.icons = {};
    this.registerIcons(icons);
  }
  /**
   * Register a single icon
   */
  registerIcon(icon) {
    if (this.icons[icon.id]) {
      console.warn(`Icon with ID ${icon.id} already exists and will be overwritten`);
    }
    this.icons[icon.id] = icon;
  }
  /**
   * Register multiple icons at once
   */
  registerIcons(icons) {
    if (Array.isArray(icons)) {
      icons.forEach((icon) => this.registerIcon(icon));
    } else {
      Object.entries(icons).forEach(([id, icon]) => this.registerIcon(icon));
    }
  }
  /**
   * Get all registered icons
   */
  getAllIcons() {
    return { ...this.icons };
  }
  /**
   * Get an icon by its ID
   */
  getIcon(id) {
    return this.icons[id];
  }
  /**
   * Check if an identifier is an SVG string
   */
  isSvgString(identifier) {
    return identifier.trim().startsWith("<svg") && identifier.includes("</svg>");
  }
  /**
   * Check if a string is an SVG data URI
   */
  isSvgDataUri(value) {
    return value.startsWith("data:image/svg+xml;base64,");
  }
  /**
   * Get the SVG string for an icon identifier
   * If the identifier is a raw SVG string, it is returned as is
   * If the identifier is an icon ID, the registered SVG is returned
   */
  getSvgString(identifier) {
    if (this.isSvgString(identifier)) {
      return identifier;
    }
    if (this.isSvgDataUri(identifier)) {
      return this.dataUriToSvgString(identifier);
    }
    return this.getIcon(identifier)?.svg;
  }
  /**
   * Utility method to parse a data URI
   */
  dataUriToSvgString(dataUri) {
    const base64 = dataUri.substring("data:image/svg+xml;base64,".length);
    return atob(base64);
  }
  /**
   * Convert an SVG string to a data URI
   */
  svgStringToDataUri(svgString) {
    const base64 = btoa(svgString);
    return `data:image/svg+xml;base64,${base64}`;
  }
  capabilities() {
    return {
      registerIcon: this.registerIcon.bind(this),
      registerIcons: this.registerIcons.bind(this),
      getIcon: this.getIcon.bind(this),
      getAllIcons: this.getAllIcons.bind(this),
      getSvgString: this.getSvgString.bind(this),
      isSvgString: this.isSvgString.bind(this),
      isSvgDataUri: this.isSvgDataUri.bind(this),
      dataUriToSvgString: this.dataUriToSvgString.bind(this),
      svgStringToDataUri: this.svgStringToDataUri.bind(this)
    };
  }
};
var UIPlugin = class extends w2 {
  constructor(id, registry, config) {
    super(id, registry);
    this.componentRenderers = {};
    this.components = {};
    this.mapStateCallbacks = {};
    this.globalStoreSubscription = () => {
    };
    this.config = config;
    this.menuManager = new MenuManager(config.menuItems || {}, this.registry);
    this.iconManager = new IconManager(config.icons || []);
    this.setupCommandEventHandlers();
    this.globalStoreSubscription = this.registry.getStore().subscribe((_action, newState) => {
      this.onGlobalStoreChange(newState);
    });
  }
  async initialize() {
    this.buildComponents();
    this.linkGroupedItems();
    this.setInitialStateUIComponents();
  }
  // Set up handlers for command events
  setupCommandEventHandlers() {
    this.menuManager.on(MenuManager.EVENTS.MENU_REQUESTED, (data) => {
      const { menuId, triggerElement, position, flatten } = data;
      const isOpen = this.state.commandMenu.commandMenu?.activeCommand === menuId;
      if (isOpen) {
        return this.dispatch(uiHideCommandMenu({ id: "commandMenu" }));
      }
      this.dispatch(
        uiShowCommandMenu({
          id: "commandMenu",
          commandId: menuId,
          triggerElement,
          position,
          flatten
        })
      );
    });
    this.menuManager.on(MenuManager.EVENTS.COMMAND_EXECUTED, (data) => {
      console.log("Command executed:", data.command.id, "source:", data.source);
    });
  }
  addComponent(id, componentConfig) {
    if (this.components[id]) {
      console.warn(`Component with ID ${id} already exists and will be overwritten`);
    }
    const component = new UIComponent(componentConfig, this.componentRenderers);
    this.components[id] = component;
    if (typeof componentConfig.mapStateToProps === "function") {
      this.mapStateCallbacks[id] = componentConfig.mapStateToProps;
    }
    return component;
  }
  buildComponents() {
    Object.entries(this.config.components).forEach(([id, componentConfig]) => {
      this.addComponent(id, componentConfig);
    });
  }
  linkGroupedItems() {
    Object.values(this.components).forEach((component) => {
      if (isItemWithSlots(component)) {
        const props = component.componentConfig;
        props.slots?.forEach((slot) => {
          const child = this.components[slot.componentId];
          if (child) {
            component.addChild(slot.componentId, child, slot.priority, slot.className);
          } else {
            console.warn(
              `Child component ${slot.componentId} not found for GroupedItems ${props.id}`
            );
          }
        });
      }
    });
  }
  setInitialStateUIComponents() {
    const defaultState = initialState;
    Object.entries(this.config.components).forEach(([componentId, definition]) => {
      if (definition.initialState) {
        defaultState[definition.type][componentId] = definition.initialState;
      } else {
        defaultState[definition.type][componentId] = {};
      }
    });
    this.dispatch(uiInitComponents(defaultState));
  }
  onGlobalStoreChange(state) {
    for (const [id, uiComponent] of Object.entries(this.components)) {
      const mapFn = this.mapStateCallbacks[id];
      if (!mapFn) continue;
      const { id: _id, ...ownProps } = uiComponent.props;
      const partial = mapFn(state, ownProps);
      const merged = { ...ownProps, ...partial };
      if (!v2(ownProps, merged)) {
        uiComponent.update(partial);
      }
    }
  }
  addSlot(parentId, slotId, priority, className) {
    const parentComponent = this.components[parentId];
    if (!parentComponent) {
      console.error(`Parent component ${parentId} not found`);
      return;
    }
    if (!isItemWithSlots(parentComponent)) {
      console.error(`Parent component ${parentId} does not support slots`);
      return;
    }
    const childComponent = this.components[slotId];
    if (!childComponent) {
      console.error(`Child component ${slotId} not found`);
      return;
    }
    const parentChildren = parentComponent.getChildren();
    let slotPriority = priority;
    if (slotPriority === void 0) {
      const maxPriority = parentChildren.length > 0 ? Math.max(...parentChildren.map((child) => child.priority)) : 0;
      slotPriority = maxPriority + 10;
    }
    parentComponent.addChild(slotId, childComponent, slotPriority, className);
  }
  buildCapability() {
    return {
      registerComponentRenderer: (type, renderer) => {
        this.componentRenderers[type] = renderer;
      },
      getComponent: (id) => {
        return this.components[id];
      },
      registerComponent: this.addComponent.bind(this),
      getCommandMenu: () => Object.values(this.components).find((component) => isCommandMenuComponent(component)),
      hideCommandMenu: () => this.debouncedDispatch(uiHideCommandMenu({ id: "commandMenu" }), 100),
      getFloatingComponents: (scrollerPosition) => Object.values(this.components).filter((component) => isFloatingComponent(component)).filter(
        (component) => !scrollerPosition || component.props.scrollerPosition === scrollerPosition
      ),
      getHeadersByPlacement: (placement) => Object.values(this.components).filter((component) => isHeaderComponent(component)).filter((component) => component.props.placement === placement),
      getPanelsByLocation: (location) => Object.values(this.components).filter((component) => isPanelComponent(component)).filter((component) => component.props.location === location),
      addSlot: this.addSlot.bind(this),
      togglePanel: (payload) => {
        this.dispatch(uiTogglePanel(payload));
      },
      setHeaderVisible: (payload) => {
        this.dispatch(uiSetHeaderVisible(payload));
      },
      updateComponentState: (payload) => {
        this.dispatch(uiUpdateComponentState(payload));
      },
      ...this.iconManager.capabilities(),
      ...this.menuManager.capabilities()
    };
  }
  async destroy() {
    this.globalStoreSubscription();
    this.components = {};
    this.componentRenderers = {};
    this.mapStateCallbacks = {};
  }
};
UIPlugin.id = "ui";
function isItemWithSlots(component) {
  return isGroupedItemsComponent(component) || isHeaderComponent(component) || isPanelComponent(component) || isFloatingComponent(component) || isCustomComponent(component);
}
function isGroupedItemsComponent(component) {
  return component.type === "groupedItems";
}
function isHeaderComponent(component) {
  return component.type === "header";
}
function isPanelComponent(component) {
  return component.type === "panel";
}
function isFloatingComponent(component) {
  return component.type === "floating";
}
function isCommandMenuComponent(component) {
  return component.type === "commandMenu";
}
function isCustomComponent(component) {
  return component.type === "custom";
}

// src/preact/hooks/use-ui.ts
var useUIPlugin = () => h(UIPlugin.id);
var useUICapability = () => L2(UIPlugin.id);

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
  const [_3, forceUpdate] = useState({});
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