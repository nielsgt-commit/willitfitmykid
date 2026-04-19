import type {UserRecord} from "@/types/types.ts";
import {getKidColor} from "@constants/constants.ts";
import styles from "./KidFilter.module.css";


type KidFilterProps = {
    kids: UserRecord[];
    activeKidIds: Set<number>;
    onToggle: (id: number) => void;
};

export function KidFilter({kids, activeKidIds, onToggle}: KidFilterProps) {
    if (kids.length === 0) return null;
    return (
        <>
        <p> Viser resultater for </p>
        <div className={styles.filter}>
            {kids.map(kid => {
                const active = activeKidIds.has(kid.id);
                const color = getKidColor(kid.id);
                return (
                    <button
                        key={kid.id}
                        className={styles.chip}
                        onClick={() => onToggle(kid.id)}
                        aria-pressed={active}
                        style={{'--kid-color': color} as React.CSSProperties}
                    >
                        <span className={styles.dot} />
                        {kid.name}
                    </button>
                );
            })}
        </div>
    </>
            );
}