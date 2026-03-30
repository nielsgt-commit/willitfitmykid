// ProfileActions
export const SET_NAME = 'SET_NAME';
export const SET_BIRTHDAY = 'SET_BIRTHDAY';
export const SET_SEX = 'SET_SEX';
export const NEW_CHILD = 'NEW_CHILD';
export const DELETE_CHILD = 'DELETE_CHILD';

export type ProfileAction =
    | {type: SET_NAME, payload: string}
    | {type: SET_BIRTHDAY, payload: Date}
    | {type: SET_SEX, payload: string}
    | {type: NEW_CHILD}
    | {type: DELETE_CHILD}