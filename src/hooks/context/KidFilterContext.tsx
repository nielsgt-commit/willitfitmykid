import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { useKids } from '@hooks/context/KidsContext.tsx';

type KidFilterContextValue = {
    activeKidIds: Set<number>;
    toggleKid: (id: number) => void;
};

const KidFilterContext = createContext<KidFilterContextValue | null>(null);

type State = { activeKidIds: Set<number> };
type Action =
    | { type: 'TOGGLE'; payload: number }
    | { type: 'SYNC'; payload: number[] };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'TOGGLE': {
            const next = new Set(state.activeKidIds);
            if (next.has(action.payload)) next.delete(action.payload); else next.add(action.payload);
            return { activeKidIds: next };
        }
        case 'SYNC': {
            const currentIds = new Set(action.payload);
            const next = new Set([...state.activeKidIds].filter(id => currentIds.has(id)));
            action.payload.forEach(id => { if (!state.activeKidIds.has(id)) next.add(id); });
            return { activeKidIds: next };
        }
    }
}

export function KidFilterProvider({ children }: { children: ReactNode }) {
    const { kids } = useKids();
    const [state, dispatch] = useReducer(
        reducer,
        null,
        () => ({ activeKidIds: new Set(kids.map(k => k.id)) })
    );

    const kidIdsKey = kids.map(k => k.id).join(',');
    useEffect(() => {
        dispatch({ type: 'SYNC', payload: kidIdsKey ? kidIdsKey.split(',').map(Number) : [] });
    }, [kidIdsKey]);

    const toggleKid = useCallback((id: number) => {
        dispatch({ type: 'TOGGLE', payload: id });
    }, []);

    const value = useMemo<KidFilterContextValue>(
        () => ({ activeKidIds: state.activeKidIds, toggleKid }),
        [state.activeKidIds, toggleKid]
    );

    return <KidFilterContext.Provider value={value}>{children}</KidFilterContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useKidFilter(): KidFilterContextValue {
    const ctx = useContext(KidFilterContext);
    if (!ctx) throw new Error('useKidFilter must be used within KidFilterProvider');
    return ctx;
}