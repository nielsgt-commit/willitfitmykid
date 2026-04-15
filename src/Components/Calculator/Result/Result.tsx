import * as React from "react";
import {useState} from "react";
import type {Season, State} from "../../../types.ts";
import {useKids} from "../../../context/KidsContext.tsx";
import {getSeason, willFitWhen} from "../../../Utils/fit.utils.ts";
import {ResultList} from "./ResultList.tsx";
import {SEASONS, SEASON_COLORS} from "./SeasonRange.tsx";
import {Temporal} from "temporal-polyfill";
import styles from "./Result.module.css";

function resultIncludesSeason(result: ReturnType<typeof willFitWhen>[number], season: Season): boolean {
    const {start, end} = result;
    const startIdx = SEASONS.indexOf(start.season);
    const endIdx = SEASONS.indexOf(end.season);
    const targetIdx = SEASONS.indexOf(season);

    if (start.year === end.year) {
        return startIdx <= targetIdx && targetIdx <= endIdx;
    }

    // Multi-year: iterate year by year
    for (let year = start.year; year <= end.year; year++) {
        const fromIdx = year === start.year ? startIdx : 0;
        const toIdx = year === end.year ? endIdx : SEASONS.length - 1;
        if (fromIdx <= targetIdx && targetIdx <= toIdx) return true;
    }
    return false;
}

function currentSeason(): Season {
    return getSeason(Temporal.Now.plainDateISO().month);
}

export function Result({size}: Pick<State, "size">) {
    const {kids} = useKids();
    const results = willFitWhen(kids, size);
    const [activeSeasons, setActiveSeasons] = useState<Set<Season>>(() => new Set([currentSeason()]));

    const toggleSeason = (season: Season) => {
        setActiveSeasons(prev => {
            const next = new Set(prev);
            if (next.has(season)) next.delete(season);
            else next.add(season);
            return next;
        });
    };

    if (kids.length === 0) {
        return <p>Legg til barn for å finne størrelser som passer</p>;
    }

    if (results.length === 0) {
        return <p className={styles.emptyMessage}>Denne størrelsen passer ikke noen av barna i listen</p>;
    }

    const filtered = activeSeasons.size === 0
        ? []
        : results.filter(r => [...activeSeasons].some(s => resultIncludesSeason(r, s)));

    return (
        <div className={styles.container}>
            <div className={styles.seasonButtons}>
                {SEASONS.map(season => {
                    const active = activeSeasons.has(season);
                    const color = SEASON_COLORS[season];
                    return (
                        <button
                            key={season}
                            onClick={() => toggleSeason(season)}
                            className={`${styles.seasonButton} ${active ? styles.active : ''}`}
                            style={{'--season-color': color} as React.CSSProperties}
                        >
                            {season}
                        </button>
                    );
                })}
            </div>
            <p>
                Dette plagget passer trolig{" "}
                {activeSeasons.size > 0 && (
                    filtered.length === 0
                        ? <span>ikke i valgte sesonger</span>
                        : <ResultList results={filtered} filterSeasons={activeSeasons} />
                )}
            </p>
        </div>
    );
}
