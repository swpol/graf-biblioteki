import { LoaderPlugin } from '../..';
export declare const useLoaderPlugin: () => {
    plugin: LoaderPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useLoaderCapability: () => {
    provides: Readonly<import('../..').LoaderCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
