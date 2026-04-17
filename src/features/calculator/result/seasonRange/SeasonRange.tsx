import type {Season, WillFitWhenResult} from "@/types/types.ts";
import {SEASON_COLORS, SEASONS} from "@features/calculator/result/seasonRange/season.constants.ts";
import styles from "@features/MyKids.module.css";
import * as React from "react";


type SeasonRangeProps = {
    start: WillFitWhenResult['start'];
    end: WillFitWhenResult['end'];
    filterSeasons?: Set<Season>;
};

function expandSeasons(start: { season: Season; year: number }, end: { season: Season; year: number }): { season: Season; year: number }[] {
    const result: { season: Season; year: number }[] = [];
    let seasonIdx = SEASONS.indexOf(start.season);
    let year = start.year;

    while (year < end.year || (year === end.year && seasonIdx <= SEASONS.indexOf(end.season))) {
        result.push({season: SEASONS[seasonIdx], year});
        seasonIdx++;
        if (seasonIdx >= SEASONS.length) {
            seasonIdx = 0;
            year++;
        }
    }

    return result;
}

export function SeasonRange({start, end, filterSeasons}: SeasonRangeProps) {
    const allPairs = expandSeasons(start, end);
    const pairs = filterSeasons ? allPairs.filter(p => filterSeasons.has(p.season)) : allPairs;

    return (
        <>
            {pairs.map((pair, i) => (
                <span key={`${pair.season}-${pair.year}`}>
                    {i > 0 && i < pairs.length - 1 && ", "}
                    {i > 0 && i === pairs.length - 1 && " og "}
                    <span
                        className={styles.season}
                        style={{'--season-color': SEASON_COLORS[pair.season]} as React.CSSProperties}
                    >
                        {pair.season} {pair.year}
                    </span>
                </span>
            ))}
        </>
    );
}
