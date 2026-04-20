import {getEffectiveHeight} from "@utils/growth.utils.ts";
import type {UserRecord} from "@/types/types.ts";
import {getKidColor} from "@constants/constants.ts";
import styles from "./KidDetail.module.css";


type KidDetailProps = {
    kid: UserRecord;
};

export function KidDetail({ kid }: KidDetailProps) {
    const height = getEffectiveHeight(kid);
    const color = getKidColor(kid.id);
    return (
        <div className={styles.kidDetail}>
            <div className={styles.name}>
                <span className={styles.colorDot} style={{ backgroundColor: color }} />
                {kid.name}
            </div>
            <div className={styles.percentile}>P{kid.calculatedPercentile}</div>
            <hr className={styles.divider} />
            <div className={styles.sex}>{kid.sex === 'F' ? 'Jente' : 'Gutt'}</div>
            <div className={styles.birthday}>{kid.birthday.toString()}</div>
            <div className={styles.height}>
                {height ? `${height} cm` : ''}
            </div>
        </div>
    );
}