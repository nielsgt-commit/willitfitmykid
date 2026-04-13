import type { State } from "../types";
import { Temporal } from "temporal-polyfill";

const placeholderUser = {
    id: 0,
    name: 'Ingen barn valgt',
    sex: 'F' as const,
    birthday: Temporal.PlainDate.from('2020-01-01'),
    heightNow: 100,
    calculatedPercentile: 50,
    sizeNow: '100' as `${number}`,
};

export const initialState: State = {
    selectedUser: placeholderUser,
    size: '86',
    inputRegion: 'EU',
    conversions: {},
}