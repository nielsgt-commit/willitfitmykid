import { useMemo } from "react";
import type { Season, State } from "@/types/types.ts";
import { useKids } from "@hooks/context/KidsContext.tsx";
import { useKidFilter } from "@hooks/context/KidFilterContext.tsx";
import { willFitWhen } from "@utils/fit.utils.ts";
import { selectFiltered, selectFilteredByKids } from "@features/calculator/result/result.selectors.ts";
import { perKidExpandView } from "@features/calculator/result/altViews/perKidExpand/PerKidExpandView.tsx";

type ResultPanelProps = Pick<State, "size"> & { activeSeasons: Set<Season> };

const ResultView = perKidExpandView.Component;

/**
 * Computes the fit data once and renders the per-kid result view (rows that
 * expand on click to reveal each kid's full season range).
 */
export function ResultPanel({ size, activeSeasons }: ResultPanelProps) {
    const { kids } = useKids();
    const { activeKidIds } = useKidFilter();

    const results = useMemo(() => willFitWhen(kids, size), [kids, size]);
    const filteredByKids = useMemo(
        () => selectFilteredByKids(results, activeKidIds),
        [results, activeKidIds],
    );
    const filtered = useMemo(
        () => selectFiltered(filteredByKids, activeSeasons),
        [filteredByKids, activeSeasons],
    );

    return (
        <ResultView
            size={size}
            kids={kids}
            activeKidIds={activeKidIds}
            activeSeasons={activeSeasons}
            results={results}
            filteredByKids={filteredByKids}
            filtered={filtered}
        />
    );
}
