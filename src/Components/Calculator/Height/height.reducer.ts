import { INCREMENT_HEIGHT, DECREMENT_HEIGHT, SET_HEIGHT } from "./height.action.ts";
import type {Action} from "./height.action.ts";


interface State {
    height: number;
}

export const heightReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case INCREMENT_HEIGHT:
            return { ...state, height: state.height + 1};
        case DECREMENT_HEIGHT:
            return {...state, height: state.height - 1};
        case SET_HEIGHT:
            return { ...state, height: action.payload} ;
        default:
            return state;
    }
}