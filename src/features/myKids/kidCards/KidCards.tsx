import type { UserRecord } from "@myTypes/types.ts";
import { getKidColor } from "@constants/constants.ts";
import { getEffectiveHeight } from "@utils/growth.utils.ts";
import { findSizeForHeight } from "@utils/size.utils.ts";
import { kidsClothingTable } from "@data/sizeCharts/kids_clothing_sizes.ts";
import styles from "./KidCards.module.css";

type KidCardsProps = {
    kids: UserRecord[];
};

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    const first = parts[0][0] ?? '';
    const second = parts.length > 1 ? (parts[1][0] ?? '') : '';
    return (first + second).toUpperCase();
}

export function KidCards({ kids }: KidCardsProps) {
    if (kids.length === 0) return null;
    return (
        <ul className={styles.row} aria-label={`${kids.length} barn`}>
            {kids.map(kid => {
                const effectiveHeight = getEffectiveHeight(kid);
                const height = Math.round(effectiveHeight);
                const size = findSizeForHeight(kidsClothingTable, effectiveHeight).key;
                return (
                    <li key={kid.id} className={styles.card}>
                        <span
                            className={styles.avatar}
                            style={{ backgroundColor: getKidColor(kid.id) }}
                            aria-hidden="true"
                        >
                            {getInitials(kid.name)}
                        </span>
                        <span className={styles.name}>{kid.name}</span>
                        <span className={styles.meta}>Str. {size} · {height} cm</span>
                    </li>
                );
            })}
        </ul>
    );
}
