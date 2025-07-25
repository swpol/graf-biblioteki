import { Reducer, CoreState, SetScaleAction } from '@embedpdf/core';
import { ScrollState, ScrollPluginConfig, ScrollMetrics } from './types';
import { ScrollAction } from './actions';
export declare const defaultScrollMetrics: ScrollMetrics;
export declare const initialState: (coreState: CoreState, config: ScrollPluginConfig) => ScrollState;
export declare const scrollReducer: Reducer<ScrollState, ScrollAction | SetScaleAction>;
