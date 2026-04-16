export const INCREMENT_SIZE = 'INCREMENT_SIZE';
export const DECREMENT_SIZE = 'DECREMENT_SIZE';
export const SET_SIZE = 'SET_SIZE';
export const SET_REGION = 'SET_REGION';
export const SET_SIZE_FOR_HEIGHT = 'SET_SIZE_FOR_HEIGHT';

import type {Region, KidsClothingSizeKey} from '../../../types/types.ts';

export type Action =
    | {type: typeof INCREMENT_SIZE}
    | {type: typeof DECREMENT_SIZE}
    | {type: typeof SET_SIZE, payload: string}
    | {type: typeof SET_REGION, payload: Region}
    | {type: typeof SET_SIZE_FOR_HEIGHT, payload: KidsClothingSizeKey}
    ;