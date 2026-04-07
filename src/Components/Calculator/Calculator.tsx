// Components
import Size from "./Size/Size.tsx";
import Percentile from "./Percentile/Percentile.tsx";
import Height from "./Height/Height.tsx";
import Months from "./Months/Months.tsx";
// Reducers
// TODO import calculatorReducer from "./calculator.reducer.ts";

import {useReducer} from "react";
import  { initialState } from "./initialState.tsx";
import {monthsReducer} from "./Months/months.Reducer.ts";
import {heightReducer} from "./Height/height.reducer.ts";
import {percentileReducer} from "./Percentile/percentile.reducer.ts";
import {sizeReducer} from "./Size/size.reducer.ts";
import calculatorReducer from "./calculator.reducer.ts";

export default function Calculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);


    return (
        <>
               <p> {(state.months*2+state.height)} </p>
              <Months months={state.months} dispatch={dispatch} />
              <Height height={state.height} dispatch={dispatch} />
              <Percentile percentile={state.percentile } dispatch={dispatch} />
              <Size size={state.size} dispatch={dispatch} />
         </>
    )
}