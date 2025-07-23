import { PluginManifest, PluginRegistry, Action as Action$1, CoreState, BasePlugin, PluginPackage } from '@embedpdf/core';

declare const UI_PLUGIN_ID = "ui";
declare const manifest: PluginManifest<UIPluginConfig>;

declare class UIComponent<T extends BaseUIComponent<any, any, any>> {
    componentConfig: T;
    props: T['id'] extends string ? T extends BaseUIComponent<infer P, any, any> ? P & {
        id: string;
    } : any : any;
    type: string;
    private children;
    private registry;
    private updateCallbacks;
    private hadUpdateBeforeListeners;
    constructor(componentConfig: T, registry: Record<string, (props: any, children: (options?: childrenFunctionOptions) => any[], context?: Record<string, any>) => any>);
    addChild(id: string, child: UIComponent<any>, priority?: number, className?: string): void;
    private sortChildren;
    removeChild(child: UIComponent<any>): void;
    clearChildren(): void;
    get getRenderType(): string;
    getRenderer(): (props: any, children: (options?: childrenFunctionOptions) => any[], context?: Record<string, any>) => any;
    getChildren(): {
        id: string;
        component: UIComponent<any>;
        priority: number;
        className?: string;
    }[];
    getChildContext(context: Record<string, any>): Record<string, any>;
    update(newProps: Partial<T extends BaseUIComponent<infer P, any, any> ? P : any>): void;
    onUpdate(callback: () => void): boolean;
    offUpdate(callback: () => void): void;
    protected notifyUpdate(): void;
}

type Dynamic<TStore, T> = T | ((state: TStore) => T);
interface MenuItemBase<TStore = any> {
    icon?: Dynamic<TStore, string>;
    label: Dynamic<TStore, string>;
    active?: Dynamic<TStore, boolean>;
    disabled?: Dynamic<TStore, boolean>;
    shortcut?: string;
    shortcutLabel?: string;
    visible?: Dynamic<TStore, boolean>;
    dividerBefore?: boolean;
}
interface Action<TStore = any> extends MenuItemBase<TStore> {
    id: string;
    type: 'action';
    action: (registry: PluginRegistry, state: TStore) => void;
}
interface Group<TStore = any> {
    id: string;
    type: 'group';
    label: Dynamic<TStore, string>;
    children: string[];
}
interface Menu<TStore = any> extends MenuItemBase<TStore> {
    id: string;
    type: 'menu';
    children: string[];
}
type MenuItem<TStore = any> = Action<TStore> | Group | Menu<TStore>;
type MenuRegistry = Record<string, MenuItem>;
interface ExecuteOptions {
    source?: 'click' | 'shortcut' | 'api';
    triggerElement?: HTMLElement;
    flatten?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
}
declare function hasActive<TStore>(command: MenuItem<TStore>): command is Action<TStore>;
interface MenuManagerCapabilities {
    registerItem: (commandItem: MenuItem) => void;
    registerItems: (commands: MenuRegistry) => void;
    executeCommand: (id: string, options?: ExecuteOptions) => void;
    getAction: (id: string) => ResolvedAction | undefined;
    getMenuOrAction: (id: string) => ResolvedMenu | ResolvedAction | undefined;
    getChildItems: (commandId: string, options?: {
        flatten?: boolean;
    }) => ResolvedMenuItem[];
    getItemsByIds: (ids: string[]) => ResolvedMenuItem[];
    getAllItems: () => MenuRegistry;
}
type Resolved<TStore, T> = T extends Dynamic<TStore, infer U> ? U : T;
interface ResolvedMenuItemBase<TStore = any> {
    icon?: string;
    label: string;
    active?: boolean;
    disabled?: boolean;
    shortcut?: string;
    shortcutLabel?: string;
    visible?: boolean;
    dividerBefore?: boolean;
}
interface ResolvedAction<TStore = any> extends ResolvedMenuItemBase<TStore> {
    id: string;
    type: 'action';
    action: (registry: PluginRegistry, state: TStore) => void;
}
interface ResolvedGroup<TStore = any> {
    id: string;
    type: 'group';
    label: string;
    children: string[];
}
interface ResolvedMenu<TStore = any> extends ResolvedMenuItemBase<TStore> {
    id: string;
    type: 'menu';
    children: string[];
}
type ResolvedMenuItem<TStore = any> = ResolvedAction<TStore> | ResolvedGroup<TStore> | ResolvedMenu<TStore>;
interface ResolvedMenuItemResult<TStore = any> {
    item: ResolvedMenuItem<TStore>;
    isGroup: boolean;
    isMenu: boolean;
    isAction: boolean;
}

