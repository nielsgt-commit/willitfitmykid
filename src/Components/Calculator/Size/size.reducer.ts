import { type Action} from "./size.action.ts";

interface State {
    size: number;
}

export function sizeReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INCREMENT_SIZE':
            return {...state, size: state.size + 1};
        case 'DECREMENT_SIZE':
            return {...state,size: state.size - 1};
        case 'SET_SIZE':
            return {...state, size: action.payload};
        default:
            return state;
    }
}