import { useState } from 'react';
import styles from '@features/myKids/MyKids.module.css';
import { useKids } from '@hooks/context/KidsContext.tsx';
import { KidsForm } from './kidsForm/KidsForm.tsx';
import { KidList } from '@features/myKids/kidList/KidList.tsx';
import type { UserRecord } from '@myTypes/types.ts';

interface MyKidsProps {
    initialAdding?: boolean;
    onCancelFirstAdd?: () => void;
}

export function MyKids({ initialAdding = false, onCancelFirstAdd }: MyKidsProps) {
    const { kids, addKid, updateKid, removeKid } = useKids();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [adding, setAdding] = useState(initialAdding);

    const handleAdd = (data: Omit<UserRecord, 'id'>) => {
        addKid(data);
        setAdding(false);
    };

    const handleUpdate = (id: number, data: Omit<UserRecord, 'id'>) => {
        updateKid(id, data);
        setEditingId(null);
    };

    const handleRemove = (id: number) => {
        if (!window.confirm('Er du sikker på at du vil slette?')) return;
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
            <div className={styles.mineBarnContainer}>
            <h2>Mine barn</h2>
            <KidList
                kids={kids}
                editingId={editingId}
                onSave={handleUpdate}
                onEdit={startEdit}
                onCancelEdit={() => setEditingId(null)}
                onRemove={handleRemove}
            />
            {adding ? (
                <KidsForm
                    mode="add"
                    onSubmit={handleAdd}
                    onCancel={() => {
                        setAdding(false);
                        if (kids.length === 0) onCancelFirstAdd?.();
                    }}
                />
            ) : (
                <button onClick={startAdd}>Legg til barn</button>
            )}
                </div>
        </>
    );
}
