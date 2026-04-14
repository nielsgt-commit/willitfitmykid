
import { Temporal } from "temporal-polyfill";
import {regions} from "../constants.ts";


export type Region = typeof regions[number];
export type MonthEntry = { Month: number; P1: number; P3: number; P5: number; P10: number; P15: number; P25: number; P50: number; P75: number; P85: number; P90: number; P95: number; P97: number };

export interface ProfileState {
    name: string;
    birthday: number;
    heightNow: number;
    calculatedPercentile: number;
}

export interface State {
    selectedUser: UserRecord ;
    size: `${number}`,
    inputRegion: Region,
    conversions: Partial<Record<'EU' | 'UK' | 'US', string>>,
}


export type UserRecord = {
    id: number;
    name: string;
    sex: 'M' | 'F';
    birthday: Temporal.PlainDate;
    heightNow: number;
    calculatedPercentile: number;
    sizeNow: `${number}`;
}