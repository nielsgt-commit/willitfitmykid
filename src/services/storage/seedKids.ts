import { Temporal } from 'temporal-polyfill';
import type { UserRecord } from '@myTypes/types.ts';

/**
 * Demo seed used as the empty-state fallback in loadKids() when there is no
 * saved data yet. Birthdays are computed relative to today so the ages stay
 * roughly 5 years, 3 years, and 8 months. Each kid sits on a different growth
 * percentile, and the ids are spread across the KID_COLORS palette
 * (id % 6 -> 1 blue, 3 orange, 5 teal) so the avatars are visually distinct.
 * Heights are derived from each percentile curve (heightNow left unset).
 * Remove the seedKids() fallback in kidsStorage.ts to return to a truly empty
 * first run.
 */
export function seedKids(): { kids: UserRecord[]; nextId: number } {
    const today = Temporal.Now.plainDateISO();
    const kids: UserRecord[] = [
        { id: 1, name: 'Nora', sex: 'F', birthday: today.subtract({ years: 5 }), calculatedPercentile: 50 },
        { id: 3, name: 'Oskar', sex: 'M', birthday: today.subtract({ years: 3 }), calculatedPercentile: 25 },
        { id: 5, name: 'Iben', sex: 'F', birthday: today.subtract({ months: 8 }), calculatedPercentile: 90 },
    ];
    return { kids, nextId: 6 };
}
