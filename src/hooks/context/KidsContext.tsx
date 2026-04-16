import { createContext, useContext, useEffect, useReducer, useMemo, type ReactNode } from 'react';
import { loadKids, saveKids } from '../../services/storage/kidsStorage.ts';
import type { UserRecord } from '../../types/types.ts';
import kidsReducer from './kids.reducer.ts';
import { ADD_KID, UPDATE_KID, REMOVE_KID } from './kids.action.ts';

type KidsContextValue = {
    kids: UserRecord[];
    addKid: (kid: Omit<UserRecord, 'id'>) => void;
    updateKid: (id: number, updates: Partial<Omit<UserRecord, 'id'>>) => void;
    removeKid: (id: number) => void;
};

const KidsContext = createContext<KidsContextValue | null>(null);

export function KidsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(kidsReducer, undefined, loadKids);

    useEffect(() => {
        saveKids(state.kids, state.nextId);
    }, [state]);

    const value = useMemo<KidsContextValue>(() => ({
        kids: state.kids,
        addKid: (kid) => dispatch({ type: ADD_KID, payload: kid }),
        updateKid: (id, updates) => dispatch({ type: UPDATE_KID, payload: { id, updates } }),
        removeKid: (id) => dispatch({ type: REMOVE_KID, payload: id }),
    }), [state.kids]);

    return <KidsContext.Provider value={value}>{children}</KidsContext.Provider>;
}

export function useKids(): KidsContextValue {
    const ctx = useContext(KidsContext);
    if (!ctx) throw new Error('useKids must be used within KidsProvider');
    return ctx;
}
