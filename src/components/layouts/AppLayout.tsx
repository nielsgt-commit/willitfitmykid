import type {ReactNode} from "react";

type AppLayoutProps = {
    title: ReactNode;
    children: ReactNode;
};

export function AppLayout({ title, children }: AppLayoutProps) {
    return (
        <div>
            <header>{title}</header>
            <main>{children}</main>
        </div>
    );
}