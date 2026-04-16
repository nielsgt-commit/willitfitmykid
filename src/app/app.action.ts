export const TOGGLE_MY_KIDS = 'TOGGLE_MY_KIDS';
export const OPEN_ADD_FORM = 'OPEN_ADD_FORM';
export const CLOSE_MY_KIDS = 'CLOSE_MY_KIDS';

export type Action =
    | { type: typeof TOGGLE_MY_KIDS }
    | { type: typeof OPEN_ADD_FORM }
    | { type: typeof CLOSE_MY_KIDS }
    ;