import { ViewportPlugin } from '../..';
export declare const useViewportPlugin: () => {
    plugin: ViewportPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useViewportCapability: () => {
    provides: Readonly<import('../..').ViewportCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
