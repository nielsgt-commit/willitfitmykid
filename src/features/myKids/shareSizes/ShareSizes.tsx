import type { UserRecord } from '@myTypes/types.ts';
import { projectSizeSegments, type ProjectionPoint } from '@utils/projection.utils.ts';
import styles from './ShareSizes.module.css';

function pointLabel(p: ProjectionPoint): string {
    return p.monthOffset === 0 ? 'nå' : `${p.season.toLowerCase()} ${p.year}`;
}

function rangeLabel(start: ProjectionPoint, end: ProjectionPoint): string {
    const from = pointLabel(start);
    const to = pointLabel(end);
    return from === to ? from : `${from} – ${to}`;
}

/**
 * A clean, screenshot-friendly overview of each kid's projected clothing sizes
 * for the next three years — handy for sharing with grandparents.
 */
export function ShareSizes({ kids }: { kids: UserRecord[] }) {
    const generated = new Intl.DateTimeFormat('nb-NO', { dateStyle: 'long' }).format(new Date());

    return (
        <div className={styles.card}>
            <div className={styles.head}>
                <h3 className={styles.title}>Størrelser fremover</h3>
                <p className={styles.subtitle}>Anslåtte klesstørrelser (EU) de neste 3 årene</p>
            </div>

            {kids.map(kid => {
                const segments = projectSizeSegments(kid, 36);
                return (
                    <div key={kid.id} className={styles.kid}>
                        <div className={styles.kidName}>{kid.name}</div>
                        <ul className={styles.segments}>
                            {segments.map(segment => (
                                <li key={`${segment.size}-${segment.start.monthOffset}`} className={styles.segment}>
                                    <span className={styles.size}>{segment.size}</span>
                                    <span className={styles.range}>{rangeLabel(segment.start, segment.end)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}

            <p className={styles.footer}>Will It Fit My Kid · {generated}</p>
        </div>
    );
}
