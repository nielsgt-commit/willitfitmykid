import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
    title: ReactNode;
    actions?: ReactNode;
    children: ReactNode;
};

export function AppLayout({ title, actions, children }: AppLayoutProps) {
    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                {title}
                {actions && <div className={styles.actions}>{actions}</div>}
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}