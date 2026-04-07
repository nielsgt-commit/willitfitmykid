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

    const [state1, dispatch1] = useReducer(monthsReducer, initialState);
    const [state2, dispatch2] = useReducer(heightReducer, initialState);
    const [state3, dispatch3] = useReducer(percentileReducer, initialState);
    const [state4, dispatch4] = useReducer(sizeReducer, initialState);

   // const [state, dispatch] = useReducer(calculatorReducer, initialState);
    return (
        <>
               <p> {(state1.months*2+state2.height)} </p>
              <Months months={state1.months} dispatch={dispatch1} />
              <Height height={state2.height} dispatch={dispatch2} />
              <Percentile percentile={state3.percentile } dispatch={dispatch3} />
              <Size size={state4.size} dispatch={dispatch4} />
         </>
    )
}