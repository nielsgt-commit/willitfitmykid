const INCREMENT_AGE = 'INCREMENT_AGE';
const DECREMENT_AGE = 'DECREMENT_AGE';
const SET_AGE = 'SET_AGE';


const INCREMENT_HEIGHT = 'INCREMENT_HEIGHT';
const DECREMENT_HEIGHT = 'DECREMENT_HEIGHT';
const SET_HEIGHT = 'SET_HEIGHT';

const INCREMENT_PERCENTILE = 'INCREMENT_PERCENTILE';
const DECREMENT_PERCENTILE = 'DECREMENT_PERCENTILE';
const SET_PERCENTILE = 'SET_PERCENTILE';

const GET_DATE = 'GET_DATE';
const SET_DATE = 'SET_DATE';

const NEXT_YEAR = 'NEXT_YEAR';
const PREV_YEAR = 'PREV_YEAR';

const CALCULATE_HEIGHT = 'CALCULATE_HEIGHT';
const CALCULATE_AGE = 'CALCULATE_AGE';
const CALCULATE_PERCENTILE = 'CALCULATE_PERCENTILE';
const CALCULATE_SIZE = 'CALCULATE_SIZE';


type Action =
    // Age actions
    | { type : INCREMENT_AGE}
    | { type : DECREMENT_AGE}
    | { type : SET_AGE, payload : number}

    // Height actions
    | { type : INCREMENT_HEIGHT}
    | { type : DECREMENT_HEIGHT}
    | { type : SET_HEIGHT, payload : number}

    // Percentile actions
    | { type : INCREMENT_PERCENTILE, payload: number}
    | { type : DECREMENT_PERCENTILE, payload: number}
    | { type : SET_PERCENTILE, payload : number}

    // Date time action
    | { type : GET_DATE }
    | { type : SET_DATE, payload : Date}

    // Year actions
    | { type : NEXT_YEAR }
    | { type : PREV_YEAR }

    // Size actions
    | { type : SET_SIZE, payload : number}

    // Calculations actions
    | {type : CALCULATE_HEIGHT}
    | {type : CALCULATE_AGE}
    | {type : CALCULATE_PERCENTILE}
    | {type : CALCULATE_SIZE}
    ;


