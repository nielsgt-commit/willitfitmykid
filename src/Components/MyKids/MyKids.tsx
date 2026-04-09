import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import {
    testUsers,
    addUser,
    removeUser,
    updateUser,
    type UserRecord,
} from '../../TestUsers.ts';
import { PERCENTILE } from '../../constants.ts';

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
    const [kids, setKids] = useState<UserRecord[]>(() => [...testUsers]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<EditingUser>(emptyForm);
    const [adding, setAdding] = useState(false);

    const refresh = () => setKids([...testUsers]);

    const handleAdd = () => {
        const height = form.heightNow ? Number(form.heightNow) : 0;
        addUser({
            name: form.name,
            sex: form.sex,
            birthday: Temporal.PlainDate.from(form.birthday),
            heightNow: height,
            calculatedPercentile: form.percentile,
            sizeNow: `${height}` as `${number}`,
        });
        setForm(emptyForm);
        setAdding(false);
        refresh();
    };

    const handleUpdate = (id: number) => {
        const height = form.heightNow ? Number(form.heightNow) : 0;
        updateUser(id, {
            name: form.name,
            sex: form.sex,
            birthday: Temporal.PlainDate.from(form.birthday),
            heightNow: height,
            calculatedPercentile: form.percentile,
            sizeNow: `${height}` as `${number}`,
        });
        setEditingId(null);
        setForm(emptyForm);
        refresh();
    };

    const handleRemove = (id: number) => {
        removeUser(id);
        if (editingId === id) {
            setEditingId(null);
            setForm(emptyForm);
        }
        refresh();
    };

    const startEdit = (user: UserRecord) => {
        setAdding(false);
        setEditingId(user.id);
        setForm(toEditingUser(user));
    };

    const startAdd = () => {
        setEditingId(null);
        setForm(emptyForm);
        setAdding(true);
    };

    const cancel = () => {
        setEditingId(null);
        setAdding(false);
        setForm(emptyForm);
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
                <select value={form.sex} onChange={e => setForm({ ...form, sex: e.target.value as 'M' | 'F' })}>
                    <option value="F">Jente</option>
                    <option value="M">Gutt</option>
                </select>
            </label>
            <label>
                Fødselsdag:
                <input type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })} />
            </label>
            <label>
                Persentil:
                <select value={form.percentile} onChange={e => setForm({ ...form, percentile: Number(e.target.value) })}>
                    {percentileValues.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </label>
            <label>
                Høyde (cm):
                <input type="number" value={form.heightNow} onChange={e => setForm({ ...form, heightNow: e.target.value })} />
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