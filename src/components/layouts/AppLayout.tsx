import { useState, type ReactNode } from "react";
import "./AppLayout.css";

type AppLayoutProps = {
    header: ReactNode;
    toggle: ReactNode;
    chips: ReactNode;
    conversions?: ReactNode;
    size?: ReactNode;
    result?: ReactNode;
    overlay?: ReactNode;
};

export function AppLayout({ header, toggle, chips, conversions, size, result, overlay }: AppLayoutProps) {
    const [flipped, setFlipped] = useState(false);
    const hasBody = conversions !== undefined || size !== undefined;

    return (
        <div className={`app-layout ${flipped ? 'app-layout--flipped' : ''}`}>
            <header className="app-layout__header">{header}</header>
            <div className="app-layout__toggle">{toggle}</div>
            <div className="app-layout__chips">{chips}</div>
            {hasBody && (
                <div className="app-layout__body">
                    {conversions !== undefined && <div className="app-layout__conversions">{conversions}</div>}
                    <button
                        type="button"
                        className="app-layout__flip"
                        onClick={() => setFlipped(f => !f)}
                        aria-label="Flip layout"
                        title="Flip layout"
                    >
                        &#x21C4;
                    </button>
                    {size !== undefined && <div className="app-layout__size">{size}</div>}
                </div>
            )}
            {result !== undefined && <div className="app-layout__result">{result}</div>}
            {overlay !== undefined && <div className="app-layout__overlay">{overlay}</div>}
        </div>
    );
}