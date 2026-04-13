import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { type UserRecord } from '../../TestUsers.ts';
import { PERCENTILE } from '../../constants.ts';
import {
    getLengthByMonthAndPercentile,
    getPercentileByMonthAndLength,
    type Gender,
    type Percentile,
} from '../../Utils/growthChartUtils.ts';
import { monthsSinceBirth } from '../../Utils/age.utils.ts';
import { useKids } from '../../context/KidsContext.tsx';

const genderOf = (sex: 'M' | 'F'): Gender => (sex === 'F' ? 'girls' : 'boys');

function suggestPercentile(sex: 'M' | 'F', birthday: string, height: number): number | undefined {
    if (!birthday || !height) return undefined;
    const months = monthsSinceBirth(Temporal.PlainDate.from(birthday));
    const p = getPercentileByMonthAndLength(months, height, genderOf(sex));
    return p ? Number(p.replace('P', '')) : undefined;
}

function suggestHeight(sex: 'M' | 'F', birthday: string, percentile: number): number | undefined {
    if (!birthday) return undefined;
    const months = monthsSinceBirth(Temporal.PlainDate.from(birthday));
    return getLengthByMonthAndPercentile(months, `P${percentile}` as Percentile, genderOf(sex));
}

type EditingUser = {
    name: string;
    sex: 'M' | 'F';
    birthday: string;
    percentile: number;
    heightNow: string;
};

const emptyForm: EditingUser = {
    name: '',
    sex: 'F',
    birthday: '',
    percentile: 50,
    heightNow: '',
};

function toEditingUser(user: UserRecord): EditingUser {
    return {
        name: user.name,
        sex: user.sex,
        birthday: user.birthday.toString(),
        percentile: user.calculatedPercentile,
        heightNow: String(user.heightNow),
    };
}

export function MyKids() {
    const { kids, addKid, updateKid, removeKid } = useKids();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<EditingUser>(emptyForm);
    const [adding, setAdding] = useState(false);
    const [derivedField, setDerivedField] = useState<'height' | 'percentile'>('height');

    const handleAdd = () => {
        const height = form.heightNow ? Number(form.heightNow) : 0;
        addKid({
            name: form.name,
            sex: form.sex,
            birthday: Temporal.PlainDate.from(form.birthday),
            heightNow: height,
            calculatedPercentile: form.percentile,
            sizeNow: `${height}` as `${number}`,
        });
        setForm(emptyForm);
        setAdding(false);
    };

    const handleUpdate = (id: number) => {
        const height = form.heightNow ? Number(form.heightNow) : 0;
        updateKid(id, {
            name: form.name,
            sex: form.sex,
            birthday: Temporal.PlainDate.from(form.birthday),
            heightNow: height,
            calculatedPercentile: form.percentile,
            sizeNow: `${height}` as `${number}`,
        });
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleRemove = (id: number) => {
        removeKid(id);
        if (editingId === id) {
            setEditingId(null);
            setForm(emptyForm);
        }
    };

    const startEdit = (user: UserRecord) => {
        setAdding(false);
        setEditingId(user.id);
        setForm(toEditingUser(user));
        setDerivedField('percentile');
    };

    const startAdd = () => {
        setEditingId(null);
        setForm(emptyForm);
        setDerivedField('height');
        setAdding(true);
    };

    const cancel = () => {
        setEditingId(null);
        setAdding(false);
        setForm(emptyForm);
        setDerivedField('height');
    };

    const onHeightChange = (value: string) => {
        setDerivedField('percentile');
        const height = Number(value);
        const suggested =
            value && height > 0 ? suggestPercentile(form.sex, form.birthday, height) : undefined;
        setForm({
            ...form,
            heightNow: value,
            percentile: suggested ?? form.percentile,
        });
    };

    const onPercentileChange = (value: number) => {
        setDerivedField('height');
        const suggested = suggestHeight(form.sex, form.birthday, value);
        setForm({
            ...form,
            percentile: value,
            heightNow: suggested !== undefined ? String(suggested) : form.heightNow,
        });
    };

    const onBirthdayChange = (value: string) => {
        if (derivedField === 'height') {
            const suggested = suggestHeight(form.sex, value, form.percentile);
            setForm({
                ...form,
                birthday: value,
                heightNow: suggested !== undefined ? String(suggested) : form.heightNow,
            });
        } else {
            const height = Number(form.heightNow);
            const suggested = height > 0 ? suggestPercentile(form.sex, value, height) : undefined;
            setForm({
                ...form,
                birthday: value,
                percentile: suggested ?? form.percentile,
            });
        }
    };

    const onSexChange = (value: 'M' | 'F') => {
        if (derivedField === 'height') {
            const suggested = suggestHeight(value, form.birthday, form.percentile);
            setForm({
                ...form,
                sex: value,
                heightNow: suggested !== undefined ? String(suggested) : form.heightNow,
            });
        } else {
            const height = Number(form.heightNow);
            const suggested = height > 0 ? suggestPercentile(value, form.birthday, height) : undefined;
            setForm({
                ...form,
                sex: value,
                percentile: suggested ?? form.percentile,
            });
        }
    };

    const percentileValues = PERCENTILE.map(p => Number(p.replace('P', '')));

    const formFields = (
        <div>
            <label>
                Navn:
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
                Kjønn:
                <select value={form.sex} onChange={e => onSexChange(e.target.value as 'M' | 'F')}>
                    <option value="F">Jente</option>
                    <option value="M">Gutt</option>
                </select>
            </label>
            <label>
                Fødselsdag:
                <input type="date" value={form.birthday} onChange={e => onBirthdayChange(e.target.value)} />
            </label>
            <label>
                Persentil:
                <select value={form.percentile} onChange={e => onPercentileChange(Number(e.target.value))}>
                    {percentileValues.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </label>
            <label>
                Høyde (cm):
                <input type="number" value={form.heightNow} onChange={e => onHeightChange(e.target.value)} />
            </label>
        </div>
    );

    return (
        <>
            <h2>Mine barn</h2>
            <ul>
                {kids.map(kid => (
                    <li key={kid.id}>
                        {editingId === kid.id ? (
                            <>
                                {formFields}
                                <button onClick={() => handleUpdate(kid.id)}>Lagre</button>
                                <button onClick={cancel}>Avbryt</button>
                            </>
                        ) : (
                            <>
                                <span>
                                    {kid.name} — {kid.sex === 'F' ? 'Jente' : 'Gutt'} — {kid.birthday.toString()} — P{kid.calculatedPercentile}
                                    {kid.heightNow ? ` — ${kid.heightNow} cm` : ''}
                                </span>
                                <button onClick={() => startEdit(kid)}>Rediger</button>
                                <button onClick={() => handleRemove(kid.id)}>Slett</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {adding ? (
                <>
                    {formFields}
                    <button onClick={handleAdd} disabled={!form.name || !form.birthday}>Legg til</button>
                    <button onClick={cancel}>Avbryt</button>
                </>
            ) : (
                <button onClick={startAdd}>Legg til barn</button>
            )}
        </>
    );
}