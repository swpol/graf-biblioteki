import { InjectionKey, Ref, ShallowRef } from 'vue';
import { PluginRegistry } from '..';
export interface PDFContextState {
    registry: ShallowRef<PluginRegistry | null>;
    isInitializing: Ref<boolean>;
    pluginsReady: Ref<boolean>;
}
export declare const pdfKey: InjectionKey<PDFContextState>;
