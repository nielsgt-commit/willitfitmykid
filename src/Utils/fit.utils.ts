import type {Percentile, Sex, Season, UserRecord, WillFitWhenResult, KidsClothingSizeKey} from "../types/types.ts";
import {Temporal} from "temporal-polyfill";
import {getLengthByMonthAndPercentile} from "./growth.utils.ts";
import {monthsSinceBirth} from "./age.utils.ts";
import {kidsClothingTable} from "../data/sizeCharts/kids_clothing_sizes.ts";

function getProjectedHeight(sex: Sex, ageMonths: number, percentile: number): number | null {
    return getLengthByMonthAndPercentile(Math.floor(ageMonths), `P${percentile}` as Percentile, sex) ?? null;
}

export function getSeason(month: number): Season {
    if (month >= 3 && month <= 5) return 'Vår';
    if (month >= 6 && month <= 8) return 'Sommer';
    if (month >= 9 && month <= 11) return 'Høst';
    return 'Vinter';
}

export function willFitWhen(users: UserRecord[], size: string): WillFitWhenResult[] {
    const sizeRow = kidsClothingTable[size as KidsClothingSizeKey];
    if (!sizeRow) return [];

    const { min, max } = sizeRow.heightCm;
    const today = Temporal.Now.plainDateISO();

    return users.flatMap(user => {
        const currentAgeMonths = monthsSinceBirth(user.birthday);
        let start: WillFitWhenResult['start'] | null = null;
        let end: WillFitWhenResult['end'] | null = null;

        for (let futureMonth = currentAgeMonths; futureMonth <= 216; futureMonth++) {
            const projectedHeight = getProjectedHeight(user.sex, futureMonth, user.calculatedPercentile);
            if (projectedHeight === null) continue;

            const rounded = Math.round(projectedHeight * 10) / 10;
            if (rounded >= min && rounded <= max) {
                const monthsAhead = futureMonth - currentAgeMonths;
                const targetDate = today.add({ months: monthsAhead });
                const point = {
                    season: getSeason(targetDate.month),
                    month: targetDate.month,
                    year: targetDate.year,
                    ageMonths: futureMonth,
                    height: rounded,
                };

                if (start === null) start = point;
                end = point;
            } else if (start !== null) {
                break;
            }
        }

        if (start === null || end === null) return [];
        return [{ user, start, end }];
    });
}
