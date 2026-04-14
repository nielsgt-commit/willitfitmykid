import { growthDataBoys } from '../Data/GrowthCharts/growthDataBoys';
import { growthDataGirls } from '../Data/GrowthCharts/growthDataGirls';
import type {MonthEntry} from "../Components/types.ts";

export type Gender = 'boys' | 'girls';
export type Percentile = 'P1' | 'P3' | 'P5' | 'P10' | 'P15' | 'P25' | 'P50' | 'P75' | 'P85' | 'P90' | 'P95' | 'P97';

const PERCENTILES: Percentile[] = ['P1', 'P3', 'P5', 'P10', 'P15', 'P25', 'P50', 'P75', 'P85', 'P90', 'P95', 'P97'];

function chartData(gender: Gender): MonthEntry[] {
  return gender === 'girls' ? growthDataGirls : growthDataBoys;
}

/** Returns length/height (cm) for a given month, percentile and gender */
export function getLengthByMonthAndPercentile(
  month: number,
  percentile: Percentile,
  gender: Gender
): number | undefined {
  return chartData(gender).find(e => e.Month === month)?.[percentile];
}

/**
 * Returns the closest percentile for a given month and length.
 * Finds the percentile column whose value is nearest to the provided length.
 */
export function getPercentileByMonthAndLength(
  month: number,
  length: number,
  gender: Gender
): Percentile | undefined {
  const entry = chartData(gender).find(e => e.Month === month);
  if (!entry) return undefined;

  return PERCENTILES.reduce<Percentile>((closest, p) => {
    return Math.abs(entry[p] - length) < Math.abs(entry[closest] - length) ? p : closest;
  }, PERCENTILES[0]);
}