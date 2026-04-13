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


              <Size size={state.size} inputRegion={state.inputRegion} conversions={state.conversions} dispatch={dispatch} />
              <Result size={state.size} />
        </>
    )
}