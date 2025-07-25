import { RenderPlugin } from '../..';
export declare const useRenderPlugin: () => {
    plugin: RenderPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useRenderCapability: () => {
    provides: Readonly<import('../..').RenderCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
