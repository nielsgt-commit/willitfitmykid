// Components
import Size from "./Size/Size.tsx";
import Percentile from "./Percentile/Percentile.tsx";
import Height from "./Height/Height.tsx";
import Months from "./Months/Months.tsx";
// State

import {useReducer} from "react";
import  { initialState } from "./initialState.tsx";
import calculatorReducer from "./calculator.reducer.ts";
import {UserSwitcher} from "../UserSwitcher/UserSwitcher.tsx";
export default function Calculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    return (
        <>
              <UserSwitcher />
              <Size size={state.size} conversions={state.conversions} dispatch={dispatch} />
              <Height height={state.height} dispatch={dispatch} />
              <Percentile percentile={state.percentile } dispatch={dispatch}/>
              <Months months={state.months} dispatch={dispatch} />
         </>
    )
}