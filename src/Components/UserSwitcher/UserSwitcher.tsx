import type {State} from "../types.ts";
import {NEXT_USER, PREV_USER} from "./UserSwitcher.action.ts";


interface UserSwitcherProps {
    state: State;
    dispatch: React.Dispatch<any>;
}

export function UserSwitcher({ state, dispatch}: UserSwitcherProps) {
    return (
    <>
            <button onClick={() => dispatch( { type: PREV_USER })}> Prev user </button>
            <p> Du ser på klær til  {state.selectedUser.name}</p>
            <button onClick={() => dispatch( { type: NEXT_USER })}> Next user </button>
    </>


    )
}