import type {State} from "../../types.ts";

import {Temporal} from "temporal-polyfill";
import {testUsers, type UserRecord} from "../../../TestUsers.ts";
import type {MonthEntry} from "../../../Data/GrowthCharts/Girls_percentile/girls_0_24.ts";
import {kidsClothingTable, type KidsClothingSizeKey} from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {girls_0_24} from "../../../Data/GrowthCharts/Girls_percentile/girls_0_24.ts";
import {girls_24_60} from "../../../Data/GrowthCharts/Girls_percentile/girls_24_60.ts";
import {girls_24_240} from "../../../Data/GrowthCharts/Girls_percentile/girls_24_240.ts";
import {boys_0_24} from "../../../Data/GrowthCharts/Boys_percentile/boys_0_24.ts";
import {boys_24_60} from "../../../Data/GrowthCharts/Boys_percentile/boys_24_60.ts";
import {boys_24_240} from "../../../Data/GrowthCharts/Boys_percentile/boys_24_240.ts";

interface ResultProps {
    state: State;
}

function calculateAgeInMonths(birthday: Temporal.PlainDate): number {
    const today = Temporal.Now.plainDateISO();
    const duration = birthday.until(today, { largestUnit: 'months' });
    return duration.months + (duration.years * 12);
}

const chartDataMap = {
    'girls_0_24': girls_0_24,
    'girls_24_60': girls_24_60,
    'girls_24_240': girls_24_240,
    'boys_0_24': boys_0_24,
    'boys_24_60': boys_24_60,
    'boys_24_240': boys_24_240,
} as const;

function selectGrowthChart(sex: 'M' | 'F', ageMonths: number): string {
    const sexPrefix = sex === 'F' ? 'girls' : 'boys';

    if (ageMonths < 24) {
        return `${sexPrefix}_0_24`;
    } else if (ageMonths < 60) {
        return `${sexPrefix}_24_60`;
    }
    return `${sexPrefix}_24_240`;
}

function getProjectedHeight(sex: 'M' | 'F', ageMonths: number, percentile: number): number | null {
    const chartKey = selectGrowthChart(sex, ageMonths) as keyof typeof chartDataMap;
    const chartData = chartDataMap[chartKey];

    if (!chartData) return null;

    // Find entry for the age month
    const monthEntry = chartData.find((entry: MonthEntry) => entry.Month === Math.floor(ageMonths));
    if (!monthEntry) return null;

    // Look up percentile directly
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

function willSizeFit(size: string): UserRecord[] {
    const sizeRow = kidsClothingTable[size as KidsClothingSizeKey];
    if (!sizeRow) return [];

    const { min, max } = sizeRow.heightCm;

    return testUsers.filter(user => {
        const ageMonths = calculateAgeInMonths(user.birthday);
        const projectedHeight = getProjectedHeight(user.sex, ageMonths, user.calculatedPercentile);

        if (projectedHeight === null) return false;

        const roundedHeight = Math.round(projectedHeight * 10) / 10;
        return roundedHeight >= min && roundedHeight <= max;
    });
}



export function Result({selectedUser, size}: State): ResultProps{
    const willFit = willSizeFit(size);
    const willFitWhenResults = willFitWhen(testUsers, size);

    const matchesNow = testUsers.filter(testUser => size === testUser.sizeNow);

    const ageMonths = calculateAgeInMonths(selectedUser.birthday);

//

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
