export const INCREMENT_SIZE = 'INCREMENT_SIZE';
export const DECREMENT_SIZE = 'DECREMENT_SIZE';
export const SET_SIZE = 'SET_SIZE';
export const SET_REGION = 'SET_REGION';

import type {Region} from '@myTypes/types.ts';

export type Action =
    | {type: typeof INCREMENT_SIZE}
    | {type: typeof DECREMENT_SIZE}
    | {type: typeof SET_SIZE, payload: string}
    | {type: typeof SET_REGION, payload: Region}
    ;