import type { UserRecord } from "@myTypes/types.ts";
import { getKidColor } from "@constants/constants.ts";
import styles from "./AvatarStack.module.css";

type AvatarStackProps = {
    kids: UserRecord[];
};

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    const first = parts[0][0] ?? '';
    const second = parts.length > 1 ? (parts[1][0] ?? '') : '';
    return (first + second).toUpperCase();
}

export function AvatarStack({ kids }: AvatarStackProps) {
    if (kids.length === 0) return null;
    return (
        <div className={styles.stack} aria-label={`${kids.length} barn`}>
            {kids.map(kid => (
                <div
                    key={kid.id}
                    className={styles.avatar}
                    style={{ backgroundColor: getKidColor(kid.id) }}
                    title={kid.name}
                >
                    {getInitials(kid.name)}
                </div>
            ))}
        </div>
    );
}