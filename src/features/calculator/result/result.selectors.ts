import type {Season} from "../../../types/types.ts";
import type {willFitWhen} from "../../../utils/fit.utils.ts";
import {resultIncludesSeason} from "./result.utils.ts";

type FitResult = ReturnType<typeof willFitWhen>[number];

export function selectFilteredByKids(results: FitResult[], activeKidIds: Set<number>): FitResult[] {
    return results.filter(r => activeKidIds.has(r.user.id));
}

export function selectFiltered(filteredByKids: FitResult[], activeSeasons: Set<Season>): FitResult[] {
    if (activeSeasons.size === 0) return [];
    return filteredByKids.filter(r => [...activeSeasons].some(s => resultIncludesSeason(r, s)));
}