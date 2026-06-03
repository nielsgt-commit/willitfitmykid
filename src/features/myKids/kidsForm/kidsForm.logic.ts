import { Temporal } from 'temporal-polyfill';
import { monthsSinceBirth } from '@utils/age.utils.ts';
import type { Sex, Percentile, UserRecord } from "@myTypes/types.ts";
import { getLengthByMonthAndPercentile, getPercentileByMonthAndLength } from "@utils/growth.utils.ts";

export function suggestPercentile(sex: Sex, birthday: string, height: number): number | undefined {
    if (!birthday || !height) return undefined;
    const months = monthsSinceBirth(Temporal.PlainDate.from(birthday));
    const p = getPercentileByMonthAndLength(months, height, sex);
    return p ? Number(p.replace('P', '')) : undefined;
}

export function suggestHeight(sex: Sex, birthday: string, percentile: number): number | undefined {
    if (!birthday) return undefined;
    const months = monthsSinceBirth(Temporal.PlainDate.from(birthday));
    return getLengthByMonthAndPercentile(months, `P${percentile}` as Percentile, sex);
}

export type EditingUser = {
    name: string;
    sex: Sex;
    birthday: string;
    percentile: number;
    heightNow: string;
};

export const emptyForm: EditingUser = {
    name: '',
    sex: 'F',
    birthday: '',
    percentile: 50,
    heightNow: '',
};

export function toEditingUser(user: UserRecord): EditingUser {
    return {
        name: user.name,
        sex: user.sex,
        birthday: user.birthday.toString(),
        percentile: user.calculatedPercentile,
        heightNow: user.heightNow !== undefined ? String(user.heightNow) : '',
    };
}

export function buildUserRecord(form: EditingUser, derivedField: 'height' | 'percentile'): Omit<UserRecord, 'id'> {
    return {
        name: form.name,
        sex: form.sex,
        birthday: Temporal.PlainDate.from(form.birthday),
        heightNow: derivedField === 'percentile' && form.heightNow ? Number(form.heightNow) : undefined,
        calculatedPercentile: form.percentile,
    };
}

export type FormState = {
    form: EditingUser;
    derivedField: 'height' | 'percentile';
};

export type Action =
    | { type: 'SET_NAME'; value: string }
    | { type: 'SET_SEX'; value: Sex }
    | { type: 'SET_BIRTHDAY'; value: string }
    | { type: 'SET_HEIGHT'; value: string }
    | { type: 'SET_PERCENTILE'; value: number };

export function formReducer(state: FormState, action: Action): FormState {
    const { form, derivedField } = state;

    switch (action.type) {
        case 'SET_NAME':
            return { ...state, form: { ...form, name: action.value } };

        case 'SET_SEX': {
            const sex = action.value;
            if (derivedField === 'height') {
                const suggested = suggestHeight(sex, form.birthday, form.percentile);
                return {
                    ...state,
                    form: { ...form, sex, heightNow: suggested !== undefined ? String(suggested) : form.heightNow },
                };
            }
            const height = Number(form.heightNow);
            const suggested = height > 0 ? suggestPercentile(sex, form.birthday, height) : undefined;
            return {
                ...state,
                form: { ...form, sex, percentile: suggested ?? form.percentile },
            };
        }

        case 'SET_BIRTHDAY': {
            const value = action.value;
            const isComplete = /^\d{4}-\d{2}-\d{2}$/.test(value);
            if (!isComplete) {
                return { ...state, form: { ...form, birthday: value } };
            }
            if (derivedField === 'height') {
                const suggested = suggestHeight(form.sex, value, form.percentile);
                return {
                    ...state,
                    form: { ...form, birthday: value, heightNow: suggested !== undefined ? String(suggested) : form.heightNow },
                };
            }
            const height = Number(form.heightNow);
            const suggested = height > 0 ? suggestPercentile(form.sex, value, height) : undefined;
            return {
                ...state,
                form: { ...form, birthday: value, percentile: suggested ?? form.percentile },
            };
        }

        case 'SET_HEIGHT': {
            const value = action.value;
            const height = Number(value);
            const suggested = value && height > 0 ? suggestPercentile(form.sex, form.birthday, height) : undefined;
            return {
                derivedField: 'percentile',
                form: { ...form, heightNow: value, percentile: suggested ?? form.percentile },
            };
        }

        case 'SET_PERCENTILE': {
            const suggested = suggestHeight(form.sex, form.birthday, action.value);
            return {
                derivedField: 'height',
                form: { ...form, percentile: action.value, heightNow: suggested !== undefined ? String(suggested) : form.heightNow },
            };
        }
    }
}
