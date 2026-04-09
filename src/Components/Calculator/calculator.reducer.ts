import {DECREMENT_HEIGHT, INCREMENT_HEIGHT, SET_HEIGHT} from "./Height/height.action.ts";
import {DECREMENT_PERCENTILE, INCREMENT_PERCENTILE, SET_PERCENTILE} from "./Percentile/percentile.action.ts";
import {DECREMENT_SIZE, INCREMENT_SIZE, SET_SIZE} from "./Size/size.action.ts";
import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE} from "./Months/months.action.ts";
import type {State} from "../types.ts";
import type {Action} from "./calculator.action.ts"
import {EU_SIZE_0_19yo, PERCENTILE} from "../../constants.ts";
import {kidsClothingTable} from "../../Data/SizeCharts/kids_clothing_sizes.ts";
import {getSizeRow} from "../../Data/Utils/sizeChart.utils.ts";



export default function calculatorReducer(state:State, action: Action    ): State {

    switch (action.type) {
        case SET_SIZE : {
            const sizeRow = getSizeRow(kidsClothingTable, action.payload);
            return {
                ...state,
                size: action.payload,
                conversions: sizeRow?.conversions ?? {},
            }
        }


        // Increment and decrement Size
        case INCREMENT_SIZE: {
            const currentIndex = EU_SIZE_0_19yo.indexOf(Number(state.size));
            const nextIndex = Math.min(currentIndex + 1, EU_SIZE_0_19yo.length - 1);
            const sizeStepUp = `${EU_SIZE_0_19yo[nextIndex === -1 ? 0 : nextIndex]}` as `${number}`;
            return {
                ...state,
                size: sizeStepUp,
                conversions: getSizeRow(kidsClothingTable, sizeStepUp)?.conversions ?? {},
            }}
        case DECREMENT_SIZE: {
            const currentIndex = EU_SIZE_0_19yo.indexOf(Number(state.size));
            const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
            const sizeStepDown = `${EU_SIZE_0_19yo[prevIndex]}` as `${number}`;
            return {
                ...state,
                size: sizeStepDown,
                conversions: getSizeRow(kidsClothingTable, sizeStepDown)?.conversions ?? {},
            }}





















































        default:
                return state;
        }
}
