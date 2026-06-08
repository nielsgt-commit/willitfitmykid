import { useEffect, useReducer, useState } from "react";
import Size from "@features/calculator/size/Size.tsx";
import { ResultPanel } from "@features/calculator/result/resultViews/ResultPanel.tsx";
import { MyKids } from "@features/myKids/MyKids.tsx";
import { AppLayout } from "../components/layouts/AppLayout.tsx";
import { Splash } from "./Splash.tsx";
import { Tabs, type Tab } from "./Tabs.tsx";
import { Gallery } from "./gallery/Gallery.tsx";
import { CalculatorView } from "./gallery/CalculatorView.tsx";
import { SharePage } from "./gallery/SharePage.tsx";
import { KidFilter } from "@features/calculator/result/kidFilter/KidFilter.tsx";
import { KidCards } from "@features/myKids/kidCards/KidCards.tsx";
import { SeasonFilter } from "@features/calculator/result/seasonFilter/SeasonFilter.tsx";
import { useSeasonFilter } from "@features/calculator/result/useSeasonFilter.ts";
import { useKids } from "@hooks/context/KidsContext.tsx";
import { useKidFilter } from "@hooks/context/KidFilterContext.tsx";
import calculatorReducer from "@features/calculator/calculator.reducer.ts";
import { initialState } from "@features/calculator/initialState.tsx";
import { kidsClothingTable } from "@data/sizeCharts/kids_clothing_sizes.ts";
import { selectSizeForYoungest } from "@utils/size.utils.ts";
import type { Season, State } from "@/types/types.ts";
import type { UserRecord } from "@myTypes/types.ts";

function getInitialCalcState(kids: UserRecord[]): State {
    const row = selectSizeForYoungest(kidsClothingTable, kids);
    if (!row) {
        return { ...initialState, size: '56', conversions: kidsClothingTable['56']?.conversions ?? initialState.conversions };
    }
    return { ...initialState, size: row.key, conversions: row.conversions };
}

type CalculatorProps = {
    kids: UserRecord[];
    activeSeasons: Set<Season>;
};

/**
 * Owns the calculator's size state. Mounted with a `key` derived from the kid
 * ids (see AppContent), so adding or removing a kid re-initialises the size to
 * fit the youngest — while editing an existing kid keeps the manual selection.
 */
function Calculator({ kids, activeSeasons }: CalculatorProps) {
    const [calcState, calcDispatch] = useReducer(calculatorReducer, kids, getInitialCalcState);

    return (
        <CalculatorView
            result={<ResultPanel size={calcState.size} activeSeasons={activeSeasons} />}
            size={
                <Size
                    size={calcState.size}
                    inputRegion={calcState.inputRegion}
                    conversions={calcState.conversions}
                    dispatch={calcDispatch}
                />
            }
        />
    );
}

export function AppContent() {
    const [tab, setTab] = useState<Tab>("results");
    const [showSplash, setShowSplash] = useState(true);
    const { kids } = useKids();
    const { activeKidIds, toggleKid } = useKidFilter();
    const { activeSeasons, toggleSeason } = useSeasonFilter();

    useEffect(() => {
        const id = setTimeout(() => setShowSplash(false), 1000);
        return () => clearTimeout(id);
    }, []);

    if (showSplash) return <Splash />;

    const showResults = tab === "results";
    const kidsKey = kids.map(k => k.id).join(',');

    const calculator = (
        <Calculator key={kidsKey} kids={kids} activeSeasons={activeSeasons} />
    );

    return (
        <AppLayout
            header={
                <>
                    <Tabs value={tab} onChange={setTab} />
                    {!showResults && <MyKids />}
                </>
            }
            toggle={null}
            main={
                showResults
                    ? kids.length > 0
                        ? <Gallery labels={["Kalkulator", "Størrelser"]} pages={[calculator, <SharePage key="share" kids={kids} />]} />
                        : calculator
                    : undefined
            }
            sheet={showResults ? (
                <>
                    <KidCards kids={kids} />
                    <p>Viser resultater som passer i sesong</p>
                    <SeasonFilter activeSeasons={activeSeasons} onToggle={toggleSeason} />
                    <KidFilter kids={kids} activeKidIds={activeKidIds} onToggle={toggleKid} />
                </>
            ) : undefined}
        />
    );
}
