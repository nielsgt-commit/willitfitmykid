
interface State {
    age: number,
    height: number,
    percentile: number,
    size: number | string | undefined,
}

import type {Action} from "./calculator.action.ts";

// const mont = monthReducer



export default function calculatorReducer(state:State, action: Action    ) {


    switch (action.type) {
            case 'CALCULATE_AGE_IF_PERCENTILE_AND_AGE':
                return {...state, age: state.age + 2}
            case 'CALCULATE_HEIGHT_IF_AGE_AND_PERCENTILE':
                return {...state, height: state.height + 2}
            case 'CALCULATE_PERCENTILE_IF_HEIGHT_AND_AGE':
                return {...state, percentile: state.percentile + 2}
            case 'CALCULATE_SIZE_IF_AGE_AND_PERCENTILE':
                return {...state, size: state.size * 2}
            default:
                return state;
        }
}