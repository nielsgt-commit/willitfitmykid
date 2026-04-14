
import { Temporal } from "temporal-polyfill";

import {regions, PERCENTILES} from "./constants.ts";
export type Region = typeof regions[number];

export type MonthEntry = { Month: number, P1: number, P3: number, P5: number, P10: number, P15: number, P25: number, P50: number, P75: number, P85: number, P90: number, P95: number, P97: number };

export type Sex = 'M' | 'F';
export type Percentile = (typeof PERCENTILES)[number];

export interface State {
    size: `${number}`,
    inputRegion: Region,
    conversions: Partial<Record<'EU' | 'UK' | 'US', string>>,
}

export type UserRecord = {
    id: number;
    name: string;
    sex: Sex;
    birthday: Temporal.PlainDate;
    heightNow: number;
    calculatedPercentile: number;
}

export type CmRange = {
  min: number;
  max: number;
};

/**
 * Canonical kids clothing size key.
 * In this model, the key is usually the EU height size, e.g. "92", "98", "104".
 */
export type KidsClothingSizeKey = `${number}`;

export type KidsClothingSizeRow = {
  key: KidsClothingSizeKey;
  ageLabel?: string;
  heightCm: CmRange;
  conversions: Partial<Record<Region, string>>;
};

export type KidsClothingTable = Record<
  KidsClothingSizeKey,
  KidsClothingSizeRow
>;

export type Season = 'Vinter' | 'Vår' | 'Sommer' | 'Høst';

export type WillFitWhenResult = {
    user: UserRecord;
    start: { season: Season; month: number; year: number; ageMonths: number; height: number };
    end: { season: Season; month: number; year: number; ageMonths: number; height: number };
};
