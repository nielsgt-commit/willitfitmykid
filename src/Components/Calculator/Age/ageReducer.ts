import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE} from "../../actions.ts";
import type {Action} from "../../actions.ts";

interface AgeState {
    age: number;
}

export function ageReducer(state: AgeState, action:Action): AgeState {
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