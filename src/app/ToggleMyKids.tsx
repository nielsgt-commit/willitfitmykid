import { useReducer } from "react";
import { MyKids } from "@features/myKids/MyKids.tsx";
import { useKids } from "@hooks/context/KidsContext.tsx";
import appReducer from "@app/app.reducer.ts";
import { TOGGLE_MY_KIDS, OPEN_ADD_FORM, CLOSE_MY_KIDS } from "@app/app.action.ts";

export function ToggleMyKids() {
    const [state, dispatch] = useReducer(appReducer, { showMyKids: false, openAddForm: false });
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
            {state.showMyKids && (
                <MyKids
                    initialAdding={state.openAddForm}
                    onCancelFirstAdd={() => dispatch({ type: CLOSE_MY_KIDS })}
                />
            )}
        </>
    );
}