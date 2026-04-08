import {DECREMENT_HEIGHT, INCREMENT_HEIGHT, SET_HEIGHT} from "./Height/height.action.ts";
import {DECREMENT_PERCENTILE, INCREMENT_PERCENTILE, SET_PERCENTILE} from "./Percentile/percentile.action.ts";
import {DECREMENT_SIZE, INCREMENT_SIZE, SET_SIZE} from "./Size/size.action.ts";
import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE} from "./Months/months.action.ts";
import type {State} from "../types.ts";
import type {Action} from "./calculator.action.ts"
import {
    lookUpAge,
    lookUpHeight,
    lookUpPercentile,
    lookUpSize
} from "../../Data/Utils/growthChart.utils.ts";
import {SET_BIRTHDAY} from "../actions.ts";
import {findByHeight, findHeightBySize, findHeightRangeBySize} from "../../Data/Utils/sizeChart.utils.ts";
import {kidsClothingTable} from "../../Data/SizeCharts/kids_clothing_sizes.ts";
import {EU_SIZE_0_19yo, PERCENTILE} from "../../constants.ts";



export default function calculatorReducer(state:State, action: Action    ): State {

// TODO growth chart look up logic
    switch (action.type) {
        case SET_SIZE :
            return {
                ...state,
                size: action.payload,

            }
        case SET_AGE:
                return {
                    ...state,
                    months: action.payload,
                }
        case SET_HEIGHT:

            return {
                ...state,
                height: action.payload,
            }
        case SET_PERCENTILE:
            return {
                ...state,
                percentile: action.payload,
            }

        // Increment and decrement Size
        case INCREMENT_SIZE: {
            const currentIndex = EU_SIZE_0_19yo.indexOf(Number(state.size));
            const nextIndex = Math.min(currentIndex + 1, EU_SIZE_0_19yo.length - 1);
            const sizeStepUp = `${EU_SIZE_0_19yo[nextIndex === -1 ? 0 : nextIndex]}` as `${number}`;
            return {
                ...state,
                size: sizeStepUp,
            }}
        case DECREMENT_SIZE: {
            const currentIndex = EU_SIZE_0_19yo.indexOf(Number(state.size));
            const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
            const sizeStepDown = `${EU_SIZE_0_19yo[prevIndex]}` as `${number}`;
            return {
                ...state,
                size: sizeStepDown,
            }}

            // Increment and decrement Height
            case INCREMENT_HEIGHT:
                const heightPlus = state.height + 1;
                return {
                    ...state,
                    height: heightPlus,
                }
            case DECREMENT_HEIGHT: {
                const heightMinus = state.height - 1;
                return {
                    ...state,
                    height: heightMinus,
                }}

        // Increment and decrement Age
        case INCREMENT_AGE: {
            const monthsPlus = state.months + 1;
            return {
                ...state,
                months: monthsPlus,
            }}
        case DECREMENT_AGE: {
            const monthsMinus = state.months - 1;
            return {
                ...state,
                months: monthsMinus,
            }}



        // Increment and decrement Percentile
        case INCREMENT_PERCENTILE: {
            const numericPercentiles = PERCENTILE.map(p => parseInt(p.slice(1)));
            const currentIndex = numericPercentiles.indexOf(state.percentile);
            const nextIndex = Math.min(currentIndex + 1, numericPercentiles.length - 1);
            const percentilePlus = numericPercentiles[currentIndex === -1 ? 0 : nextIndex];
            return {
                ...state,
                percentile: percentilePlus,
            }}
        case DECREMENT_PERCENTILE: {
            const numericPercentiles = PERCENTILE.map(p => parseInt(p.slice(1)));
            const currentIndex = numericPercentiles.indexOf(state.percentile);
            const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
            const percentileMinus = numericPercentiles[prevIndex];
            return {
                ...state,
                percentile: percentileMinus,
            }}

        default:
                return state;
        }
}
