export const INCREMENT_AGE = 'INCREMENT_AGE';
export const DECREMENT_AGE = 'DECREMENT_AGE';
export const SET_AGE = 'SET_AGE';

export type Action =
    | { type : INCREMENT_AGE;}
    | { type : DECREMENT_AGE; }
    | { type : SET_AGE; payload : number}
    ;