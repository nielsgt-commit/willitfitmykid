import type {Season} from '../../../types/types.ts';
import {TOGGLE_SEASON, TOGGLE_KID, SYNC_KIDS, type Action} from './result.action.ts';

export type FilterState = {
    activeSeasons: Set<Season>;
    activeKidIds: Set<number>;
};

export default function resultReducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
        case TOGGLE_SEASON: {
            const next = new Set(state.activeSeasons);
            if (next.has(action.payload)) next.delete(action.payload); else next.add(action.payload);
            return {...state, activeSeasons: next};
        }
        case TOGGLE_KID: {
            const next = new Set(state.activeKidIds);
            if (next.has(action.payload)) next.delete(action.payload); else next.add(action.payload);
            return {...state, activeKidIds: next};
        }
        case SYNC_KIDS: {
            const currentIds = new Set(action.payload);
            const next = new Set([...state.activeKidIds].filter(id => currentIds.has(id)));
            action.payload.forEach(id => { if (!state.activeKidIds.has(id)) next.add(id); });
            return {...state, activeKidIds: next};
        }
        default:
            return state;
    }
}