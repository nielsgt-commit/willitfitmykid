import { useRef, useState, type ChangeEvent } from 'react';
import { useKids, useKidsActions } from '@hooks/context/KidsContext.tsx';
import { AddKidFlow } from './kidsForm/AddKidFlow.tsx';
import { KidList } from '@features/myKids/kidList/KidList.tsx';
import { ShareSizes } from '@features/myKids/shareSizes/ShareSizes.tsx';
import { serializeKids, parseKidsBackup } from '@services/storage/kidsStorage.ts';
import type { UserRecord } from '@myTypes/types.ts';
import styles from './MyKids.module.css';

interface MyKidsProps {
    initialAdding?: boolean;
    onCancelFirstAdd?: () => void;
}

export function MyKids({ initialAdding = false, onCancelFirstAdd }: MyKidsProps) {
    const { kids, nextId } = useKids();
    const { addKid, updateKid, removeKid, replaceKids } = useKidsActions();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [adding, setAdding] = useState(initialAdding);
    const [showSizes, setShowSizes] = useState(false);
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

    const handleShare = async () => {
        const file = new File([serializeKids(kids, nextId)], 'willitfitmykid-backup.json', {
            type: 'application/json',
        });
        const text = [
            'Sikkerhetskopi av barna mine i «Will It Fit My Kid».',
            '',
            'Slik tar du dem i bruk på en annen enhet:',
            '1. Åpne «Will It Fit My Kid» (eller installer den fra nettsiden).',
            '2. Gå til Mine barn → Innstillinger.',
            '3. Trykk «Gjenopprett» og velg denne filen.',
        ].join('\n');

        try {
            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file], title: 'Will It Fit My Kid – sikkerhetskopi', text });
                return;
            }
        } catch {
            return; // User dismissed the share sheet — don't fall back to a download.
        }
        // No file-share support (e.g. desktop): fall back to downloading the file.
        handleExport();
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
        <div className={styles.panel}>
            <KidList
                kids={kids}
                editingId={editingId}
                onSave={handleUpdate}
                onEdit={startEdit}
                onCancelEdit={() => setEditingId(null)}
                onRemove={handleRemove}
            />
            {adding ? (
                <AddKidFlow
                    onSubmit={handleAdd}
                    onCancel={() => {
                        setAdding(false);
                        if (kids.length === 0) onCancelFirstAdd?.();
                    }}
                />
            ) : (
                <button type="button" className={styles.addButton} onClick={startAdd}>+ Legg til barn</button>
            )}
            <details className={styles.settings}>
                <summary>Innstillinger</summary>
                <div className={styles.settingsBody}>
                    <p className={styles.note}>
                        Dataene lagres kun på denne enheten. Del en sikkerhetskopi for å flytte barna til en
                        annen enhet, eller del en oversikt over størrelser med andre.
                    </p>

                    <div className={styles.settingsActions}>
                        <button
                            type="button"
                            className={`${styles.settingsAction} ${styles.primaryAction}`}
                            onClick={handleShare}
                            disabled={kids.length === 0}
                        >
                            Del sikkerhetskopi
                        </button>
                        <button
                            type="button"
                            className={styles.settingsAction}
                            onClick={handleExport}
                            disabled={kids.length === 0}
                        >
                            Last ned
                        </button>
                        <button type="button" className={styles.settingsAction} onClick={() => fileRef.current?.click()}>
                            Gjenopprett
                        </button>
                    </div>
                    <p className={styles.note}>
                        «Del sikkerhetskopi» åpner delingsmenyen, så du kan sende filen på e-post eller melding.
                        Mottakeren åpner appen og bruker «Gjenopprett» for å hente inn barna.
                    </p>

                    <button
                        type="button"
                        className={styles.settingsAction}
                        onClick={() => setShowSizes(v => !v)}
                        disabled={kids.length === 0}
                    >
                        {showSizes ? 'Skjul størrelser' : 'Vis størrelser for deling'}
                    </button>
                    {showSizes && <ShareSizes kids={kids} />}

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
    );
}
