import { Tile, TileStatus } from './types';
export declare const UPDATE_VISIBLE_TILES = "UPDATE_VISIBLE_TILES";
export declare const MARK_TILE_STATUS = "MARK_TILE_STATUS";
export type UpdateVisibleTilesAction = {
    type: typeof UPDATE_VISIBLE_TILES;
    payload: Record<number, Tile[]>;
};
export type MarkTileStatusAction = {
    type: typeof MARK_TILE_STATUS;
    payload: {
        pageIndex: number;
        tileId: string;
        status: TileStatus;
    };
};
export type TilingAction = UpdateVisibleTilesAction | MarkTileStatusAction;
export declare const updateVisibleTiles: (tiles: Record<number, Tile[]>) => UpdateVisibleTilesAction;
export declare const markTileStatus: (pageIndex: number, tileId: string, status: TileStatus) => MarkTileStatusAction;
