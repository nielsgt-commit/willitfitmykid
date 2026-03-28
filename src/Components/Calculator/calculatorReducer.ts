import type {CalculatorState} from "../types.ts";
import type {CalculatorAction} from "../actions.ts";
import {ageReducer} from "./Age/ageReducer.ts";
import {heightReducer} from "./Height/heightReducer.ts";
import {percentileReducer} from "./Percentile/percentileReducer.ts";
import {useReducer} from "react";


export default function calculatorReducer(state: CalculatorState, action: CalculatorAction    ) {

   const [ ageState, ageDispatch] = useReducer(ageReducer, state);
   const [ heightState, heightDispatch] = useReducer(heightReducer, state);
   const [ percentileState, percentileDispatch] = useReducer(percentileReducer, state);

    switch (action.type) {
            case 'CALCULATE_AGE':
                return {...ageState, age: ageState.age + 1}
            case 'CALCULATE_HEIGHT':
                return {...heightState, height: heightState.height + 1}
            case 'CALCULATE_PERCENTILE':
                return {...percentileState, percentile: percentileState.percentile + 1}
            default:
                return state;
        }
}