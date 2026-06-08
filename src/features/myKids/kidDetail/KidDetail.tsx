import {getEffectiveHeight} from "@utils/growth.utils.ts";
import {yearsSinceBirth} from "@utils/age.utils.ts";
import type {UserRecord} from "@/types/types.ts";
import styles from "./KidDetail.module.css";


type KidDetailProps = {
    kid: UserRecord;
};

export function KidDetail({ kid }: KidDetailProps) {
    const height = getEffectiveHeight(kid);
    const years = yearsSinceBirth(kid.birthday);
    return (
        <div className={styles.kidDetail}>
            <div className={styles.name}>
                {kid.name}
            </div>
            <div className={styles.age}>{years} år</div>
            <div className={styles.percentile}>P{kid.calculatedPercentile}</div>
            <hr className={styles.divider} />
            <div className={styles.sex}>{kid.sex === 'F' ? 'Jente' : 'Gutt'}</div>
            <div className={styles.height}>
                {height ? `${height} cm` : ''}
            </div>
        </div>
    );
}