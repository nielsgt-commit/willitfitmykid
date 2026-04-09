
export const NEXT_USER = 'NEXT_USER';
export const PREV_USER = 'PREV_USER';


export type Action =
    | {type: NEXT_USER}
    | {type: PREV_USER}
    | {type: EDIT_USER}
    | {type: ADD_USER}
    ;
