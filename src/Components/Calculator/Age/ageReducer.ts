import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE} from "../actions.ts";
import type {CalculatorState} from "../types.ts";

//
function ageReducer(state: CalculatorState, action: Action) {
 switch (action.type) {
     case INCREMENT_AGE:
         return {...state, age: state.age + 1}
     case DECREMENT_AGE:
         return {...state, age: state.age - 1}
     case SET_AGE:
         return {...state, age: action.payload}
     default:
         return state;
 }
}