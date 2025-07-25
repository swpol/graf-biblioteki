import { SelectionState } from './types';
import { SelectionAction } from './actions';
export declare const initialState: SelectionState;
export declare const selectionReducer: (state: SelectionState | undefined, action: SelectionAction) => SelectionState;
