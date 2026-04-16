import { TOGGLE_MY_KIDS, OPEN_ADD_FORM, CLOSE_MY_KIDS, type Action } from './app.action.ts';

export type AppState = { showMyKids: boolean; openAddForm: boolean };

export default function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case TOGGLE_MY_KIDS:
            return { ...state, showMyKids: !state.showMyKids, openAddForm: false };
        case OPEN_ADD_FORM:
            return { showMyKids: true, openAddForm: true };
        case CLOSE_MY_KIDS:
            return { showMyKids: false, openAddForm: false };
        default:
            return state;
    }
}