import { Temporal } from 'temporal-polyfill';

export function monthsSinceBirth(birthday: Temporal.PlainDate): number {
    const duration = Temporal.Now.plainDateISO().since(birthday, { largestUnit: 'months' });
    const totalMonths = duration.years * 12 + duration.months;
    return duration.days >= 15 ? totalMonths + 1 : totalMonths;
}