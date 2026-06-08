import { useReducer, useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { PERCENTILES } from '@constants/constants.ts';
import type { UserRecord } from '@myTypes/types.ts';
import { emptyForm, buildUserRecord, formReducer } from './kidsForm.logic.ts';
import styles from './AddKidFlow.module.css';

type AddKidFlowProps = {
    onSubmit: (data: Omit<UserRecord, 'id'>) => void;
    onCancel: () => void;
};

const STEPS = ['name', 'sex', 'birthday', 'height'] as const;

/**
 * Guided add-kid flow: one value per step (name → sex → birthday → height),
 * with the percentile derived from the height. Reuses the shared form reducer.
 */
export function AddKidFlow({ onSubmit, onCancel }: AddKidFlowProps) {
    const [{ form, derivedField }, dispatch] = useReducer(formReducer, { form: emptyForm, derivedField: 'height' });
    const [stepIndex, setStepIndex] = useState(0);
    const [heightMode, setHeightMode] = useState<'height' | 'percentile'>('height');
    const percentileValues = PERCENTILES.map(p => Number(p.replace('P', '')));

    // Switching to percentile makes it authoritative (height becomes derived,
    // so no manual height override is stored); switching back just re-shows the input.
    const usePercentile = () => {
        dispatch({ type: 'SET_PERCENTILE', value: form.percentile });
        setHeightMode('percentile');
    };

    const step = STEPS[stepIndex];
    const isLast = stepIndex === STEPS.length - 1;
    const today = Temporal.Now.plainDateISO();

    const canAdvance =
        step === 'name' ? form.name.trim().length > 0
        : step === 'birthday' ? /^\d{4}-\d{2}-\d{2}$/.test(form.birthday)
        : true;

    const back = () => (stepIndex === 0 ? onCancel() : setStepIndex(i => i - 1));
    const next = () => (isLast ? onSubmit(buildUserRecord(form, derivedField)) : setStepIndex(i => i + 1));

    return (
        <div className={styles.flow}>
            <div className={styles.progress} aria-hidden="true">
                {STEPS.map((s, i) => (
                    <span key={s} className={i <= stepIndex ? styles.dotActive : styles.dot} />
                ))}
            </div>

            {step === 'name' && (
                <label className={styles.field}>
                    <span className={styles.question}>Hva heter barnet?</span>
                    <input
                        className={styles.input}
                        autoFocus
                        value={form.name}
                        placeholder="Navn"
                        onChange={e => dispatch({ type: 'SET_NAME', value: e.target.value })}
                    />
                </label>
            )}

            {step === 'sex' && (
                <div className={styles.field}>
                    <span className={styles.question}>Gutt eller jente?</span>
                    <div className={styles.choices}>
                        <button
                            type="button"
                            className={styles.choice}
                            aria-pressed={form.sex === 'F'}
                            onClick={() => dispatch({ type: 'SET_SEX', value: 'F' })}
                        >
                            Jente
                        </button>
                        <button
                            type="button"
                            className={styles.choice}
                            aria-pressed={form.sex === 'M'}
                            onClick={() => dispatch({ type: 'SET_SEX', value: 'M' })}
                        >
                            Gutt
                        </button>
                    </div>
                </div>
            )}

            {step === 'birthday' && (
                <label className={styles.field}>
                    <span className={styles.question}>Når er barnet født?</span>
                    <input
                        className={styles.input}
                        type="date"
                        value={form.birthday}
                        min={today.subtract({ years: 18 }).toString()}
                        max={today.toString()}
                        onChange={e => dispatch({ type: 'SET_BIRTHDAY', value: e.target.value })}
                    />
                </label>
            )}

            {step === 'height' && heightMode === 'height' && (
                <div className={styles.field}>
                    <span className={styles.question}>Hvor høy er barnet nå?</span>
                    <div className={styles.inputRow}>
                        <input
                            className={styles.input}
                            type="number"
                            inputMode="numeric"
                            value={form.heightNow}
                            placeholder="cm"
                            onChange={e => dispatch({ type: 'SET_HEIGHT', value: e.target.value })}
                        />
                        <span className={styles.unit}>cm</span>
                    </div>
                    <span className={styles.hint}>
                        {form.heightNow
                            ? `Tilsvarer omtrent persentil ${form.percentile}`
                            : 'Valgfritt – vi antar gjennomsnittlig vekst (P50)'}
                    </span>
                    <button type="button" className={styles.link} onClick={usePercentile}>
                        Vet du ikke høyden? Velg persentil
                    </button>
                </div>
            )}

            {step === 'height' && heightMode === 'percentile' && (
                <div className={styles.field}>
                    <span className={styles.question}>Hvilken persentil ligger barnet på?</span>
                    <select
                        className={styles.input}
                        value={form.percentile}
                        onChange={e => dispatch({ type: 'SET_PERCENTILE', value: Number(e.target.value) })}
                    >
                        {percentileValues.map(p => (
                            <option key={p} value={p}>P{p}</option>
                        ))}
                    </select>
                    <span className={styles.hint}>
                        Persentilen viser hvordan barnet ligger an i høyde mot jevnaldrende. P50 er gjennomsnittlig.
                    </span>
                    <button type="button" className={styles.link} onClick={() => setHeightMode('height')}>
                        Vet du høyden? Skriv den inn
                    </button>
                </div>
            )}

            <div className={styles.actions}>
                <button type="button" className={styles.secondary} onClick={back}>
                    {stepIndex === 0 ? 'Avbryt' : 'Tilbake'}
                </button>
                <button type="button" className={styles.primary} onClick={next} disabled={!canAdvance}>
                    {isLast ? 'Legg til' : 'Neste'}
                </button>
            </div>
        </div>
    );
}
