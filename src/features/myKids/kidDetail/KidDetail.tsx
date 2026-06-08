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
            <div className={styles.headline}>
                <span className={styles.name}>{kid.name}</span>
                <span className={styles.age}>{years} år</span>
            </div>
            <div className={styles.height}>
                {height ? `${height} cm` : ''}
            </div>
        </div>
    );
}