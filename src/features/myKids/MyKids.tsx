import { useRef, useState, type ChangeEvent } from 'react';
import { useKids } from '@hooks/context/KidsContext.tsx';
import { KidsForm } from './kidsForm/KidsForm.tsx';
import { KidList } from '@features/myKids/kidList/KidList.tsx';
import { serializeKids, parseKidsBackup } from '@services/storage/kidsStorage.ts';
import type { UserRecord } from '@myTypes/types.ts';
import styles from './MyKids.module.css';

interface MyKidsProps {
    initialAdding?: boolean;
    onCancelFirstAdd?: () => void;
}

export function MyKids({ initialAdding = false, onCancelFirstAdd }: MyKidsProps) {
    const { kids, nextId, addKid, updateKid, removeKid, replaceKids } = useKids();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [adding, setAdding] = useState(initialAdding);
    const fileRef = useRef<HTMLInputElement>(null);

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

    const handleExport = () => {
        const blob = new Blob([serializeKids(kids, nextId)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'willitfitmykid-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ''; // allow re-selecting the same file later
        if (!file) return;
        try {
            const data = parseKidsBackup(await file.text());
            if (kids.length > 0 && !window.confirm('Dette erstatter barna du har nå. Fortsette?')) return;
            replaceKids(data);
        } catch {
            window.alert('Kunne ikke lese sikkerhetskopien. Sjekk at filen er riktig.');
        }
    };

    return (
        <>
            <div>
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
            <details className={styles.settings}>
                <summary>Innstillinger</summary>
                <div className={styles.settingsBody}>
                    <p className={styles.note}>
                        Dataene lagres kun på denne enheten. Bruk sikkerhetskopi for å flytte dem til en annen enhet.
                    </p>
                    <button type="button" onClick={handleExport} disabled={kids.length === 0}>
                        Last ned sikkerhetskopi
                    </button>
                    <button type="button" onClick={() => fileRef.current?.click()}>
                        Gjenopprett
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="application/json,.json"
                        hidden
                        onChange={handleImportFile}
                    />
                </div>
            </details>
                </div>
        </>
    );
}
