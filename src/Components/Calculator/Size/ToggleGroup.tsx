import * as React from "react";

interface ToggleGroupProps<T extends string> {
    value: T;
    onValueChange: (value: T) => void;
    children: React.ReactNode;
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

export function ToggleGroup<T extends string>({ value, onValueChange, children }: ToggleGroupProps<T>) {
    const ctx = React.useMemo(
        () => ({ selected: value, onSelect: onValueChange as (v: string) => void }),
        [value, onValueChange],
    );

    return (
        <ToggleGroupCtx value={ctx}>
            <div role="group">{children}</div>
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
            style={{ fontWeight: isSelected ? "bold" : "normal" }}
        >
            {children}
        </button>
    );
}
