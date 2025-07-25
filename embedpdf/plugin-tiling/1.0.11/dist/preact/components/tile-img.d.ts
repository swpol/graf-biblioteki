import { Tile } from '../..';
interface TileImgProps {
    pageIndex: number;
    tile: Tile;
    dpr: number;
    scale: number;
}
export declare function TileImg({ pageIndex, tile, dpr, scale }: TileImgProps): import("preact").JSX.Element | null;
export {};
