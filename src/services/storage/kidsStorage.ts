import { Temporal } from 'temporal-polyfill';
import type { Sex, UserRecord } from "@myTypes/types.ts";
import { seedKids } from "@services/storage/seedKids.ts";

const STORAGE_KEY = 'wifmk.kids.v1';

type StoredKid = Omit<UserRecord, 'birthday'> & { birthday: string };
type StoredData = { kids: StoredKid[]; nextId: number };

export type KidsData = { kids: UserRecord[]; nextId: number };

const SEXES: readonly Sex[] = ['M', 'F'];

/**
 * First-run fallback. In development we seed demo kids for convenience; in a
 * production build the app starts empty so it never re-populates after a user
 * deliberately deletes everyone.
 */
function emptyOrSeed(): KidsData {
    return import.meta.env.DEV ? seedKids() : { kids: [], nextId: 1 };
}

/** Validate one stored record, returning a typed UserRecord or null if invalid. */
function parseStoredKid(value: unknown): UserRecord | null {
    if (typeof value !== 'object' || value === null) return null;
    const k = value as Record<string, unknown>;

    if (typeof k.id !== 'number' || !Number.isFinite(k.id)) return null;
    if (typeof k.name !== 'string') return null;
    if (typeof k.sex !== 'string' || !SEXES.includes(k.sex as Sex)) return null;
    if (typeof k.calculatedPercentile !== 'number') return null;
    if (k.heightNow !== undefined && typeof k.heightNow !== 'number') return null;
    if (typeof k.birthday !== 'string') return null;

    let birthday: Temporal.PlainDate;
    try {
        birthday = Temporal.PlainDate.from(k.birthday);
    } catch {
        return null;
    }

    return {
        id: k.id,
        name: k.name,
        sex: k.sex as Sex,
        birthday,
        heightNow: k.heightNow as number | undefined,
        calculatedPercentile: k.calculatedPercentile,
    };
}

/**
 * Parse + validate a serialized payload (from localStorage or an imported
 * backup). Drops individual malformed kids; returns null only when the
 * top-level shape is unusable. nextId is repaired to always exceed every id.
 */
function parseStoredData(raw: string): KidsData | null {
    let data: unknown;
    try {
        data = JSON.parse(raw);
    } catch {
        return null;
    }
    if (typeof data !== 'object' || data === null) return null;

    const d = data as Record<string, unknown>;
    if (!Array.isArray(d.kids)) return null;

    const kids = d.kids
        .map(parseStoredKid)
        .filter((k): k is UserRecord => k !== null);

    const maxId = kids.reduce((m, k) => Math.max(m, k.id), 0);
    const nextId = typeof d.nextId === 'number' && d.nextId > maxId ? d.nextId : maxId + 1;

    return { kids, nextId };
}

function toStoredData(kids: UserRecord[], nextId: number): StoredData {
    return {
        kids: kids.map(k => ({ ...k, birthday: k.birthday.toString() })),
        nextId,
    };
}

export function loadKids(): KidsData {
    let raw: string | null;
    try {
        raw = localStorage.getItem(STORAGE_KEY);
    } catch {
        // localStorage unavailable (e.g. blocked in private mode).
        return emptyOrSeed();
    }
    if (raw === null) return emptyOrSeed();

    return parseStoredData(raw) ?? emptyOrSeed();
}

export function saveKids(kids: UserRecord[], nextId: number): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStoredData(kids, nextId)));
    } catch {
        // Quota exceeded or storage unavailable; state stays in memory.
    }
}

/** Pretty-printed JSON for a user-facing backup file. */
export function serializeKids(kids: UserRecord[], nextId: number): string {
    return JSON.stringify(toStoredData(kids, nextId), null, 2);
}

/** Parse an imported backup file. Throws if the payload is unusable. */
export function parseKidsBackup(raw: string): KidsData {
    const parsed = parseStoredData(raw);
    if (!parsed) throw new Error('Ugyldig sikkerhetskopi-fil.');
    return parsed;
}
