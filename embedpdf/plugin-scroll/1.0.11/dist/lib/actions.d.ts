import { Action } from '@embedpdf/core';
import { ScrollState } from './types';
export declare const UPDATE_SCROLL_STATE = "UPDATE_SCROLL_STATE";
export declare const SET_DESIRED_SCROLL_POSITION = "SET_DESIRED_SCROLL_POSITION";
export declare const UPDATE_TOTAL_PAGES = "UPDATE_TOTAL_PAGES";
export interface UpdateScrollStateAction extends Action {
    type: typeof UPDATE_SCROLL_STATE;
    payload: Partial<ScrollState>;
}
export interface SetDesiredScrollPositionAction extends Action {
    type: typeof SET_DESIRED_SCROLL_POSITION;
    payload: {
        x: number;
        y: number;
    };
}
export interface UpdateTotalPagesAction extends Action {
    type: typeof UPDATE_TOTAL_PAGES;
    payload: number;
}
export type ScrollAction = UpdateScrollStateAction | SetDesiredScrollPositionAction | UpdateTotalPagesAction;
export declare function updateScrollState(payload: Partial<ScrollState>): UpdateScrollStateAction;
export declare function setDesiredScrollPosition(payload: {
    x: number;
    y: number;
}): SetDesiredScrollPositionAction;
export declare function updateTotalPages(payload: number): UpdateTotalPagesAction;
