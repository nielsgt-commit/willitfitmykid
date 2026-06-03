export const ADD_KID = 'ADD_KID';
export const UPDATE_KID = 'UPDATE_KID';
export const REMOVE_KID = 'REMOVE_KID';
export const REPLACE_KIDS = 'REPLACE_KIDS';

import type { UserRecord } from '@myTypes/types.ts';

export type Action =
    | { type: typeof ADD_KID; payload: Omit<UserRecord, 'id'> }
    | { type: typeof UPDATE_KID; payload: { id: number; updates: Partial<Omit<UserRecord, 'id'>> } }
    | { type: typeof REMOVE_KID; payload: number }
    | { type: typeof REPLACE_KIDS; payload: { kids: UserRecord[]; nextId: number } }
    ;
