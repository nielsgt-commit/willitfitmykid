import { Temporal } from 'temporal-polyfill';
import type { Percentile, Season, UserRecord } from '@myTypes/types.ts';
import { monthsSinceBirth } from '@utils/age.utils.ts';
import { getLengthByMonthAndPercentile } from '@utils/growth.utils.ts';
import { findSizeForHeight } from '@utils/size.utils.ts';
import { kidsClothingTable } from '@data/sizeCharts/kids_clothing_sizes.ts';
import { getSeason } from '@utils/fit.utils.ts';

export type ProjectionPoint = { season: Season; year: number; monthOffset: number };
export type SizeSegment = { size: string; start: ProjectionPoint; end: ProjectionPoint };

/**
 * Projects a kid's clothing size along their growth percentile from now into
 * the future, collapsing consecutive months of the same size into segments.
 * Used by the share-friendly overview.
 */
export function projectSizeSegments(kid: UserRecord, monthsAhead = 36): SizeSegment[] {
    const today = Temporal.Now.plainDateISO();
    const ageNow = monthsSinceBirth(kid.birthday);
    const segments: SizeSegment[] = [];

    for (let m = 0; m <= monthsAhead; m++) {
        const height = getLengthByMonthAndPercentile(
            ageNow + m,
            `P${kid.calculatedPercentile}` as Percentile,
            kid.sex,
        );
        if (height === undefined) continue;

        const size = findSizeForHeight(kidsClothingTable, height).key;
        const date = today.add({ months: m });
        const point: ProjectionPoint = { season: getSeason(date.month), year: date.year, monthOffset: m };

        const last = segments[segments.length - 1];
        if (last && last.size === size) {
            last.end = point;
        } else {
            segments.push({ size, start: point, end: point });
        }
    }

    return segments;
}
