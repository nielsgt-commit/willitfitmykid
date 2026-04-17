import * as React from "react";
import {useMemo} from "react";
import type {State} from "@/types/types.ts";
import {useKids} from "@hooks/context/KidsContext.tsx";
import {useResultFilters} from "@features/calculator/result/useResultFilters.ts";
import {willFitWhen} from "@utils/fit.utils.ts";
import {selectFiltered, selectFilteredByKids} from "@features/calculator/result/result.selectors.ts";
import styles from "@features/MyKids.module.css";
import {ResultList} from "@features/calculator/result/resultList/ResultList.tsx";
import {SeasonFilter} from "@features/calculator/result/seasonFilter/SeasonFilter.tsx";
import {KidFilter} from "@features/calculator/result/kidFilter/KidFilter.tsx";


export function Result({size}: Pick<State, "size">) {
    const {kids} = useKids();
    const {activeSeasons, activeKidIds, toggleSeason, toggleKid} = useResultFilters(kids);

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
            <p className={styles.emptyMessage}>Denne størrelsen passer ikke noen av barna i listen</p>
        ) : (
            <p className={styles.resultsMessage}>
                Dette plagget passer trolig{" "}
                {activeSeasons.size > 0 && (
                    filtered.length === 0
                        ? <span>ikke i valgte sesonger</span>
                        : <ResultList results={filtered} filterSeasons={activeSeasons} />
                )}
            </p>
        );

    return (
        <div className={styles.filterContainer}>
            <p> Viser resultater som passer i sesong </p>
            <SeasonFilter activeSeasons={activeSeasons} onToggle={toggleSeason} />
            <p> Viser resultater for barn </p>
            <KidFilter kids={kids} activeKidIds={activeKidIds} onToggle={toggleKid} />
            {content}
        </div>
    );
}