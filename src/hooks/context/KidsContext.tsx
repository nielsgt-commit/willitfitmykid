import { createContext, useContext, useEffect, useReducer, useMemo, type ReactNode } from 'react';
import { loadKids, saveKids } from '@services/storage/kidsStorage.ts';
import type { UserRecord } from '@myTypes/types.ts';
import kidsReducer from '@hooks/context/kids.reducer.ts';
import { ADD_KID, UPDATE_KID, REMOVE_KID, REPLACE_KIDS } from './kids.action.ts';

type KidsContextValue = {
    kids: UserRecord[];
    nextId: number;
    addKid: (kid: Omit<UserRecord, 'id'>) => void;
    updateKid: (id: number, updates: Partial<Omit<UserRecord, 'id'>>) => void;
    removeKid: (id: number) => void;
    replaceKids: (data: { kids: UserRecord[]; nextId: number }) => void;
};

const KidsContext = createContext<KidsContextValue | null>(null);

export function KidsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(kidsReducer, undefined, loadKids);

    useEffect(() => {
        saveKids(state.kids, state.nextId);
    }, [state]);

    const value = useMemo<KidsContextValue>(() => ({
        kids: state.kids,
        nextId: state.nextId,
        addKid: (kid) => dispatch({ type: ADD_KID, payload: kid }),
        updateKid: (id, updates) => dispatch({ type: UPDATE_KID, payload: { id, updates } }),
        removeKid: (id) => dispatch({ type: REMOVE_KID, payload: id }),
        replaceKids: (data) => dispatch({ type: REPLACE_KIDS, payload: data }),
    }), [state.kids, state.nextId]);

    return <KidsContext.Provider value={value}>{children}</KidsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useKids(): KidsContextValue {
    const ctx = useContext(KidsContext);
    if (!ctx) throw new Error('useKids must be used within KidsProvider');
    return ctx;
}