/**
 * Represents an icon in the icon registry
 */
interface Icon {
    id: string;
    svg: string;
}
/**
 * Record type for icon registry
 */
type IconRegistry = Record<string, Icon>;
/**
 * An identifier for an icon that can be either a registered icon id or raw SVG
 */
type IconIdentifier = string;
/**
 * Options for rendering an icon
 */
interface IconRenderOptions {
    className?: string;
    title?: string;
}
/**
 * Capabilities for the IconManager
 */
interface IconCapabilities {
    registerIcon: (icon: Icon) => void;
    registerIcons: (icons: Icon[] | IconRegistry) => void;
    getIcon: (id: string) => Icon | undefined;
    getAllIcons: () => IconRegistry;
    getSvgString: (identifier: IconIdentifier) => string | undefined;
    isSvgString: (identifier: IconIdentifier) => boolean;
    isSvgDataUri: (value: string) => boolean;
    dataUriToSvgString: (dataUri: string) => string;
    svgStringToDataUri: (svgString: string) => string;
}

declare const UI_INIT_COMPONENTS = "UI_INIT_COMPONENTS";
declare const UI_INIT_FLYOUT = "UI_INIT_FLYOUT";
declare const UI_TOGGLE_FLYOUT = "UI_TOGGLE_FLYOUT";
declare const UI_SET_HEADER_VISIBLE = "UI_SET_HEADER_VISIBLE";
declare const UI_TOGGLE_PANEL = "UI_TOGGLE_PANEL";
declare const UI_SHOW_COMMAND_MENU = "UI_SHOW_COMMAND_MENU";
declare const UI_HIDE_COMMAND_MENU = "UI_HIDE_COMMAND_MENU";
declare const UI_UPDATE_COMPONENT_STATE = "UI_UPDATE_COMPONENT_STATE";
interface InitFlyoutPayload {
    id: string;
    triggerElement: HTMLElement;
}
interface ToggleFlyoutPayload {
    id: string;
    open?: boolean;
}
interface SetHeaderVisiblePayload {
    id: string;
    visible: boolean;
    visibleChild?: string;
}
interface TogglePanelPayload {
    id: string;
    open?: boolean;
    visibleChild: string;
}
interface ShowCommandMenuPayload {
    id: string;
    commandId: string;
    triggerElement?: HTMLElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
    flatten?: boolean;
}
interface UpdateComponentStatePayload<T = any> {
    /** one of the top-level keys inside UIPluginState, e.g. "panel" | "custom" … */
    componentType: keyof UIPluginState;
    /** same id you used when registering the component */
    componentId: string;
    /** partial patch – only keys existing in the current state will be applied */
    patch: Partial<T>;
}
interface HideCommandMenuPayload {
    id: string;
}
interface UiInitComponentsAction extends Action$1 {
    type: typeof UI_INIT_COMPONENTS;
    payload: UIPluginState;
}
interface UiInitFlyoutAction extends Action$1 {
    type: typeof UI_INIT_FLYOUT;
    payload: InitFlyoutPayload;
}
interface UiToggleFlyoutAction extends Action$1 {
    type: typeof UI_TOGGLE_FLYOUT;
    payload: ToggleFlyoutPayload;
}
interface UiSetHeaderVisibleAction extends Action$1 {
    type: typeof UI_SET_HEADER_VISIBLE;
    payload: SetHeaderVisiblePayload;
}
interface UiTogglePanelAction extends Action$1 {
    type: typeof UI_TOGGLE_PANEL;
    payload: TogglePanelPayload;
}
interface UiShowCommandMenuAction extends Action$1 {
    type: typeof UI_SHOW_COMMAND_MENU;
    payload: ShowCommandMenuPayload;
}
interface UiHideCommandMenuAction extends Action$1 {
    type: typeof UI_HIDE_COMMAND_MENU;
    payload: HideCommandMenuPayload;
}
interface UiUpdateComponentStateAction extends Action$1 {
    type: typeof UI_UPDATE_COMPONENT_STATE;
    payload: UpdateComponentStatePayload;
}
type UIPluginAction = UiInitComponentsAction | UiInitFlyoutAction | UiToggleFlyoutAction | UiSetHeaderVisibleAction | UiTogglePanelAction | UiShowCommandMenuAction | UiHideCommandMenuAction | UiUpdateComponentStateAction;

