import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...rest }: Props) {
    const classes = [styles.select, className].filter(Boolean).join(" ");
    return <select className={classes} {...rest} />;
}