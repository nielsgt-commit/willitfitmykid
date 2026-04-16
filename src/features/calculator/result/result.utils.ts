import {Temporal} from "temporal-polyfill";
import type {Season} from "../../../types/types.ts";
import {getSeason, willFitWhen} from "../../../utils/fit.utils.ts";
import {SEASONS} from "./seasonRange/season.constants.ts";

export function resultIncludesSeason(result: ReturnType<typeof willFitWhen>[number], season: Season): boolean {
    const {start, end} = result;
    const startIdx = SEASONS.indexOf(start.season);
    const endIdx = SEASONS.indexOf(end.season);
    const targetIdx = SEASONS.indexOf(season);

    if (start.year === end.year) {
        return startIdx <= targetIdx && targetIdx <= endIdx;
    }

    for (let year = start.year; year <= end.year; year++) {
        const fromIdx = year === start.year ? startIdx : 0;
        const toIdx = year === end.year ? endIdx : SEASONS.length - 1;
        if (fromIdx <= targetIdx && targetIdx <= toIdx) return true;
    }
    return false;
}

export function currentSeason(): Season {
    return getSeason(Temporal.Now.plainDateISO().month);
}