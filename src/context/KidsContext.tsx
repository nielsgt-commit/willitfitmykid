import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { loadKids, saveKids } from '../storage/KidsStorage.ts';
import type {UserRecord} from "../types.ts";

type KidsContextValue = {
    kids: UserRecord[];
    addKid: (kid: Omit<UserRecord, 'id'>) => UserRecord;
    updateKid: (id: number, updates: Partial<Omit<UserRecord, 'id'>>) => void;
    removeKid: (id: number) => void;
};

const KidsContext = createContext<KidsContextValue | null>(null);

export function KidsProvider({ children }: { children: ReactNode }) {
    const [{ kids }, setState] = useState(() => loadKids());

    const addKid = useCallback((kid: Omit<UserRecord, 'id'>): UserRecord => {
        let newKid!: UserRecord;
        setState(prev => {
            newKid = { ...kid, id: prev.nextId };
            const next = { kids: [...prev.kids, newKid], nextId: prev.nextId + 1 };
            saveKids(next.kids, next.nextId);
            return next;
        });
        return newKid;
    }, []);

    const updateKid = useCallback((id: number, updates: Partial<Omit<UserRecord, 'id'>>) => {
        setState(prev => {
            const next = { kids: prev.kids.map(k => (k.id === id ? { ...k, ...updates } : k)), nextId: prev.nextId };
            saveKids(next.kids, next.nextId);
            return next;
        });
    }, []);

    const removeKid = useCallback((id: number) => {
        setState(prev => {
            const next = { kids: prev.kids.filter(k => k.id !== id), nextId: prev.nextId };
            saveKids(next.kids, next.nextId);
            return next;
        });
    }, []);

    return (
        <KidsContext.Provider value={{ kids, addKid, updateKid, removeKid }}>
            {children}
        </KidsContext.Provider>
    );
}

export function useKids(): KidsContextValue {
    const ctx = useContext(KidsContext);
    if (!ctx) throw new Error('useKids must be used within KidsProvider');
    return ctx;
}