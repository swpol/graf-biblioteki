// src/lib/ui-plugin.ts
import { BasePlugin, arePropsEqual } from "@embedpdf/core";

// src/lib/ui-component.ts
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
    this.children.sort((a, b) => a.priority - b.priority);
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

// src/lib/actions.ts
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

// src/lib/reducer.ts
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
var uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_INIT_COMPONENTS:
      return {
        ...state,
        ...action.payload
      };
    case UI_TOGGLE_PANEL: {
      const prevPanel = state.panel[action.payload.id] || {};
      const { open: nextOpen, visibleChild: nextVisibleChild } = action.payload;
      const prevVisibleChild = prevPanel.visibleChild;
      let open = prevPanel.open;
      let visibleChild = prevPanel.visibleChild;
      if (nextVisibleChild === prevVisibleChild) {
        open = nextOpen !== void 0 ? nextOpen : !prevPanel.open;
      } else {
        visibleChild = nextVisibleChild;
        open = true;
      }
      return {
        ...state,
        panel: {
          ...state.panel,
          [action.payload.id]: {
            ...prevPanel,
            open,
            visibleChild
          }
        }
      };
    }
    case UI_SET_HEADER_VISIBLE:
      return {
        ...state,
        header: {
          ...state.header,
          [action.payload.id]: {
            ...state.header[action.payload.id],
            visible: action.payload.visible,
            visibleChild: action.payload.visibleChild
          }
        }
      };
    case UI_SHOW_COMMAND_MENU:
      return {
        ...state,
        commandMenu: {
          ...state.commandMenu,
          [action.payload.id]: {
            activeCommand: action.payload.commandId,
            triggerElement: action.payload.triggerElement,
            position: action.payload.position,
            open: true,
            flatten: action.payload.flatten
          }
        }
      };
    case UI_HIDE_COMMAND_MENU:
      return {
        ...state,
        commandMenu: {
          ...state.commandMenu,
          [action.payload.id]: {
            ...state.commandMenu[action.payload.id],
            open: false,
            activeCommand: null,
            triggerElement: void 0,
            position: void 0,
            flatten: false
          }
        }
      };
    case UI_UPDATE_COMPONENT_STATE: {
      const { componentType, componentId, patch } = action.payload;
      if (!state[componentType] || !state[componentType][componentId]) return state;
      const current = state[componentType][componentId];
      const filteredPatch = Object.fromEntries(Object.entries(patch).filter(([k]) => k in current));
      if (Object.keys(filteredPatch).length === 0) return state;
      return {
        ...state,
        [componentType]: {
          ...state[componentType],
          [componentId]: {
            ...current,
            ...filteredPatch
          }
        }
      };
    }
    default:
      return state;
  }
};

// src/lib/utils.ts
function defineComponent() {
  return (c) => c;
}
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

// src/lib/menu/utils.ts
function resolveMenuItem(item, state) {
  const dyn = (v) => typeof v === "function" ? v(state) : v;
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
function isActive(item, state) {
  const resolved = resolveMenuItem(item, state);
  if (resolved.type === "group") {
    return false;
  }
  return resolved.active ? true : false;
}
function isVisible(item, state) {
  const resolved = resolveMenuItem(item, state);
  if (resolved.type === "group") {
    return false;
  }
  return resolved.visible ? true : false;
}
function isDisabled(item, state) {
  const resolved = resolveMenuItem(item, state);
  if (resolved.type === "group") {
    return false;
  }
  return resolved.disabled ? true : false;
}

// src/lib/menu/menu-manager.ts
var _MenuManager = class _MenuManager {
  constructor(items = {}, pluginRegistry) {
    this.registry = {};
    this.shortcutMap = {};
    // maps shortcut to menu item id
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
      this.eventController.emit(_MenuManager.EVENTS.COMMAND_EXECUTED, {
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
      this.eventController.emit(_MenuManager.EVENTS.SHORTCUT_EXECUTED, {
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
    this.eventController.emit(_MenuManager.EVENTS.MENU_REQUESTED, {
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
// Event types
_MenuManager.EVENTS = {
  COMMAND_EXECUTED: "menu:command_executed",
  MENU_REQUESTED: "menu:requested",
  SHORTCUT_EXECUTED: "menu:shortcut_executed"
};
var MenuManager = _MenuManager;

// src/lib/icons/icon-manager.ts
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

// src/lib/ui-plugin.ts
var UIPlugin = class extends BasePlugin {
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
      if (!arePropsEqual(ownProps, merged)) {
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

// src/lib/manifest.ts
var UI_PLUGIN_ID = "ui";
var manifest = {
  id: UI_PLUGIN_ID,
  name: "UI Plugin",
  version: "1.0.0",
  provides: ["ui"],
  requires: [],
  optional: [],
  defaultConfig: {
    enabled: true,
    components: {}
  }
};

// src/lib/menu/types.ts
function hasActive(command) {
  return "active" in command;
}

// src/lib/index.ts
var UIPluginPackage = {
  manifest,
  create: (registry, _engine, config) => new UIPlugin(UI_PLUGIN_ID, registry, config),
  reducer: uiReducer,
  initialState
};
export {
  UIComponent,
  UIPlugin,
  UIPluginPackage,
  UI_PLUGIN_ID,
  createEventController,
  defineComponent,
  hasActive,
  isActive,
  isDisabled,
  isVisible,
  manifest,
  resolveMenuItem
};
//# sourceMappingURL=index.js.map