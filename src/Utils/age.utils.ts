import { Temporal } from 'temporal-polyfill';

export function monthsSinceBirth(birthday: Temporal.PlainDate): number {
    return Temporal.Now.plainDateISO().since(birthday, { largestUnit: 'months' }).months;
}