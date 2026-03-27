import Size from "./Size/Size.tsx";
import Percentile from "./Percentile/Percentile.tsx";
import Height from "./Height/Height.tsx";
import Age from "./Age/Age.tsx";
import {useReducer} from "react";

import calculatorReducer from "./calculatorReducer.ts";
import  { initialState } from "./initialState.tsx";


export default function Calculator() {
 const [state, dispatch] = useReducer(calculatorReducer, initialState)

    return (
        <>
              <Age age={state.age} dispatch={dispatch} />
              <Height height={state.height} dispatch={dispatch} />
              <Percentile percentile={state.percentile } dispatch={dispatch} />
              <Size size={state.size} dispatch={dispatch} />
         </>
    )
}