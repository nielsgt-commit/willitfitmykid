import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useKids } from '@hooks/context/KidsContext.tsx';

type KidFilterContextValue = {
    activeKidIds: Set<number>;
    toggleKid: (id: number) => void;
};

const KidFilterContext = createContext<KidFilterContextValue | null>(null);

export function KidFilterProvider({ children }: { children: ReactNode }) {
    const { kids } = useKids();
    // Track which kids are *excluded*, not which are active. Newly added kids are
    // then active by default with no syncing, and a stale excluded id (after a
    // kid is removed) is simply ignored when deriving the active set below.
    const [excludedIds, setExcludedIds] = useState<Set<number>>(() => new Set());

    const activeKidIds = useMemo(
        () => new Set(kids.filter(k => !excludedIds.has(k.id)).map(k => k.id)),
        [kids, excludedIds],
    );

    const toggleKid = useCallback((id: number) => {
        setExcludedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    }, []);

    const value = useMemo<KidFilterContextValue>(
        () => ({ activeKidIds, toggleKid }),
        [activeKidIds, toggleKid]
    );

    return <KidFilterContext value={value}>{children}</KidFilterContext>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useKidFilter(): KidFilterContextValue {
    const ctx = useContext(KidFilterContext);
    if (!ctx) throw new Error('useKidFilter must be used within KidFilterProvider');
    return ctx;
}
