import { Temporal } from 'temporal-polyfill';
import type {UserRecord} from "@myTypes/types.ts";

const STORAGE_KEY = 'wifmk.kids.v1';

type StoredKid = Omit<UserRecord, 'birthday'> & { birthday: string };
type StoredData = { kids: StoredKid[]; nextId: number };

export function loadKids(): { kids: UserRecord[]; nextId: number } {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { kids: [], nextId: 1 };

        const data: StoredData = JSON.parse(raw);
        return {
            kids: data.kids.map(k => ({
                ...k,
                birthday: Temporal.PlainDate.from(k.birthday),
            })),
            nextId: data.nextId,
        };
    } catch {
        return { kids: [], nextId: 1 };
    }
}

export function saveKids(kids: UserRecord[], nextId: number): void {
    const data: StoredData = {
        kids: kids.map(k => ({
            ...k,
            birthday: k.birthday.toString(),
        })),
        nextId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}