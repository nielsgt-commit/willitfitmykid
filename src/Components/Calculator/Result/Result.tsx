import * as React from "react";
import {useEffect, useState} from "react";
import type {Season, State} from "../../../types.ts";
import {useKids} from "../../../context/KidsContext.tsx";
import {getSeason, willFitWhen} from "../../../Utils/fit.utils.ts";
import {ResultList} from "./ResultList.tsx";
import {SEASONS, SEASON_COLORS} from "./SeasonRange.tsx";
import {getKidColor} from "../../../constants.ts";
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
    const [activeKidIds, setActiveKidIds] = useState<Set<number>>(() => new Set(kids.map(k => k.id)));

    // When kids list changes: add newly added kids as active, remove deleted kids
    useEffect(() => {
        setActiveKidIds(prev => {
            const currentIds = new Set(kids.map(k => k.id));
            const next = new Set([...prev].filter(id => currentIds.has(id)));
            kids.forEach(k => { if (!prev.has(k.id)) next.add(k.id); });
            return next;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kids.map(k => k.id).join(',')]);

    const toggleSeason = (season: Season) => {
        setActiveSeasons(prev => {
            const next = new Set(prev);
            if (next.has(season)) next.delete(season);
            else next.add(season);
            return next;
        });
    };

    const toggleKid = (id: number) => {
        setActiveKidIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filteredByKids = results.filter(r => activeKidIds.has(r.user.id));
    const filtered = activeSeasons.size === 0
        ? []
        : filteredByKids.filter(r => [...activeSeasons].some(s => resultIncludesSeason(r, s)));

    let content: React.ReactNode;
    if (kids.length === 0) {
        content = <p>Legg til barn for å finne størrelser som passer og sesong.</p>;
    } else if (filteredByKids.length === 0) {
        content = <p className={styles.emptyMessage}>Denne størrelsen passer ikke noen av barna i listen</p>;
    } else {
        content = (
            <p className={styles.resultsMessage}>
                Dette plagget passer trolig{" "}
                {activeSeasons.size > 0 && (
                    filtered.length === 0
                        ? <span>ikke i valgte sesonger</span>
                        : <ResultList results={filtered} filterSeasons={activeSeasons} />
                )}
            </p>
        );
    }

    return (
        <>
        <div className={styles.container}>

            <p> Viser resultater som passer i sesong </p>
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
            <p> Viser resultater for barn </p>
            {kids.length > 0 && (
                <div className={styles.kidButtons}>
                    {kids.map(kid => {
                        const active = activeKidIds.has(kid.id);
                        const color = getKidColor(kid.id);
                        return (
                            <button
                                key={kid.id}
                                onClick={() => toggleKid(kid.id)}
                                className={`${styles.kidButton} ${active ? styles.kidActive : ''}`}
                                style={{'--kid-color': color} as React.CSSProperties}
                            >
                                <span className={styles.kidDot} />
                                {kid.name}
                            </button>
                        );
                    })}
                </div>
            )}
            {content}
        </div>
        </>
    );
}