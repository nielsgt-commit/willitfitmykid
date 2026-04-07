import {DECREMENT_HEIGHT, INCREMENT_HEIGHT, SET_HEIGHT} from "./Height/height.action.ts";
import {DECREMENT_PERCENTILE, INCREMENT_PERCENTILE, SET_PERCENTILE} from "./Percentile/percentile.action.ts";
import {DECREMENT_SIZE, INCREMENT_SIZE, SET_SIZE} from "./Size/size.action.ts";
import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE} from "./Months/months.action.ts";
import type {State} from "../types.ts";
import type {Action} from "./calculator.action.ts"
import {lookupHeightByAgeMonths} from "../../Data/Utils/growthChart.utils.ts";



export default function calculatorReducer(state:State, action: Action    ): State {

// TODO growth chart look up logic
    switch (action.type) {
        case SET_AGE:
           const h  = 2+2;
           const p = 3+3;
                return {height: lookupHeightByAgeMonths(action.payload, p), percentile: p, months: action.payload}
        case SET_HEIGHT:
            return {...state, height: action.payload }
        case SET_PERCENTILE:
            return {...state, percentile: action.payload}
        case SET_SIZE :
            return {...state, size: action.payload}

        // Increment and decrement Age
        case INCREMENT_AGE:
                return {...state, months: state.months + 1}
        case DECREMENT_AGE:
            return {...state, months: state.months - 1}

        // Increment and decrement Height
        case INCREMENT_HEIGHT:
            return {...state, height: state.height + 1}
        case DECREMENT_HEIGHT:
            return {...state, height: state.height - 1}

        // Increment and decrement Percentile
        case INCREMENT_PERCENTILE:
            return {...state, percentile: state.percentile + 1}
        case DECREMENT_PERCENTILE:
            return {...state, percentile: state.percentile - 1}

        // Increment and decrement Size
        case INCREMENT_SIZE:
            return {...state, size: state.size + 1}
        case DECREMENT_SIZE:
            return {...state, size: state.size - 1}

        default:
                return state;
        }
}