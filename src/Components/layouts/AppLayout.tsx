import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
    title: ReactNode;
    children: ReactNode;
};

export function AppLayout({ title, children }: AppLayoutProps) {
    return (
        <div className={styles.shell}>
            <header className={styles.header}>{title}</header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}