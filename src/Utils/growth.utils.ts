import { growthDataBoys } from '../Data/GrowthCharts/growthDataBoys';
import { growthDataGirls } from '../Data/GrowthCharts/growthDataGirls';
import type {Sex, MonthEntry, Percentile, UserRecord} from "../types.ts";
import {PERCENTILES} from "../constants.ts";
import { monthsSinceBirth } from './age.utils.ts';

function chartData(sex: Sex): MonthEntry[] {
  return sex === 'F' ? growthDataGirls : growthDataBoys;
}

/** Returns length/height (cm) for a given month, percentile, and sex */
export function getLengthByMonthAndPercentile(
  month: number,
  percentile: Percentile,
  sex: Sex
): number | undefined {
  return chartData(sex).find(e => e.Month === month)?.[percentile];
}

/**
 * Returns the closest percentile for a given month and length.
 * Finds the percentile column whose value is nearest to the provided length.
 */
/**
 * Returns the effective height for a kid.
 * Uses heightNow if set as a user override, otherwise derives from growth curve using today's age.
 */
export function getEffectiveHeight(kid: UserRecord): number {
    if (kid.heightNow !== undefined) return kid.heightNow;
    const months = monthsSinceBirth(kid.birthday);
    return getLengthByMonthAndPercentile(months, `P${kid.calculatedPercentile}` as Percentile, kid.sex) ?? 0;
}

export function getPercentileByMonthAndLength(
  month: number,
  length: number,
  sex: Sex
): Percentile | undefined {
  const entry = chartData(sex).find(e => e.Month === month);
  if (!entry) return undefined;

  return PERCENTILES.reduce<Percentile>((closest, p) => {
    return Math.abs(entry[p] - length) < Math.abs(entry[closest] - length) ? p : closest;
  }, PERCENTILES[0]);
}