import { Temporal } from "temporal-polyfill";

export type UserRecord = {
    id: number;
    name: string;
    sex: 'M' | 'F';
    birthday: Temporal.PlainDate;
    heightNow: number;
    calculatedPercentile: number;
    sizeNow: `${number}`;
}