interface UIPluginConfig {
    enabled: boolean;
    components: Record<string, UIComponentType>;
    menuItems?: MenuRegistry;
    icons?: IconRegistry;
}
interface UIPluginState {
    panel: {
        [id: string]: PanelState;
    };
    header: {
        [id: string]: HeaderState;
    };
    groupedItems: {
        [id: string]: {};
    };
    divider: {
        [id: string]: {};
    };
    iconButton: {
        [id: string]: {};
    };
    tabButton: {
        [id: string]: {};
    };
    selectButton: {
        [id: string]: {};
    };
    custom: {
        [id: string]: any;
    };
    floating: {
        [id: string]: FloatingState;
    };
    commandMenu: {
        [id: string]: CommandMenuState;
    };
}
type NavbarPlacement = 'top' | 'bottom' | 'left' | 'right';
interface childrenFunctionOptions {
    context?: Record<string, any>;
    filter?: (childId: string) => boolean;
}
type UICapability = IconCapabilities & MenuManagerCapabilities & {
    registerComponentRenderer: (type: string, renderer: (props: any, children: (options?: childrenFunctionOptions) => any[], context?: Record<string, any>) => any) => void;
    getComponent: <T extends BaseUIComponent<any, any, any>>(id: string) => UIComponent<T> | undefined;
    getCommandMenu: () => UIComponent<CommandMenuComponent> | undefined;
    hideCommandMenu: () => void;
    getHeadersByPlacement: (placement: 'top' | 'bottom' | 'left' | 'right') => UIComponent<HeaderComponent<any>>[];
    getPanelsByLocation: (location: 'left' | 'right') => UIComponent<PanelComponent<any>>[];
    getFloatingComponents: (viewportPosition?: 'inside' | 'outside') => UIComponent<FloatingComponent>[];
    addSlot: (parentId: string, slotId: string, priority?: number) => void;
    registerComponent: (componentId: string, componentProps: UIComponentType) => UIComponent<any>;
    togglePanel: (payload: TogglePanelPayload) => void;
    setHeaderVisible: (payload: SetHeaderVisiblePayload) => void;
    updateComponentState: <T>(payload: UpdateComponentStatePayload<T>) => void;
};
interface BaseUIComponent<TProps, TInitial = undefined, TStore = any> {
    id: string;
    type: string;
    render?: string;
    /**
     * A function that returns a context object for the component's children.
     */
    getChildContext?: ((props: TProps) => Record<string, any>) | Record<string, any>;
    /**
     * A function that returns a partial set of props from the initial state.
     */
    props?: ((init: TInitial) => TProps) | TProps;
    /**
     * An object containing the initial state for the component, typed as TInitial.
     */
    initialState?: TInitial;
    /**
     * A function that, on store changes, returns new or changed props to update
     * the component with (Redux-like).
     */
    mapStateToProps?: (storeState: TStore, ownProps: TProps) => TProps;
}
interface Slot {
    componentId: string;
    priority: number;
    className?: string;
}
interface PanelState {
    open: boolean;
    visibleChild: string | null;
}
interface PanelProps {
    location: 'left' | 'right';
    open: boolean;
    visibleChild: string | null;
    [name: string]: any;
}
interface PanelComponent<TStore = any> extends BaseUIComponent<PanelProps, PanelState, TStore> {
    type: 'panel';
    slots: Slot[];
}
interface HeaderState {
    visible?: boolean;
    visibleChild?: string | null;
}
interface HeaderProps {
    placement: 'top' | 'bottom' | 'left' | 'right';
    style?: Record<string, string>;
    visible?: boolean;
    visibleChild?: string | null;
}
interface HeaderComponent<TStore = any> extends BaseUIComponent<HeaderProps, HeaderState, TStore> {
    type: 'header';
    slots: Slot[];
}
interface GroupedItemsProps {
    justifyContent?: 'start' | 'center' | 'end';
    grow?: number;
    gap?: number;
}
interface GroupedItemsComponent<TStore = any> extends BaseUIComponent<GroupedItemsProps, undefined, TStore> {
    type: 'groupedItems';
    slots: Slot[];
}
interface DividerComponent<TStore = any> extends BaseUIComponent<undefined, undefined, TStore> {
    type: 'divider';
}
interface IconButtonProps {
    active?: boolean;
    disabled?: boolean;
    commandId?: string;
    onClick?: () => void;
    label?: string;
    img?: string;
    color?: string;
}
interface IconButtonComponent<TStore = any> extends BaseUIComponent<IconButtonProps, undefined, TStore> {
    type: 'iconButton';
}
interface TabButtonProps {
    active?: boolean;
    commandId?: string;
    onClick?: () => void;
    label: string;
}
interface TabButtonComponent<TStore = any> extends BaseUIComponent<TabButtonProps, undefined, TStore> {
    type: 'tabButton';
}
interface SelectButtonProps {
    active?: boolean;
    commandIds: string[];
    menuCommandId: string;
    activeCommandId: string;
}
interface SelectButtonComponent<TStore = any> extends BaseUIComponent<SelectButtonProps, undefined, TStore> {
    type: 'selectButton';
}
interface CustomComponent<TStore = any> extends BaseUIComponent<any, any, TStore> {
    type: 'custom';
    render: string;
    slots?: Slot[];
}
interface FloatingState {
    [name: string]: any;
}
interface FloatingComponentProps {
    scrollerPosition: 'inside' | 'outside';
    [name: string]: any;
}
interface FloatingComponent<TStore = any> extends BaseUIComponent<FloatingComponentProps, FloatingState, TStore> {
    type: 'floating';
    slots?: Slot[];
}
interface CommandMenuState {
    triggerElement?: HTMLElement;
    activeCommand: string | null;
    open: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
    flatten?: boolean;
}
interface CommandMenuProps {
    triggerElement?: HTMLElement;
    activeCommand: string | null;
    open: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
    flatten?: boolean;
}
interface CommandMenuComponent<TStore = any> extends BaseUIComponent<CommandMenuProps, CommandMenuState, TStore> {
    type: 'commandMenu';
}
type WithComponentId<TProps> = TProps & {
    id: string;
};
type ComponentRenderFunction<TProps> = (props: WithComponentId<TProps>, children: (options?: childrenFunctionOptions) => any[], context?: Record<string, any>) => any;
interface GlobalStoreState<TPlugins extends Record<string, any> = {}> {
    core: CoreState;
    plugins: {
        [UI_PLUGIN_ID]: UIPluginState;
    } & TPlugins;
}
type UIComponentType<TStore = any> = GroupedItemsComponent<TStore> | DividerComponent<TStore> | IconButtonComponent<TStore> | TabButtonComponent<TStore> | HeaderComponent<TStore> | PanelComponent<TStore> | CustomComponent<TStore> | FloatingComponent<TStore> | CommandMenuComponent<TStore> | SelectButtonComponent<TStore>;

