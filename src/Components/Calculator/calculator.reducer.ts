import {DECREMENT_SIZE, INCREMENT_SIZE, SET_SIZE, SET_REGION, SET_SIZE_FOR_HEIGHT} from "./Size/size.action.ts";
import type {State} from "../../types.ts";
import type {Action} from "./Size/size.action.ts"
import {EU_SIZE_0_19yo} from "../../constants.ts";
import {kidsClothingTable} from "../../Data/SizeCharts/kids_clothing_sizes.ts";
import {getSizeRow, findCanonicalSize} from "../../Utils/size.utils.ts";

export default function calculatorReducer(state:State, action: Action): State {

    switch (action.type) {

        case SET_REGION:
            return {
                ...state,
                inputRegion: action.payload,
            };

        case SET_SIZE : {
            const row = state.inputRegion === 'EU'
                ? getSizeRow(kidsClothingTable, action.payload as `${number}`)
                : findCanonicalSize(kidsClothingTable, state.inputRegion, action.payload);
            if (!row) return state;
            return {
                ...state,
                size: row.key,
                conversions: row.conversions,
            }
        }
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

        case SET_SIZE_FOR_HEIGHT: {
            const row = getSizeRow(kidsClothingTable, action.payload);
            if (!row) return state;
            return { ...state, size: row.key, conversions: row.conversions };
        }

        default:
                return state;
        }
}