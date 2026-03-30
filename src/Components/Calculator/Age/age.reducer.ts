import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE, type Action} from "./age.action.ts";


interface State {
    age: number;
}
// Months
export function ageReducer(state: State, action:Action): State {
 switch (action.type) {
     case INCREMENT_AGE:
         return {...state, age: state.age + 1};
     case DECREMENT_AGE:
         return {...state, age: state.age - 1};
     case SET_AGE:
         return {...state, age: action.payload};
     default:
         return state;
 }
}