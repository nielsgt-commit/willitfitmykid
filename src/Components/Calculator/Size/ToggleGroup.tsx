import * as React from "react";
import styles from "./ToggleGroup.module.css";

interface ToggleGroupProps<T extends string> {
    value: T;
    onValueChange: (value: T) => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

interface ToggleGroupItemProps<T extends string> {
    value: T;
    children: React.ReactNode;
}

interface ToggleGroupContext<T extends string> {
    selected: T;
    onSelect: (value: T) => void;
}

const ToggleGroupCtx = React.createContext<ToggleGroupContext<string> | null>(null);

function useToggleGroup() {
    const ctx = React.use(ToggleGroupCtx);
    if (!ctx) throw new Error("ToggleGroupItem must be used within ToggleGroup");
    return ctx;
}

export function ToggleGroup<T extends string>({ value, onValueChange, children, style }: ToggleGroupProps<T>) {
    const ctx = React.useMemo(
        () => ({ selected: value, onSelect: onValueChange as (v: string) => void }),
        [value, onValueChange],
    );

    return (
        <ToggleGroupCtx value={ctx}>
            <div role="group" style={style}>{children}</div>
        </ToggleGroupCtx>
    );
}

export function ToggleGroupItem<T extends string>({ value, children }: ToggleGroupItemProps<T>) {
    const { selected, onSelect } = useToggleGroup();
    const isSelected = selected === value;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(value)}
            className={`${styles.toggleGroupItem} ${isSelected ? styles.selected : ''}`}
        >
            {children}
        </button>
    );
}