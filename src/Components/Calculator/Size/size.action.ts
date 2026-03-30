export const INCREMENT_SIZE = 'INCREMENT_SIZE';
export const DECREMENT_SIZE = 'DECREMENT_SIZE';
export const SET_SIZE = 'SET_SIZE';


export type Action =
    | {type: INCREMENT_SIZE}
    | {type: DECREMENT_SIZE}
    | {type: SET_SIZE, payload: number}
    ;