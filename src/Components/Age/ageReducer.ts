import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE} from "../actions.ts";

//
function ageReducer(state: AppState, action: Action) {
 switch (action.type) {
     case INCREMENT_AGE:
         return {...state, age: state.age + 1}
     case DECREMENT_AGE:
         return {...state, age: state.age - 1}
     case SET_AGE:
         return {...state, age: action.payload}

 }
}