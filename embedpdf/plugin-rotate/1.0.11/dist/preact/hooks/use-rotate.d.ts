import { RotatePlugin } from '../..';
export declare const useRotatePlugin: () => {
    plugin: RotatePlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useRotateCapability: () => {
    provides: Readonly<import('../..').RotateCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
