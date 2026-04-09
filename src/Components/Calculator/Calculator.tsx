// Components
import Size from "./Size/Size.tsx";
import {UserSwitcher} from "../UserSwitcher/UserSwitcher.tsx";
// State

import {useReducer} from "react";
import  { initialState } from "./initialState.tsx";
import calculatorReducer from "./calculator.reducer.ts";
import {Result} from "./Result/Result.tsx";

export default function Calculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    return (
        <>
              <Size size={state.size} conversions={state.conversions} dispatch={dispatch} />
              <Result selectedUser={state.selectedUser}  />
              <UserSwitcher state={state} dispatch={dispatch} />
        </>
    )
}