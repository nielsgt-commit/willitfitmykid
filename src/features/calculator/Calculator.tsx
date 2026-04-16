// Components
import Size from "./size/Size.tsx";
// State

import {useReducer, useEffect} from "react";
import  { initialState } from "./initialState.tsx";
import calculatorReducer from "./calculator.reducer.ts";
import {Result} from "./result/Result.tsx";
import { useKids } from "../../hooks/context/KidsContext.tsx";
import { kidsClothingTable } from "../../data/sizeCharts/kids_clothing_sizes.ts";
import { findSizeForHeight } from "../../utils/size.utils.ts";
import { SET_SIZE_FOR_HEIGHT } from "./size/size.action.ts";
import { getEffectiveHeight } from "../../utils/growth.utils.ts";
import type { State } from "../../types/types.ts";

function getInitialState(kids: ReturnType<typeof useKids>['kids']): State {
    if (kids.length === 0) {
        return { ...initialState, size: '56', conversions: kidsClothingTable['56']?.conversions ?? initialState.conversions };
    }
    const youngest = kids.reduce((a, b) =>
        a.birthday.toString() > b.birthday.toString() ? a : b
    );
    const row = findSizeForHeight(kidsClothingTable, getEffectiveHeight(youngest));
    return { ...initialState, size: row.key, conversions: row.conversions };
}

export default function Calculator() {
    const { kids } = useKids();
    const [state, dispatch] = useReducer(calculatorReducer, kids, getInitialState);

    useEffect(() => {
        if (kids.length === 0) return;
        const youngest = kids.reduce((a, b) =>
            a.birthday.toString() > b.birthday.toString() ? a : b
        );
        const row = findSizeForHeight(kidsClothingTable, getEffectiveHeight(youngest));
        dispatch({ type: SET_SIZE_FOR_HEIGHT, payload: row.key });
    }, [kids.length]);

    return (
        <>


              <Size size={state.size} inputRegion={state.inputRegion} conversions={state.conversions} dispatch={dispatch} />
              <Result size={state.size} />
        </>
    )
}