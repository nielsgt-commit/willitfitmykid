import type { ReactNode } from "react";
import styles from "./CalculatorView.module.css";

type CalculatorViewProps = {
    kidCards?: ReactNode;
    result?: ReactNode;
    conversions?: ReactNode;
    size?: ReactNode;
};

/**
 * The calculator surface — kid avatar cards, the result rows, and the size
 * scroller — grouped into one component so they move/swipe together. Layout
 * is an exact copy of the former AppLayout kids + canvas regions.
 */
export function CalculatorView({ kidCards, result, conversions, size }: CalculatorViewProps) {
    return (
        <div className={styles.calc}>
            {kidCards !== undefined && <div className={styles.kids}>{kidCards}</div>}
            <div className={styles.canvas}>
                {result !== undefined && <div className={styles.result}>{result}</div>}
                <div className={styles.wheelgroup}>
                    {conversions !== undefined && <div className={styles.conversions}>{conversions}</div>}
                    <div className={styles.size}>{size}</div>
                </div>
            </div>
        </div>
    );
}
