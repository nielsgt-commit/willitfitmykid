import type { Ref } from "react";
import styles from "./Switch.module.css";

type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    ref?: Ref<HTMLButtonElement>;
};

/** Accessible on/off toggle switch. */
export function Switch({ checked, onChange, label, ref }: SwitchProps) {
    return (
        <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            className={styles.switch}
            onClick={() => onChange(!checked)}
        >
            <span className={styles.track}>
                <span className={styles.thumb} />
            </span>
        </button>
    );
}
