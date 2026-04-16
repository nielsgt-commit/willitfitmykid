import * as React from "react";
import {useEffect, useReducer} from "react";
import type {Season, State} from "../../../types/types.ts";
import {useKids} from "../../../hooks/context/KidsContext.tsx";
import {getSeason, willFitWhen} from "../../../utils/fit.utils.ts";
import {ResultList} from "./resultList/ResultList.tsx";
import {SEASONS, SEASON_COLORS} from "./seasonRange/SeasonRange.tsx";
import {getKidColor} from "../../../constants/constants.ts";
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

    type FilterState = { activeSeasons: Set<Season>; activeKidIds: Set<number> };
    type FilterAction =
        | { type: 'TOGGLE_SEASON'; season: Season }
        | { type: 'TOGGLE_KID'; id: number }
        | { type: 'SYNC_KIDS'; kidIds: number[] };

    function filterReducer(state: FilterState, action: FilterAction): FilterState {
        switch (action.type) {
            case 'TOGGLE_SEASON': {
                const next = new Set(state.activeSeasons);
                next.has(action.season) ? next.delete(action.season) : next.add(action.season);
                return { ...state, activeSeasons: next };
            }
            case 'TOGGLE_KID': {
                const next = new Set(state.activeKidIds);
                next.has(action.id) ? next.delete(action.id) : next.add(action.id);
                return { ...state, activeKidIds: next };
            }
            case 'SYNC_KIDS': {
                const currentIds = new Set(action.kidIds);
                const next = new Set([...state.activeKidIds].filter(id => currentIds.has(id)));
                action.kidIds.forEach(id => { if (!state.activeKidIds.has(id)) next.add(id); });
                return { ...state, activeKidIds: next };
            }
        }
    }

    const [{ activeSeasons, activeKidIds }, dispatch] = useReducer(
        filterReducer,
        null,
        () => ({
            activeSeasons: new Set<Season>([currentSeason()]),
            activeKidIds: new Set<number>(kids.map(k => k.id)),
        })
    );

    // When kids list changes: add newly added kids as active, remove deleted kids
    useEffect(() => {
        dispatch({ type: 'SYNC_KIDS', kidIds: kids.map(k => k.id) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kids.map(k => k.id).join(',')]);

    const filteredByKids = results.filter(r => activeKidIds.has(r.user.id));
    const filtered = activeSeasons.size === 0
        ? []
        : filteredByKids.filter(r => [...activeSeasons].some(s => resultIncludesSeason(r, s)));

    const content: React.ReactNode =
        kids.length === 0 ? (
            <p>Legg til barn for å finne størrelser som passer og sesong.</p>
        ) : filteredByKids.length === 0 ? (
            <p className={styles.emptyMessage}>Denne størrelsen passer ikke noen av barna i listen</p>
        ) : (
            <p className={styles.resultsMessage}>
                Dette plagget passer trolig{" "}
                {activeSeasons.size > 0 && (
                    filtered.length === 0
                        ? <span>ikke i valgte sesonger</span>
                        : <ResultList results={filtered} filterSeasons={activeSeasons} />
                )}
            </p>
        );

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
                            onClick={() => dispatch({ type: 'TOGGLE_SEASON', season })}
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
                                onClick={() => dispatch({ type: 'TOGGLE_KID', id: kid.id })}
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