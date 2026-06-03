import { createContext, useContext, useEffect, useReducer, useMemo, type ReactNode } from 'react';
import { loadKids, saveKids } from '@services/storage/kidsStorage.ts';
import type { UserRecord } from '@myTypes/types.ts';
import kidsReducer from '@hooks/context/kids.reducer.ts';
import { ADD_KID, UPDATE_KID, REMOVE_KID, REPLACE_KIDS } from './kids.action.ts';

type KidsState = {
    kids: UserRecord[];
    nextId: number;
};

type KidsActions = {
    addKid: (kid: Omit<UserRecord, 'id'>) => void;
    updateKid: (id: number, updates: Partial<Omit<UserRecord, 'id'>>) => void;
    removeKid: (id: number) => void;
    replaceKids: (data: { kids: UserRecord[]; nextId: number }) => void;
};

// State and actions live in separate contexts so action-only consumers (e.g.
// MyKids) don't re-render when the kid data changes — the actions object is
// built once from the stable dispatch and never changes identity.
const KidsStateContext = createContext<KidsState | null>(null);
const KidsActionsContext = createContext<KidsActions | null>(null);

export function KidsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(kidsReducer, undefined, loadKids);

    useEffect(() => {
        saveKids(state.kids, state.nextId);
    }, [state]);

    const stateValue = useMemo<KidsState>(
        () => ({ kids: state.kids, nextId: state.nextId }),
        [state.kids, state.nextId],
    );

    const actions = useMemo<KidsActions>(() => ({
        addKid: (kid) => dispatch({ type: ADD_KID, payload: kid }),
        updateKid: (id, updates) => dispatch({ type: UPDATE_KID, payload: { id, updates } }),
        removeKid: (id) => dispatch({ type: REMOVE_KID, payload: id }),
        replaceKids: (data) => dispatch({ type: REPLACE_KIDS, payload: data }),
    }), []);

    return (
        <KidsActionsContext value={actions}>
            <KidsStateContext value={stateValue}>
                {children}
            </KidsStateContext>
        </KidsActionsContext>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useKids(): KidsState {
    const ctx = useContext(KidsStateContext);
    if (!ctx) throw new Error('useKids must be used within KidsProvider');
    return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useKidsActions(): KidsActions {
    const ctx = useContext(KidsActionsContext);
    if (!ctx) throw new Error('useKidsActions must be used within KidsProvider');
    return ctx;
}
