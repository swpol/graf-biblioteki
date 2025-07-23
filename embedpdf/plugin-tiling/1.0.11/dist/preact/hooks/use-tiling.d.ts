import { TilingPlugin } from '../..';
export declare const useTilingPlugin: () => {
    plugin: TilingPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useTilingCapability: () => {
    provides: Readonly<import('../..').TilingCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
