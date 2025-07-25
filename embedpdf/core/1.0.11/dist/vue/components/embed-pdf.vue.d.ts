import { PluginRegistry, PluginBatchRegistration } from '../..';
import { PdfEngine } from '@embedpdf/models';
type __VLS_Props = {
    engine: PdfEngine;
    plugins: PluginBatchRegistration<any, any>[];
    onInitialized?: (registry: PluginRegistry) => Promise<void>;
};
declare var __VLS_1: {
    registry: any;
    isInitializing: any;
    pluginsReady: any;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
