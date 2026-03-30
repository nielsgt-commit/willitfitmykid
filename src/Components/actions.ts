// ProfileActions
export const SET_NAME = 'SET_NAME';
export const SET_BIRTHDAY = 'SET_BIRTHDAY';
export const SET_SEX = 'SET_SEX';
export const NEW_CHILD = 'NEW_CHILD';
export const DELETE_CHILD = 'DELETE_CHILD';

// Actions (calculator)








export const INCREMENT_PERCENTILE = 'INCREMENT_PERCENTILE';
export const DECREMENT_PERCENTILE = 'DECREMENT_PERCENTILE';
export const SET_PERCENTILE = 'SET_PERCENTILE';

export const GET_DATE = 'GET_DATE';
export const SET_DATE = 'SET_DATE';

export const NEXT_YEAR = 'NEXT_YEAR';
export const PREV_YEAR = 'PREV_YEAR';

export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';

export const NEXT_SEASON = 'NEXT_SEASON';
export const PREV_SEASON = 'PREV_SEASON';

export const INCREMENT_SIZE = 'INCREMENT_SIZE';
export const DECREMENT_SIZE = 'DECREMENT_SIZE';
export const SET_SIZE = 'SET_SIZE';

export const CALCULATE_HEIGHT = 'CALCULATE_HEIGHT';
export const CALCULATE_AGE = 'CALCULATE_AGE';
export const CALCULATE_PERCENTILE = 'CALCULATE_PERCENTILE';
export const CALCULATE_SIZE = 'CALCULATE_SIZE';


export type ProfileAction =

    | {type : SET_NAME, payload : string}
    | {type : SET_BIRTHDAY, payload : Date}
    | { type : SET_SEX, payload : string}
    | {type : SET_HEIGHT, payload : number}
    | {type : SET_PERCENTILE, payload : number}
    | {type : NEW_CHILD}
    | {type : DELETE_CHILD}


export type Action =















    // Date time action
    | { type : GET_DATE }
    | { type : SET_DATE, payload : Date}

    // Year actions
    | { type : NEXT_YEAR }
    | { type : PREV_YEAR }

    // Size actions
    | { type : SET_SIZE, payload : number}

export type CalculatorAction =
    // Calculations actions
    | {type : CALCULATE_HEIGHT} // Payload?
    | {type : CALCULATE_AGE}
    | {type : CALCULATE_PERCENTILE}
    | {type : CALCULATE_SIZE}
    ;


