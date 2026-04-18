import * as React from "react";
import type {Season, WillFitWhenResult} from "@/types/types.ts";
import {SEASONS} from "@features/calculator/result/seasonRange/season.constants.ts";
import {ResultList} from "@features/calculator/result/resultList/ResultList.tsx";
import {UserName} from "@features/calculator/result/userName/UserName.tsx";
import {getKidColor} from "@constants/constants.ts";


type ResultSummaryProps = {
    results: WillFitWhenResult[];
    filterSeasons: Set<Season>;
};

function isBefore(a: { year: number; season: Season }, b: { year: number; season: Season }): boolean {
    if (a.year !== b.year) return a.year < b.year;
    return SEASONS.indexOf(a.season) < SEASONS.indexOf(b.season);
}

export function ResultSummary({results, filterSeasons}: ResultSummaryProps) {
    const earliest = results.reduce((acc, r) => (isBefore(r.start, acc) ? r.start : acc), results[0].start);
    const latest = results.reduce((acc, r) => (isBefore(acc, r.end) ? r.end : acc), results[0].end);

    const names = results.map((r, i) => (
        <React.Fragment key={r.user.id}>
            {i > 0 && i < results.length - 1 && ", "}
            {i > 0 && i === results.length - 1 && " og "}
            <UserName name={r.user.name} color={getKidColor(r.user.id)}/>
        </React.Fragment>
    ));

    return (
        <details>
            <summary>
                Passer {names}, fra {earliest.season} {earliest.year} til {latest.season} {latest.year}
            </summary>
            <ResultList results={results} filterSeasons={filterSeasons}/>
        </details>
    );
}