declare class UIPlugin extends BasePlugin<UIPluginConfig, UICapability, UIPluginState, UIPluginAction> {
    static readonly id: "ui";
    private componentRenderers;
    private components;
    private config;
    private mapStateCallbacks;
    private globalStoreSubscription;
    private menuManager;
    private iconManager;
    constructor(id: string, registry: PluginRegistry, config: UIPluginConfig);
    initialize(): Promise<void>;
    private setupCommandEventHandlers;
    private addComponent;
    private buildComponents;
    private linkGroupedItems;
    private setInitialStateUIComponents;
    private onGlobalStoreChange;
    private addSlot;
    protected buildCapability(): UICapability;
    destroy(): Promise<void>;
}

declare function defineComponent<TInit, TProps, TStore = any>(): <C extends CustomComponent<TStore> & {
    initialState: TInit;
    props: (init: TInit) => TProps;
    mapStateToProps: (storeState: TStore, ownProps: TProps) => TProps;
}>(c: C) => C;
/**
 * Type definition for event callbacks
 */
type EventCallback = (data: any) => void;
/**
 * Interface for the event controller
 */
interface EventController {
    /**
     * Emit an event of the specified type with the given data
     */
    emit(eventType: string, data: any): void;
    /**
     * Subscribe to events of the specified type
     * Returns a function that can be called to unsubscribe
     */
    on(eventType: string, callback: EventCallback): () => void;
    /**
     * Unsubscribe a specific callback from events of the specified type
     */
    off(eventType: string, callback: EventCallback): void;
}
/**
 * Creates an event controller that manages event subscriptions and dispatching
 * This is a lightweight pub/sub implementation for typed events
 */
