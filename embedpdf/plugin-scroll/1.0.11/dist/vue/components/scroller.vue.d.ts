import { StyleValue } from 'vue';
type __VLS_Props = {
    style?: StyleValue;
    overlayElements?: any[];
};
declare var __VLS_1: {
    page: any;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    overlayElements: any[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
