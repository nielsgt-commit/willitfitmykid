import type {CalculatorState} from "../types.ts";
import type {CalculatorAction} from "../actions.ts";

export default function calculatorReducer(state: CalculatorState, action: CalculatorAction    ) {
        switch (action.type) {
            case 'CALCULATE_AGE':
                return {...state, age: state.age + 1}
            case 'CALCULATE_HEIGHT':
                return {...state, height: state.height + 1}
            case 'CALCULATE_PERCENTILE':
                return {...state, percentile: state.percentile + 1}
            default:
                return state;
        }
}