declare function createEventController(): EventController;

declare function resolveMenuItem<TStore>(item: MenuItem<TStore>, state: TStore): ResolvedMenuItem<TStore>;
declare function isActive<TStore>(item: MenuItem<TStore>, state: TStore): boolean;
declare function isVisible<TStore>(item: MenuItem<TStore>, state: TStore): boolean;
declare function isDisabled<TStore>(item: MenuItem<TStore>, state: TStore): boolean;

declare const UIPluginPackage: PluginPackage<UIPlugin, UIPluginConfig, UIPluginState, UIPluginAction>;

export { type Action, type BaseUIComponent, type CommandMenuComponent, type CommandMenuProps, type CommandMenuState, type ComponentRenderFunction, type CustomComponent, type DividerComponent, type Dynamic, type EventCallback, type EventController, type ExecuteOptions, type FloatingComponent, type FloatingComponentProps, type FloatingState, type GlobalStoreState, type Group, type GroupedItemsComponent, type GroupedItemsProps, type HeaderComponent, type HeaderProps, type HeaderState, type Icon, type IconButtonComponent, type IconButtonProps, type IconCapabilities, type IconIdentifier, type IconRegistry, type IconRenderOptions, type Menu, type MenuItem, type MenuItemBase, type MenuManagerCapabilities, type MenuRegistry, type NavbarPlacement, type PanelComponent, type PanelProps, type PanelState, type Resolved, type ResolvedAction, type ResolvedGroup, type ResolvedMenu, type ResolvedMenuItem, type ResolvedMenuItemBase, type ResolvedMenuItemResult, type SelectButtonComponent, type SelectButtonProps, type Slot, type TabButtonComponent, type TabButtonProps, type UICapability, UIComponent, type UIComponentType, UIPlugin, type UIPluginConfig, UIPluginPackage, type UIPluginState, UI_PLUGIN_ID, type WithComponentId, type childrenFunctionOptions, createEventController, defineComponent, hasActive, isActive, isDisabled, isVisible, manifest, resolveMenuItem };
