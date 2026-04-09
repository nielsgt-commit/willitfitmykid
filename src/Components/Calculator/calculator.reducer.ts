import {DECREMENT_SIZE, INCREMENT_SIZE, SET_SIZE} from "./Size/size.action.ts";
import {PREV_USER, NEXT_USER} from "../UserSwitcher/UserSwitcher.action.ts";
import type {State} from "../types.ts";
import type {Action} from "./calculator.action.ts"
import {EU_SIZE_0_19yo, PERCENTILE} from "../../constants.ts";
import {kidsClothingTable} from "../../Data/SizeCharts/kids_clothing_sizes.ts";
import {getSizeRow} from "../../Data/Utils/sizeChart.utils.ts";
import {testUsers} from "../../TestUsers.ts";

const cycleUser = (state: State, offset: number) => {
    const currentIndex = testUsers.findIndex(user => user.id === state.selectedUser.id);
    if (currentIndex === -1) {
        return state.selectedUser;
    }
    const nextIndex = (currentIndex + offset + testUsers.length) % testUsers.length;
    return testUsers[nextIndex];
};


export default function calculatorReducer(state:State, action: Action    ): State {

    switch (action.type) {
        case PREV_USER:
            return {
                ...state,
                selectedUser: cycleUser(state, -1),
            }

        case NEXT_USER:
            return {
                ...state,
                selectedUser: cycleUser(state, 1),
            }


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
