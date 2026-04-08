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
import {findByHeight, findHeightBySize} from "../../Data/Utils/sizeChart.utils.ts";
import {kidsClothingTable} from "../../Data/SizeCharts/kids_clothing_sizes.ts";
import {EU_SIZE_0_19yo} from "../../constants.ts";



export default function calculatorReducer(state:State, action: Action    ): State {

// TODO growth chart look up logic
    switch (action.type) {
        case SET_SIZE :
            return {
                size: action.payload,
                percentile: state.percentile,
                //percentile: lookUpPercentile(state.height,state.months),
                months: lookUpAge(state.height,state.percentile),
                //height: lookUpHeight(state.months, state.percentile)
                height: findHeightBySize(kidsClothingTable, state.size),
            }
        case SET_AGE:
                return {
                    height: lookUpHeight(action.payload, state.percentile),
                    percentile: state.percentile,
               //   percentile: lookUpPercentile(state.height, state.months),
                    months: action.payload,
                    size: lookUpSize(state.height)
                }
        case SET_HEIGHT: {
            const row = Number.isFinite(action.payload)
                ? findByHeight(kidsClothingTable, action.payload)
                : undefined;

            return {
                months: state.months,
                //months: lookUpAge(state.height,state.percentile),
                height: action.payload,
                percentile: lookUpPercentile(state.height, action.payload),
                size: row?.conversions.UK ?? state.size,
            }}
        case SET_PERCENTILE:
            return {
                percentile: action.payload,
                months: state.months,
               // months: lookUpAge(state.height, action.payload),
                height: lookUpHeight(state.months, state.percentile),
                size: lookUpSize(state.height)
            }









        // Increment and decrement Age
        case INCREMENT_AGE: {
            const monthsPlus = state.months + 1;
            return {
                height: lookUpHeight(monthsPlus, state.percentile),
                percentile: lookUpPercentile(state.height, monthsPlus),
                months: monthsPlus,
                size: lookUpSize(state.height)
            }}
        case DECREMENT_AGE: {
            const monthsMinus = state.months - 1;
            return {
                height: lookUpHeight(monthsMinus, state.percentile),
                percentile: lookUpPercentile(state.height, monthsMinus),
                months: monthsMinus,
                size: lookUpSize(state.height)
            }}

        // Increment and decrement Height
        case INCREMENT_HEIGHT: {
            const heightPlus = state.height + 1;
            return {
                months: lookUpAge(heightPlus, state.percentile),
                height: heightPlus,
                percentile: lookUpPercentile(heightPlus, state.months),
                size: lookUpSize(heightPlus)
            }}
        case DECREMENT_HEIGHT: {
            const heightMinus = state.height - 1;
            return {
                months: lookUpAge(heightMinus, state.percentile),
                height: heightMinus,
                percentile: lookUpPercentile(heightMinus, state.months),
                size: lookUpSize(heightMinus)
            }}

        // Increment and decrement Percentile
        case INCREMENT_PERCENTILE: {
            const percentilePlus = state.percentile + 1;
            return {
                percentile: percentilePlus,
                months: lookUpAge(state.height, percentilePlus),
                height: lookUpHeight(state.months, percentilePlus),
                size: lookUpSize(state.height)
            }}
        case DECREMENT_PERCENTILE: {
            const percentileMinus = state.percentile - 1;
            return {
                percentile: percentileMinus,
                months: lookUpAge(state.height, percentileMinus),
                height: lookUpHeight(state.months, percentileMinus),
                size: lookUpSize(state.height)
            }}

        // Increment and decrement Size
        case INCREMENT_SIZE: {
            const currentIndex = EU_SIZE_0_19yo.indexOf(Number(state.size));
            const nextIndex = Math.min(currentIndex + 1, EU_SIZE_0_19yo.length - 1);
            const sizeStepUp = `${EU_SIZE_0_19yo[nextIndex === -1 ? 0 : nextIndex]}` as `${number}`;
            return {
                size: sizeStepUp,
                percentile: lookUpPercentile(state.height, state.months),
                months: lookUpAge(state.height, state.percentile),
                height: lookUpHeight(state.months, state.percentile)
            }}
        case DECREMENT_SIZE: {
            const currentIndex = EU_SIZE_0_19yo.indexOf(Number(state.size));
            const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
            const sizeStepDown = `${EU_SIZE_0_19yo[prevIndex]}` as `${number}`;
            return {
                size: sizeStepDown,
                percentile: lookUpPercentile(state.height, state.months),
                months: lookUpAge(state.height, state.percentile),
                height: lookUpHeight(state.months, state.percentile)
            }}

        default:
                return state;
        }
}
