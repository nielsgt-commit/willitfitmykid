import * as React from "react";
import type {UserRecord} from "../../../../types/types.ts";
import {getKidColor} from "../../../../constants/constants.ts";
import styles from "./KidFilter.module.css";

type KidFilterProps = {
    kids: UserRecord[];
    activeKidIds: Set<number>;
    onToggle: (id: number) => void;
};

export function KidFilter({kids, activeKidIds, onToggle}: KidFilterProps) {
    if (kids.length === 0) return null;
    return (
        <div className={styles.kidButtons}>
            {kids.map(kid => {
                const active = activeKidIds.has(kid.id);
                const color = getKidColor(kid.id);
                return (
                    <button
                        key={kid.id}
                        onClick={() => onToggle(kid.id)}
                        className={`${styles.kidButton} ${active ? styles.kidActive : ''}`}
                        style={{'--kid-color': color} as React.CSSProperties}
                    >
                        <span className={styles.kidDot} />
                        {kid.name}
                    </button>
                );
            })}
        </div>
    );
}