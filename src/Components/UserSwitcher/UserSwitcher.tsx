import type {State} from "../types.ts";

interface UserSwitcherProps {
    state: State;
    dispatch: React.Dispatch<any>;
}

export function UserSwitcher({ state, dispatch}: UserSwitcherProps) {
    return (
    <>
            <button onClick={() => dispatch( { type: PREV_USER })}> Prev user </button>
            <p>  User name </p>
            <button onClick={() => dispatch( { type: NEXT_USER })}> Next user </button>
    </>


    )
}