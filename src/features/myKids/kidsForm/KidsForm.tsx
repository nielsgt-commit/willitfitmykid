import { useReducer } from 'react';
import { Temporal } from 'temporal-polyfill';
import { PERCENTILES } from '@constants/constants.ts';
import type { Sex, UserRecord } from "@myTypes/types.ts";
import { emptyForm, toEditingUser, buildUserRecord, formReducer } from './kidsForm.logic.ts';
import styles from './KidsForm.module.css';

type KidsFormProps =
    | { mode: 'add'; onSubmit: (data: Omit<UserRecord, 'id'>) => void; onCancel: () => void }
    | { mode: 'edit'; kid: UserRecord; onSubmit: (data: Omit<UserRecord, 'id'>) => void; onCancel: () => void };

export function KidsForm(props: KidsFormProps) {
    const initialForm = props.mode === 'edit' ? toEditingUser(props.kid) : emptyForm;
    const initialDerived: 'height' | 'percentile' = props.mode === 'edit' && props.kid.heightNow !== undefined ? 'percentile' : 'height';

    const [{ form, derivedField }, dispatch] = useReducer(formReducer, {
        form: initialForm,
        derivedField: initialDerived,
    });

    const percentileValues = PERCENTILES.map(p => Number(p.replace('P', '')));

    const submitAction = () => props.onSubmit(buildUserRecord(form, derivedField));

    return (
        <form className={styles.form} action={submitAction}>
            <div className={styles.fields}>
                <label className={styles.field}>
                    <span className={styles.label}>Navn</span>
                    <input className={styles.input} value={form.name} onChange={e => dispatch({ type: 'SET_NAME', value: e.target.value })} />
                </label>
                <label className={styles.field}>
                    <span className={styles.label}>Kjønn</span>
                    <select className={styles.input} value={form.sex} onChange={e => dispatch({ type: 'SET_SEX', value: e.target.value as Sex })}>
                        <option value="F">Jente</option>
                        <option value="M">Gutt</option>
                    </select>
                </label>
                <label className={styles.field}>
                    <span className={styles.label}>Fødselsdag</span>
                    <input
                        className={styles.input}
                        type="date"
                        value={form.birthday}
                        onChange={e => dispatch({ type: 'SET_BIRTHDAY', value: e.target.value })}
                        min={Temporal.Now.plainDateISO().subtract({ years: 18 }).toString()}
                        max={Temporal.Now.plainDateISO().toString()}
                    />
                </label>
                <label className={styles.field}>
                    <span className={styles.label}>Persentil</span>
                    <select className={styles.input} value={form.percentile} onChange={e => dispatch({ type: 'SET_PERCENTILE', value: Number(e.target.value) })}>
                        {percentileValues.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </label>
                <label className={styles.field}>
                    <span className={styles.label}>Høyde (cm)</span>
                    <input className={styles.input} type="number" inputMode="numeric" value={form.heightNow} onChange={e => dispatch({ type: 'SET_HEIGHT', value: e.target.value })} />
                </label>
            </div>
            <div className={styles.actions}>
                <button type="button" className={styles.secondary} onClick={props.onCancel}>Avbryt</button>
                <button
                    type="submit"
                    className={styles.primary}
                    disabled={props.mode === 'add' && (!form.name || !form.birthday)}
                >
                    {props.mode === 'add' ? 'Legg til' : 'Lagre'}
                </button>
            </div>
        </form>
    );
}