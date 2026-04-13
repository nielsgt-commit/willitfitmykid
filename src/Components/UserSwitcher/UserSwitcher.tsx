import type { State } from "../types.ts";
import { SET_USER } from "./UserSwitcher.action.ts";
import { useKids } from "../../context/KidsContext.tsx";

interface UserSwitcherProps {
    state: State;
    dispatch: React.Dispatch<any>;
}

export function UserSwitcher({ state, dispatch }: UserSwitcherProps) {
    const { kids } = useKids();

    const cycleUser = (offset: number) => {
        if (kids.length === 0) return;
        const currentIndex = kids.findIndex(k => k.id === state.selectedUser.id);
        const nextIndex = currentIndex === -1
            ? 0
            : (currentIndex + offset + kids.length) % kids.length;
        dispatch({ type: SET_USER, payload: kids[nextIndex] });
    };

    return (
        <>
            <button onClick={() => cycleUser(-1)}>Prev user</button>
            <p>Du ser på klær til {state.selectedUser.name}</p>
            <button onClick={() => cycleUser(1)}>Next user</button>
        </>
    );
}