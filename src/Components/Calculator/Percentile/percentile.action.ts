export const INCREMENT_PERCENTILE = 'INCREMENT_PERCENTILE';
export const DECREMENT_PERCENTILE = 'DECREMENT_PERCENTILE';
export const SET_PERCENTILE = 'SET_PERCENTILE';

export type Action =    // Percentile actions
    | { type : INCREMENT_PERCENTILE}
    | { type : DECREMENT_PERCENTILE}
    | { type : SET_PERCENTILE, payload : number}
    ;