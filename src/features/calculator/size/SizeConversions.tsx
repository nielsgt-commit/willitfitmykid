import type {Region} from "@/types/types.ts";
import styles from "./SizeConversions.module.css";


interface SizeConversionsProps {
    conversions: Partial<Record<Region, string>>;
}

export function SizeConversions({ conversions }: SizeConversionsProps) {
    return (
        <ul className={styles.card}>
            {(Object.entries(conversions) as [Region, string][]).map(([region, value]) => (
                <li key={region} className={styles.item}>
                    <span className={styles.region}>{region}</span>
                    <span className={styles.value}>{value}</span>
                </li>
            ))}
        </ul>
    );
}
