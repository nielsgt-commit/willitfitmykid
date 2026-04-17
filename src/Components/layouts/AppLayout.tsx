import styles from "@features/MyKids.module.css";
import type {ReactNode} from "react";

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