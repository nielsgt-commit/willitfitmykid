import type { Ref, SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { ref?: Ref<HTMLSelectElement> };

export function Select({ className, ref, ...rest }: Props) {
    const classes = [styles.select, className].filter(Boolean).join(" ");
    return <select ref={ref} className={classes} {...rest} />;
}
