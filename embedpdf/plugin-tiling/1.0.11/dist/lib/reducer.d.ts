import { Reducer } from '@embedpdf/core';
import { TilingAction } from './actions';
import { TilingState } from './types';
export declare const initialState: TilingState;
export declare const tilingReducer: Reducer<TilingState, TilingAction>;
