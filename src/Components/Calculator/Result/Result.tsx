import type {Percentile, Sex, State} from "../../../types.ts";
import {Temporal} from "temporal-polyfill";
import {type UserRecord} from "../../../types.ts";
import {useKids} from "../../../context/KidsContext.tsx";
import {kidsClothingTable, type KidsClothingSizeKey} from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {getLengthByMonthAndPercentile} from "../../../Utils/growth.utils.ts";
import {monthsSinceBirth} from "../../../Utils/age.utils.ts";

function getProjectedHeight(sex: Sex, ageMonths: number, percentile: number): number | null {
    return getLengthByMonthAndPercentile(Math.floor(ageMonths), `P${percentile}` as Percentile, sex) ?? null;
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

function formatSeasonRange(start: WillFitWhenResult['start'], end: WillFitWhenResult['end']): string {
    const seasons: Season[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    const currentYear = Temporal.Now.plainDateISO().year;

    // Helper function to format season with year
    const formatSeasonYear = (season: Season, year: number): string => {
        if (year === currentYear) {
            return `this ${season}`;
        } else if (year === currentYear + 1) {
            return `next ${season}`;
        } else {
            return `${season} ${year}`;
        }
    };

    // Same season and year
    if (start.season === end.season && start.year === end.year) {
        return formatSeasonYear(start.season, start.year);
    }

    // Same year but different seasons
    if (start.year === end.year) {
        const startIdx = seasons.indexOf(start.season);
        const endIdx = seasons.indexOf(end.season);
        const yearPrefix = start.year === currentYear ? "this " : start.year === currentYear + 1 ? "next " : "";

        if (endIdx > startIdx) {
            // Forward progression within the year
            const middleSeasons = seasons.slice(startIdx + 1, endIdx);
            if (middleSeasons.length === 0) {
                return `${formatSeasonYear(start.season, start.year)} through ${formatSeasonYear(end.season, end.year)}`;
            } else {
                // For same year, use consistent year prefix
                return `${formatSeasonYear(start.season, start.year)} through ${yearPrefix}${middleSeasons.join(' and ')} to ${formatSeasonYear(end.season, end.year)}`;
            }
        } else {
            // Wraps around year boundary (e.g., Autumn to Spring)
            const throughSeasons = [...seasons.slice(startIdx + 1), ...seasons.slice(0, endIdx)];
            if (throughSeasons.length === 0) {
                return `${formatSeasonYear(start.season, start.year)} through ${formatSeasonYear(end.season, end.year)}`;
            } else {
                return `${formatSeasonYear(start.season, start.year)} through ${throughSeasons.join(' and ')} to ${formatSeasonYear(end.season, end.year)}`;
            }
        }
    }

    // Different years
    const startIdx = seasons.indexOf(start.season);
    const endIdx = seasons.indexOf(end.season);

    // Get remaining seasons in start year
    const startYearSeasons = seasons.slice(startIdx + 1);
    // Get seasons before end season in end year
    const endYearSeasons = seasons.slice(0, endIdx);

    let range = formatSeasonYear(start.season, start.year);

    if (startYearSeasons.length > 0) {
        const startYearPrefix = start.year === currentYear ? "this " : start.year === currentYear + 1 ? "next " : "";
        range += ` through ${startYearPrefix}${startYearSeasons.join(' and ')}`;
    }

    // Add middle years if any
    if (end.year - start.year > 1) {
        if (start.year + 1 === currentYear) {
            range += ` and all of this year`;
        } else if (start.year + 1 === currentYear + 1) {
            range += ` and all of next year`;
        } else {
            range += ` and all of ${start.year + 1}`;
        }

        if (end.year - start.year > 2) {
            range += ` through ${end.year - 1}`;
        }
    }

    if (endYearSeasons.length > 0) {
        const endYearPrefix = end.year === currentYear ? "this " : end.year === currentYear + 1 ? "next " : "";
        range += ` and ${endYearPrefix}${endYearSeasons.join(' and ')} through`;
    } else {
        range += ` to`;
    }

    range += ` ${formatSeasonYear(end.season, end.year)}`;

    return range;
}

export function Result({size}: Pick<State, 'size'>) {
    const { kids } = useKids();
    const willFitWhenResults = willFitWhen(kids, size);

    return (
        <>
            {willFitWhenResults.length > 0 ? (
                <p> Dette plagget passer trolig {willFitWhenResults.map(result => {
                    const { user, start, end } = result;
                    const range = formatSeasonRange(start, end);
                    return `${user.name} (${range})`;
                }).join(", ")} </p>
            ) : (
                <p>Passer ikke noen av barna i listen  </p>
            )}
        </>
    )
}
