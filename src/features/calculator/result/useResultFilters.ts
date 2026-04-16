import {useCallback, useEffect, useReducer} from "react";
import type {Season, UserRecord} from "../../../types/types.ts";
import resultReducer from "./result.reducer.ts";
import {SYNC_KIDS, TOGGLE_KID, TOGGLE_SEASON} from "./result.action.ts";
import {currentSeason} from "./result.utils.ts";

export function useResultFilters(kids: UserRecord[]) {
    const [{activeSeasons, activeKidIds}, dispatch] = useReducer(
        resultReducer,
        null,
        () => ({
            activeSeasons: new Set<Season>([currentSeason()]),
            activeKidIds: new Set<number>(kids.map(k => k.id)),
        })
    );

    const kidIdsKey = kids.map(k => k.id).join(',');
    useEffect(() => {
        dispatch({type: SYNC_KIDS, payload: kidIdsKey ? kidIdsKey.split(',').map(Number) : []});
    }, [kidIdsKey]);

    const toggleSeason = useCallback((season: Season) => {
        dispatch({type: TOGGLE_SEASON, payload: season});
    }, []);

    const toggleKid = useCallback((id: number) => {
        dispatch({type: TOGGLE_KID, payload: id});
    }, []);

    return {activeSeasons, activeKidIds, toggleSeason, toggleKid};
}