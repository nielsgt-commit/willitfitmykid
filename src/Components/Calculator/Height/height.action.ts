export const INCREMENT_HEIGHT = 'INCREMENT_HEIGHT';
export const DECREMENT_HEIGHT = 'DECREMENT_HEIGHT';
export const SET_HEIGHT = 'SET_HEIGHT';

export type Action =    // Height actions
    | { type : INCREMENT_HEIGHT}
    | { type : DECREMENT_HEIGHT}
    | { type : SET_HEIGHT, payload : number}
    ;