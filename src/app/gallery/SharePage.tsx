import type { UserRecord } from "@myTypes/types.ts";
import { ShareSizes } from "@features/myKids/shareSizes/ShareSizes.tsx";
import styles from "./SharePage.module.css";

/** Scrollable gallery page holding the shareable sizes overview. */
export function SharePage({ kids }: { kids: UserRecord[] }) {
    return (
        <div className={styles.page}>
            <ShareSizes kids={kids} />
        </div>
    );
}
