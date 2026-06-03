import type { ReactNode } from "react";
import type { Season, UserRecord, WillFitWhenResult } from "@myTypes/types.ts";

/**
 * Props handed to every alternative result-presentation view.
 *
 * The harness (ResultViews) computes the fit data once and passes the same
 * bundle to whichever view is selected, so each view only decides *how* to
 * present — never recomputes the fit logic.
 */
export type ResultViewProps = {
    /** Selected EU size key, e.g. "92". */
    size: string;
    /** All kids in the app. */
    kids: UserRecord[];
    /** Ids of kids currently enabled in the kid filter. */
    activeKidIds: Set<number>;
    /** Seasons currently enabled in the season filter. */
    activeSeasons: Set<Season>;
    /** Raw fit results for every kid (unfiltered). */
    results: WillFitWhenResult[];
    /** Results restricted to kids active in the kid filter. */
    filteredByKids: WillFitWhenResult[];
    /** Results restricted to active kids AND active seasons. */
    filtered: WillFitWhenResult[];
};

/**
 * A self-contained, swappable presentation of the results, surfaced as one
 * option in the ResultViews toggle group.
 */
export type ResultViewDescriptor = {
    /** Stable id, used as the toggle value. */
    id: string;
    /** Short Norwegian label shown on the toggle. */
    label: string;
    /** The presentation component. */
    Component: (props: ResultViewProps) => ReactNode;
};
