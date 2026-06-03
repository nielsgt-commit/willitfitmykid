import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useDrag } from "@use-gesture/react";
import "./AppLayout.css";

type AppLayoutProps = {
    header: ReactNode;
    toggle: ReactNode;
    result?: ReactNode;
    conversions?: ReactNode;
    size?: ReactNode;
    sheet?: ReactNode;
    overlay?: ReactNode;
};

// Peek height kept in sync with --peek-h in AppLayout.css (8rem ≈ 128px).
const PEEK_PX = 128;

export function AppLayout({ header, toggle, result, conversions, size, sheet, overlay }: AppLayoutProps) {
    const hasCanvas = size !== undefined;

    const sheetRef = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [dragY, setDragY] = useState<number | null>(null);

    const collapseDistance = useCallback(() => {
        const h = sheetRef.current?.offsetHeight ?? 0;
        return Math.max(0, h - PEEK_PX);
    }, []);

    // Grabber-only drag: the sheet is a DOM sibling of the canvas, so the
    // size wheel's own use-gesture handler never sees these pointer events.
    const bindGrabber = useDrag(
        ({ movement: [, my], last }) => {
            const cd = collapseDistance();
            const base = open ? 0 : cd;
            const y = Math.min(cd, Math.max(0, base + my));
            if (last) {
                setDragY(null);
                setOpen(y < cd / 2);
            } else {
                setDragY(y);
            }
        },
        { axis: "y", filterTaps: true },
    );

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const sheetStyle =
        dragY !== null ? { transform: `translateY(${dragY}px)`, transition: "none" } : undefined;

    return (
        <div className="app-layout" data-open={open || undefined}>
            <header className="app-layout__header">
                {header}
                {toggle}
            </header>

            {hasCanvas && (
                <main className="app-layout__canvas">
                    {result !== undefined && <div className="app-layout__result">{result}</div>}
                    <div className="app-layout__wheelgroup">
                        {conversions !== undefined && (
                            <div className="app-layout__conversions">{conversions}</div>
                        )}
                        <div className="app-layout__size">{size}</div>
                    </div>
                </main>
            )}

            {hasCanvas && sheet !== undefined && (
                <aside
                    ref={sheetRef}
                    className="app-layout__sheet"
                    data-state={open ? "open" : "peek"}
                    style={sheetStyle}
                >
                    <button
                        type="button"
                        className="app-layout__grabber"
                        aria-expanded={open}
                        aria-controls="filter-sheet"
                        aria-label={open ? "Skjul filtre" : "Vis filtre"}
                        onClick={() => setOpen((v) => !v)}
                        {...bindGrabber()}
                    >
                        <span className="app-layout__grabber-bar" aria-hidden="true" />
                    </button>
                    <div
                        id="filter-sheet"
                        role="region"
                        aria-label="Filtre"
                        className="app-layout__sheet-body"
                    >
                        {sheet}
                    </div>
                </aside>
            )}

            {overlay !== undefined && <div className="app-layout__overlay">{overlay}</div>}
        </div>
    );
}
