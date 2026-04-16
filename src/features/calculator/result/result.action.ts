export const TOGGLE_SEASON = 'TOGGLE_SEASON';
export const TOGGLE_KID = 'TOGGLE_KID';
export const SYNC_KIDS = 'SYNC_KIDS';

import type {Season} from '../../../types/types.ts';

export type Action =
    | {type: typeof TOGGLE_SEASON, payload: Season}
    | {type: typeof TOGGLE_KID, payload: number}
    | {type: typeof SYNC_KIDS, payload: number[]}
    ;