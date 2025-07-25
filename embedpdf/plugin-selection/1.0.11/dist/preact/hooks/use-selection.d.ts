import { SelectionPlugin } from '../..';
export declare const useSelectionCapability: () => {
    provides: Readonly<import('../..').SelectionCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};
export declare const useSelectionPlugin: () => {
    plugin: SelectionPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
