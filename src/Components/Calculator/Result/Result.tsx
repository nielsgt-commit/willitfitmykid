import type {State} from "../../types.ts";

import {Temporal} from "temporal-polyfill";
import {type UserRecord} from "../../../TestUsers.ts";
import {useKids} from "../../../context/KidsContext.tsx";
import type {MonthEntry} from "../../../Data/GrowthCharts/growthDataGirls.ts";
import {kidsClothingTable, type KidsClothingSizeKey} from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {growthDataGirls} from "../../../Data/GrowthCharts/growthDataGirls.ts";
import {growthDataBoys} from "../../../Data/GrowthCharts/growthDataBoys.ts";


function calculateAgeInMonths(birthday: Temporal.PlainDate): number {
    const today = Temporal.Now.plainDateISO();
    const duration = birthday.until(today, { largestUnit: 'months' });
    return duration.months + (duration.years * 12);
}

function getProjectedHeight(sex: 'M' | 'F', ageMonths: number, percentile: number): number | null {
    const chartData = sex === 'F' ? growthDataGirls : growthDataBoys;

    const monthEntry = chartData.find((entry: MonthEntry) => entry.Month === Math.floor(ageMonths));
    if (!monthEntry) return null;

    const key = `P${percentile}` as keyof typeof monthEntry;
    return monthEntry[key] ?? null;
}

type Season = 'Winter' | 'Spring' | 'Summer' | 'Autumn';

type WillFitWhenResult = {
    user: UserRecord;
    start: { season: Season; month: number; year: number; ageMonths: number; height: number };
    end: { season: Season; month: number; year: number; ageMonths: number; height: number };
};

function getSeason(month: number): Season {
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
}

function willFitWhen(users: UserRecord[], size: string): WillFitWhenResult[] {
    const sizeRow = kidsClothingTable[size as KidsClothingSizeKey];
    if (!sizeRow) return [];

    const { min, max } = sizeRow.heightCm;
    const today = Temporal.Now.plainDateISO();

    return users.flatMap(user => {
        const currentAgeMonths = calculateAgeInMonths(user.birthday);
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

export function Result({size}: Pick<State, 'size'>) {
    const { kids } = useKids();
    const willFitWhenResults = willFitWhen(kids, size);

    return (
        <>
            {willFitWhenResults.length > 0 ? (
                <p> Dette plagget passer trolig {willFitWhenResults.map(result => {
                    const { user, start, end } = result;
                    const range = start.season === end.season && start.year === end.year
                        ? `${start.season} ${start.year}`
                        : `${start.season} ${start.year} – ${end.season} ${end.year}`;
                    return `${user.name} (${range})`;
                }).join(", ")} </p>
            ) : (
                <p>Passer ikke noen av barna i listen  </p>
            )}
        </>
    )
}
