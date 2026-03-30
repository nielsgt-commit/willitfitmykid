import Size from "./Size/Size.tsx";
import Percentile from "./Percentile/Percentile.tsx";
import Height from "./Height/Height.tsx";
import Age from "./Age/Age.tsx";
import {useReducer} from "react";

import calculatorReducer from "./calculator.reducer.ts";
import  { initialState } from "./initialState.tsx";
import {ageReducer} from "./Age/age.reducer.ts";
import {heightReducer} from "./Height/height.reducer.ts";
import {percentileReducer} from "./Percentile/percentile.reducer.ts";
import {sizeReducer} from "./Size/size.reducer.ts";


export default function Calculator() {
    const [state1, dispatch1] = useReducer(ageReducer, initialState);
    const [state2, dispatch2] = useReducer(heightReducer, initialState);
    const [state3, dispatch3] = useReducer(percentileReducer, initialState);
    const [state4, dispatch4] = useReducer(sizeReducer, initialState);

    return (
        <>
              <Age age={state1.age} dispatch={dispatch1} />
              <Height height={state2.height} dispatch={dispatch2} />
              <Percentile percentile={state3.percentile } dispatch={dispatch3} />
              <Size size={state4.size} dispatch={dispatch4} />
         </>
    )
}