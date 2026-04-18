import type { Dispatch } from "react";
import { useKids } from "@hooks/context/KidsContext.tsx";
import type { AppState } from "@app/app.reducer.ts";
import { TOGGLE_MY_KIDS, OPEN_ADD_FORM, type Action } from "@app/app.action.ts";

type ToggleMyKidsProps = {
    state: AppState;
    dispatch: Dispatch<Action>;
};

export function ToggleMyKids({ state, dispatch }: ToggleMyKidsProps) {
    const { kids } = useKids();

    return (
        <>
            {kids.length === 0 && !state.showMyKids && (
                <button onClick={() => dispatch({ type: OPEN_ADD_FORM })}>Legg til barn</button>
            )}
            {kids.length > 0 && (
                <button onClick={() => dispatch({ type: TOGGLE_MY_KIDS })}>
                    {state.showMyKids ? 'Skjul mine barn' : 'Vis mine barn'}
                </button>
            )}
        </>
    );
}