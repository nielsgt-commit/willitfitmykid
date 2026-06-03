import { useRef, useState, type ReactNode } from "react";
import styles from "./Gallery.module.css";

type GalleryProps = {
    labels: string[];
    pages: ReactNode[];
};

/**
 * Horizontal swipe gallery (native CSS scroll-snap, so it coexists with the
 * size wheel's own pointer gestures). Pagination dots double as a toggle.
 */
export function Gallery({ labels, pages }: GalleryProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const onScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setIndex(prev => (prev === i ? prev : i));
    };

    const goTo = (i: number) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    };

    return (
        <div className={styles.gallery}>
            <div className={styles.track} ref={trackRef} onScroll={onScroll}>
                {pages.map((page, i) => (
                    <div key={labels[i]} className={styles.slide}>{page}</div>
                ))}
            </div>
            <div className={styles.dots} role="tablist" aria-label="Visning">
                {labels.map((label, i) => (
                    <button
                        key={label}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={label}
                        className={i === index ? styles.dotActive : styles.dot}
                        onClick={() => goTo(i)}
                    />
                ))}
            </div>
        </div>
    );
}
