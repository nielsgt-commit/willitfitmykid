import {SET_AGE} from "./Months/months.action.ts";

interface State {
    age: number,
    height: number,
    percentile: number,
    size: number | string | undefined,
}

import type {Action} from "./calculator.action.ts";
import {SET_HEIGHT} from "./Height/height.action.ts";
import {SET_PERCENTILE} from "./Percentile/percentile.action.ts";
import {SET_SIZE} from "./Size/size.action.ts";

// const mont = monthReducer



export default function calculatorReducer(state:State, action: Action    ) {


    switch (action.type) {
        case SET_AGE:
                return {...state, age: state.age + 2}
            case SET_HEIGHT:
                return {...state, height: state.height + 2}
            case SET_PERCENTILE:
                return {...state, percentile: state.percentile + 2}
            case SET_SIZE :
                return {...state, size: (state.size * 2)}
            default:
                return state;
        }
}