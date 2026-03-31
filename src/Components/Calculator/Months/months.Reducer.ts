import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE, type Action} from "./months.action.ts";


interface State {
    months: number;
}
// Months
export function monthsReducer(state: State, action:Action): State {
 switch (action.type) {
     case INCREMENT_AGE:
         return {...state, months: state.months + 1};
     case DECREMENT_AGE:
         return {...state, months: state.months - 1};
     case SET_AGE:
         return {...state, months: action.payload};
     default:
         return state;
 }
}