import { useEffect, useReducer, useState } from "react";
import Size from "@features/calculator/size/Size.tsx";
import { SizeConversions } from "@features/calculator/size/SizeConversions.tsx";
import { Result } from "@features/calculator/result/Result.tsx";
import { MyKidsCard } from "@features/myKids/myKidsCard/MyKidsCard.tsx";
import { AppLayout } from "../components/layouts/AppLayout.tsx";
import { Splash } from "./Splash.tsx";
import { KidFilter } from "@features/calculator/result/kidFilter/KidFilter.tsx";
import { useKids } from "@hooks/context/KidsContext.tsx";
import { useKidFilter } from "@hooks/context/KidFilterContext.tsx";
import appReducer from "./app.reducer.ts";
import { CLOSE_MY_KIDS } from "./app.action.ts";
import calculatorReducer from "@features/calculator/calculator.reducer.ts";
import { initialState } from "@features/calculator/initialState.tsx";
import { kidsClothingTable } from "@data/sizeCharts/kids_clothing_sizes.ts";
import { findSizeForHeight } from "@utils/size.utils.ts";
import { getEffectiveHeight } from "@utils/growth.utils.ts";
import { SET_SIZE_FOR_HEIGHT } from "@features/calculator/size/size.action.ts";
import type { State } from "@/types/types.ts";
import type { UserRecord } from "@myTypes/types.ts";

function getInitialCalcState(kids: UserRecord[]): State {
    if (kids.length === 0) {
        return { ...initialState, size: '56', conversions: kidsClothingTable['56']?.conversions ?? initialState.conversions };
    }
    const youngest = kids.reduce((a, b) => a.birthday.toString() > b.birthday.toString() ? a : b);
    const row = findSizeForHeight(kidsClothingTable, getEffectiveHeight(youngest));
    return { ...initialState, size: row.key, conversions: row.conversions };
}

export function AppContent() {
    const [appState, appDispatch] = useReducer(appReducer, { showMyKids: false, openAddForm: false });
    const [showSplash, setShowSplash] = useState(true);
    const { kids } = useKids();
    const { activeKidIds, toggleKid } = useKidFilter();
    const [calcState, calcDispatch] = useReducer(calculatorReducer, kids, getInitialCalcState);

    useEffect(() => {
        const id = setTimeout(() => setShowSplash(false), 1000);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (kids.length === 0) return;
        const youngest = kids.reduce((a, b) => a.birthday.toString() > b.birthday.toString() ? a : b);
        const row = findSizeForHeight(kidsClothingTable, getEffectiveHeight(youngest));
        calcDispatch({ type: SET_SIZE_FOR_HEIGHT, payload: row.key });
    }, [kids.length]);

    if (showSplash) return <Splash />;

    const showCalculator = !appState.showMyKids;

    return (
        <AppLayout
            header={<h6></h6>}
            toggle={
                <MyKidsCard
                    state={appState}
                    dispatch={appDispatch}
                    initialAdding={appState.openAddForm}
                    onCancelFirstAdd={() => appDispatch({ type: CLOSE_MY_KIDS })}
                />
            }
            chips={showCalculator ? <KidFilter kids={kids} activeKidIds={activeKidIds} onToggle={toggleKid} /> : undefined}
            conversions={showCalculator ? <SizeConversions conversions={calcState.conversions} /> : undefined}
            size={showCalculator ? (
                <Size
                    size={calcState.size}
                    inputRegion={calcState.inputRegion}
                    conversions={calcState.conversions}
                    dispatch={calcDispatch}
                />
            ) : undefined}
            result={showCalculator ? <Result size={calcState.size} /> : undefined}
        />
    );
}