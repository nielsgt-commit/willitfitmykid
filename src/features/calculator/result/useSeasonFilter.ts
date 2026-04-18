import { useCallback, useReducer } from "react";
import type { Season } from "../../../types/types.ts";
import { currentSeason } from "./result.utils.ts";

type State = { activeSeasons: Set<Season> };
type Action = { type: 'TOGGLE'; payload: Season };

function reducer(state: State, action: Action): State {
    const next = new Set(state.activeSeasons);
    next.has(action.payload) ? next.delete(action.payload) : next.add(action.payload);
    return { activeSeasons: next };
}

export function useSeasonFilter() {
    const [state, dispatch] = useReducer(
        reducer,
        null,
        () => ({ activeSeasons: new Set<Season>([currentSeason()]) })
    );

    const toggleSeason = useCallback((season: Season) => {
        dispatch({ type: 'TOGGLE', payload: season });
    }, []);

    return { activeSeasons: state.activeSeasons, toggleSeason };
}