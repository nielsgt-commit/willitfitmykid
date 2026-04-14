import { useState } from 'react';
import { useKids } from '../../context/KidsContext.tsx';
import { KidsForm } from './KidsForm/KidsForm.tsx';
import type {UserRecord} from "../types.ts";

export function MyKids() {
    const { kids, addKid, updateKid, removeKid } = useKids();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);

    const handleAdd = (data: Omit<UserRecord, 'id'>) => {
        addKid(data);
        setAdding(false);
    };

    const handleUpdate = (id: number, data: Omit<UserRecord, 'id'>) => {
        updateKid(id, data);
        setEditingId(null);
    };

    const handleRemove = (id: number) => {
        removeKid(id);
        if (editingId === id) {
            setEditingId(null);
        }
    };

    const startEdit = (kid: UserRecord) => {
        setAdding(false);
        setEditingId(kid.id);
    };

    const startAdd = () => {
        setEditingId(null);
        setAdding(true);
    };

    return (
        <>
            <h2>Mine barn</h2>
            <ul>
                {kids.map(kid => (
                    <li key={kid.id}>
                        {editingId === kid.id ? (
                            <KidsForm
                                mode="edit"
                                kid={kid}
                                onSubmit={data => handleUpdate(kid.id, data)}
                                onCancel={() => setEditingId(null)}
                            />
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
                <KidsForm
                    mode="add"
                    onSubmit={handleAdd}
                    onCancel={() => setAdding(false)}
                />
            ) : (
                <button onClick={startAdd}>Legg til barn</button>
            )}
        </>
    );
}