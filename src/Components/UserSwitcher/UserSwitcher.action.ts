import type { UserRecord } from '../../TestUsers.ts';

export const SET_USER = 'SET_USER';

export type Action = { type: typeof SET_USER; payload: UserRecord };