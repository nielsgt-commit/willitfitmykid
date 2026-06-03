import styles from "./Tabs.module.css";

export type Tab = "results" | "mykids";

type TabsProps = {
    value: Tab;
    onChange: (tab: Tab) => void;
};

const TABS: { id: Tab; label: string }[] = [
    { id: "results", label: "Når passer størrelsen" },
    { id: "mykids", label: "Mine barn" },
];

/** Top-level two-tab switch: Resultater (calculator) ↔ Mine barn (management). */
export function Tabs({ value, onChange }: TabsProps) {
    return (
        <div role="tablist" aria-label="Visning" className={styles.tabs}>
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={value === tab.id}
                    className={styles.tab}
                    onClick={() => onChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
