import { growthDataBoys } from '../Data/GrowthCharts/growthDataBoys';
import { growthDataGirls } from '../Data/GrowthCharts/growthDataGirls';
import type {Sex, MonthEntry, Percentile} from "../types.ts";
import {PERCENTILES} from "../constants.ts";

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