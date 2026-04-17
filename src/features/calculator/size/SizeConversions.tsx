import type {Region} from "@/types/types.ts";
import styles from "@features/calculator/size/SizeConversions.module.css";


interface SizeConversionsProps {
    conversions: Partial<Record<Region, string>>;
}

export function SizeConversions({ conversions }: SizeConversionsProps) {
    return (
        <ul className={styles.list}>
            {(Object.entries(conversions) as [Region, string][]).map(([region, value]) => (
                <li key={region}>{region}: {value}</li>
            ))}
        </ul>
    );
}