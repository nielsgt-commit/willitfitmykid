import * as React from "react";
import {useMemo} from "react";
import type {State} from "@/types/types.ts";
import {useKids} from "@hooks/context/KidsContext.tsx";
import {useKidFilter} from "@hooks/context/KidFilterContext.tsx";
import {useSeasonFilter} from "@features/calculator/result/useSeasonFilter.ts";
import {willFitWhen} from "@utils/fit.utils.ts";
import {selectFiltered, selectFilteredByKids} from "@features/calculator/result/result.selectors.ts";
import {ResultSummary} from "@features/calculator/result/resultSummary/ResultSummary.tsx";
import {SeasonFilter} from "@features/calculator/result/seasonFilter/SeasonFilter.tsx";

import styles from './Result.module.css';

export function Result({size}: Pick<State, "size">) {
    const {kids} = useKids();
    const {activeKidIds} = useKidFilter();
    const {activeSeasons, toggleSeason} = useSeasonFilter();

    const results = useMemo(() => willFitWhen(kids, size), [kids, size]);
    const filteredByKids = useMemo(
        () => selectFilteredByKids(results, activeKidIds),
        [results, activeKidIds]
    );
    const filtered = useMemo(
        () => selectFiltered(filteredByKids, activeSeasons),
        [filteredByKids, activeSeasons]
    );

    const content: React.ReactNode =
        kids.length === 0 ? (
            <p>Legg til barn for å finne størrelser som passer og sesong.</p>
        ) : filteredByKids.length === 0 ? (
            <p>Denne størrelsen passer ikke noen av barna i listen</p>
        ) : activeSeasons.size === 0 ? null
        : filtered.length === 0 ? (
            <p>Passer ikke i valgte sesonger</p>
        ) : (
            <ResultSummary results={filtered} filterSeasons={activeSeasons} />
        );

    return (
        <div className={styles.result}>
            <p> Viser resultater som passer i sesong </p>
            <SeasonFilter activeSeasons={activeSeasons} onToggle={toggleSeason} />
            {content}
        </div>
    );
}