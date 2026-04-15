import type { UserRecord } from '../../types.ts';
import styles from './KidDetail.module.css';

type KidDetailProps = {
    kid: UserRecord;
};

export function KidDetail({ kid }: KidDetailProps) {
    return (
        <div>
            {kid.name} — {kid.sex === 'F' ? 'Jente' : 'Gutt'} — {kid.birthday.toString()} — P{kid.calculatedPercentile}
            {kid.heightNow ? ` — ${kid.heightNow} cm` : ''}
        </div>
    );
}
