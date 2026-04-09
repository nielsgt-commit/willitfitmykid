import type {State} from "../../types.ts";

import {Temporal} from "temporal-polyfill";
import {testUsers} from "../../../TestUsers.ts";
import type {MonthEntry} from "../../../Data/GrowthCharts/Girls_percentile/girls_0_24.ts";
import {girls_0_24} from "../../../Data/GrowthCharts/Girls_percentile/girls_0_24.ts";
import {girls_24_60} from "../../../Data/GrowthCharts/Girls_percentile/girls_24_60.ts";
import {boys_0_24} from "../../../Data/GrowthCharts/Boys_percentile/boys_0_24.ts";
import {boys_24_60} from "../../../Data/GrowthCharts/Boys_percentile/boys_24_60.ts";

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
    'boys_0_24': boys_0_24,
    'boys_24_60': boys_24_60,
} as const;

function selectGrowthChart(sex: 'M' | 'F', ageMonths: number): string {
    const sexPrefix = sex === 'F' ? 'girls' : 'boys';

    if (ageMonths < 24) {
        return `${sexPrefix}_0_24`;
    } else if (ageMonths < 60) {
        return `${sexPrefix}_24_60`;
    }

    // Default to 24-60 for ages beyond 60 months
    return `${sexPrefix}_24_60`;
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





export function Result({selectedUser, size}: State): ResultProps{
    const child_name = selectedUser.name;
    const projected_season = " Sommer"; // getProjectedSeason( selectedUser.birthday, selectedUser.percentile);
    const projected_year = "2027"; // getProjectedYear( selectedUser.birthday, selectedUser.percentile);

    const matchesNow = testUsers.filter(testUser => size === testUser.sizeNow);


    const ageMonths = calculateAgeInMonths(selectedUser.birthday);

//

    return (
        <>
            {matchesNow.length > 0 ? (
                <p> Dette plagget passer trolig {matchesNow.map(user => user.name).join(", ")} nå. </p>
            ) : (
                <p>Passer ikke noen nå {ageMonths}</p>
            )}
        </>
    )
}
