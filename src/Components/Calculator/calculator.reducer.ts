
interface State {
    months: number,
    height: number,
    percentile: number,
    size: number | string ,
}

import type {Action} from "./calculator.action.ts";
import {SET_HEIGHT} from "./Height/height.action.ts";
import {SET_PERCENTILE} from "./Percentile/percentile.action.ts";
import {SET_SIZE} from "./Size/size.action.ts";
import {SET_AGE} from "./Months/months.action.ts";



export default function calculatorReducer(state:State, action: Action    ) {

// TODO growth chart look up logic
    switch (action.type) {
        case SET_AGE:
                return {...state, age: state.months + 2}
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