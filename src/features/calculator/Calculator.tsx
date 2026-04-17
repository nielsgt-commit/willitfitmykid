import {useKids} from "@hooks/context/KidsContext.tsx";
import type {State} from "@/types/types.ts";
import {initialState} from "@features/calculator/initialState.tsx";
import {kidsClothingTable} from "@data/sizeCharts/kids_clothing_sizes.ts";
import {findSizeForHeight} from "@utils/size.utils.ts";
import {getEffectiveHeight} from "@utils/growth.utils.ts";
import {useEffect, useReducer} from "react";
import calculatorReducer from "@features/calculator/calculator.reducer.ts";
import {SET_SIZE_FOR_HEIGHT} from "@features/calculator/size/size.action.ts";
import Size from "@features/calculator/size/Size.tsx";
import {Result} from "@features/calculator/result/Result.tsx";


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