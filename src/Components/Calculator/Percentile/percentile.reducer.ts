import {DECREMENT_PERCENTILE, INCREMENT_PERCENTILE, SET_PERCENTILE} from "../../actions.ts";
import type {Action} from "./percentile.action.ts";
interface State {
    percentile: number;
}
export default function percentileReducer(state: State, action: Action) {
    switch (action.type) {
        case INCREMENT_PERCENTILE:
            return {...state, percentile: state.percentile + 1 };
        case DECREMENT_PERCENTILE:
            return {...state, percentile: state.percentile - 1 };
        case SET_PERCENTILE:
            return {...state, percentile: action.payload };
        default:
            return state;
    }
}