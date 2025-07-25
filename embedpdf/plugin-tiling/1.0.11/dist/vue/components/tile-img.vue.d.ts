import { StyleValue } from 'vue';
import { Tile } from '../..';
interface Props {
    pageIndex: number;
    tile: Tile;
    scale: number;
    dpr?: number;
    style?: StyleValue;
}
declare const _default: import('vue').DefineComponent<Props, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    dpr: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
