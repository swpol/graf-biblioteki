import { Action } from '@embedpdf/core';
export declare const ACTIVATE_MODE = "INTERACTION/ACTIVATE_MODE";
export declare const PAUSE_INTERACTION = "INTERACTION/PAUSE";
export declare const RESUME_INTERACTION = "INTERACTION/RESUME";
export declare const SET_CURSOR = "INTERACTION/SET_CURSOR";
export interface ActivateModeAction extends Action {
    type: typeof ACTIVATE_MODE;
    payload: {
        mode: string;
    };
}
export interface PauseInteractionAction extends Action {
    type: typeof PAUSE_INTERACTION;
}
export interface ResumeInteractionAction extends Action {
    type: typeof RESUME_INTERACTION;
}
export interface SetCursorAction extends Action {
    type: typeof SET_CURSOR;
    payload: {
        cursor: string;
    };
}
export declare const activateMode: (mode: string) => ActivateModeAction;
export declare const setCursor: (cursor: string) => SetCursorAction;
export declare const pauseInteraction: () => PauseInteractionAction;
export declare const resumeInteraction: () => ResumeInteractionAction;
export type InteractionManagerAction = ActivateModeAction | PauseInteractionAction | ResumeInteractionAction | SetCursorAction;
