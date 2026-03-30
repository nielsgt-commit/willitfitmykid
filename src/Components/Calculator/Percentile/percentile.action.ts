export type Action =    // Percentile actions
    | { type : INCREMENT_PERCENTILE, payload: number}
    | { type : DECREMENT_PERCENTILE, payload: number}
    | { type : SET_PERCENTILE, payload : number}
    ;
