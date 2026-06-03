import {useMemo} from "react";
import type {Season, State} from "@/types/types.ts";
import {useKids} from "@hooks/context/KidsContext.tsx";
import {useKidFilter} from "@hooks/context/KidFilterContext.tsx";
import {willFitWhen} from "@utils/fit.utils.ts";
import {selectFiltered, selectFilteredByKids} from "@features/calculator/result/result.selectors.ts";
import {ResultSummary} from "@features/calculator/result/resultSummary/ResultSummary.tsx";

import styles from './Result.module.css';

type ResultProps = Pick<State, "size"> & { activeSeasons: Set<Season> };
type Verdict = 'fit' | 'nofit' | null;

export function Result({size, activeSeasons}: ResultProps) {
    const {kids} = useKids();
    const {activeKidIds} = useKidFilter();

    const results = useMemo(() => willFitWhen(kids, size), [kids, size]);
    const filteredByKids = useMemo(
        () => selectFilteredByKids(results, activeKidIds),
        [results, activeKidIds]
    );
    const filtered = useMemo(
        () => selectFiltered(filteredByKids, activeSeasons),
        [filteredByKids, activeSeasons]
    );

    let verdict: Verdict = null;
    let content;
    if (kids.length === 0) {
        content = <p>Legg til barn for å finne størrelser som passer og sesong.</p>;
    } else if (filteredByKids.length === 0) {
        verdict = 'nofit';
        content = <p>Ingen av barna i listen</p>;
    } else if (activeSeasons.size === 0) {
        content = <p>Velg sesong i panelet under</p>;
    } else if (filtered.length === 0) {
        verdict = 'nofit';
        content = <p>Ikke i valgte sesonger</p>;
    } else {
        verdict = 'fit';
        content = <ResultSummary results={filtered} filterSeasons={activeSeasons} />;
    }

    return (
        <div className={styles.result}>
            {verdict && (
                <span className={`${styles.badge} ${verdict === 'fit' ? styles.badgeFit : styles.badgeNoFit}`}>
                    {verdict === 'fit' ? '✓ Passer' : '✗ Passer ikke'}
                </span>
            )}
            {content}
        </div>
    );
}
