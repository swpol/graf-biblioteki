import { JSX, h } from 'preact';
import * as _embedpdf_plugin_ui from '@embedpdf/plugin-ui';
import { UIPlugin, Icon, IconRegistry, IconIdentifier } from '@embedpdf/plugin-ui';

/** @jsxImportSource preact */

/**
 * Interface for UI components organized by type/location
 */
interface UIComponentsMap {
    headers: {
        top: JSX.Element[];
        bottom: JSX.Element[];
        left: JSX.Element[];
        right: JSX.Element[];
    };
    panels: {
        left: JSX.Element[];
        right: JSX.Element[];
    };
    floating: {
        insideScroller: JSX.Element[];
        outsideScroller: JSX.Element[];
    };
    commandMenu: JSX.Element | null;
}
/**
 * Props for the PluginUIProvider
 */
interface PluginUIProviderProps {
    /**
     * Render function that receives UI components
     */
    children: (components: UIComponentsMap) => JSX.Element;
}
/**
 * PluginUIProvider collects all components from the UI plugin system
 * and provides them to a render function without imposing any structure.
 *
 * It uses the render props pattern for maximum flexibility.
 */
declare function PluginUIProvider({ children }: PluginUIProviderProps): h.JSX.Element;

declare const useUIPlugin: () => {
    plugin: UIPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useUICapability: () => {
    provides: Readonly<_embedpdf_plugin_ui.UICapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

/**
 * Hook to access icon functionality in React
 */
declare function useIcon(): {
    registerIcon: (icon: Icon) => void;
    registerIcons: (icons: Icon[] | IconRegistry) => void;
    getIcon: (id: string) => Icon | undefined;
    getAllIcons: () => IconRegistry;
    getSvgString: (identifier: IconIdentifier) => string | undefined;
    isSvgString: (identifier: IconIdentifier) => boolean;
    isSvgDataUri: (value: string) => boolean;
    dataUriToSvgString: (dataUri: string) => string;
    svgStringToDataUri: (svgString: string) => string;
};

export { PluginUIProvider, type PluginUIProviderProps, type UIComponentsMap, useIcon, useUICapability, useUIPlugin };
