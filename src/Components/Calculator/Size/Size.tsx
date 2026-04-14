import {INCREMENT_SIZE, DECREMENT_SIZE, SET_REGION} from "./size.action.ts";
import type {Action} from "./size.action.ts"
import type { Region } from "../../../types.ts";
import { listAvailableSizes } from "../../../Utils/size.utils.ts";
import { kidsClothingTable } from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {regions} from "../../../constants.ts";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup.tsx";
import { SwipeArea } from "./SwipeArea.tsx";
import * as React from "react";

interface SizeProps {
    size: string;
    inputRegion: Region;
    conversions: Partial<Record<'EU' | 'UK' | 'US', string>>;
    dispatch: React.Dispatch<Action>;
}

const allSizes = listAvailableSizes(kidsClothingTable);

export default function Size({ size, inputRegion, conversions, dispatch }: SizeProps) {
    const displayValue = conversions?.[inputRegion] ?? size;
    const [dragX, setDragX] = React.useState(0);
    const [dragY, setDragY] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const regionIndex = regions.indexOf(inputRegion);
    const sizeIndex = allSizes.findIndex(
        (row) => (row.conversions[inputRegion] ?? row.key) === displayValue,
    );

    const handleDragMove = React.useCallback((x: number, y: number, active: boolean) => {
        setDragX(x);
        setDragY(y);
        setIsDragging(active);
    }, []);

    // Region strip: horizontal, 1/N per item
    const regionItemPercent = 100 / regions.length;
    const regionTranslate = `calc(-${regionIndex * regionItemPercent}% + ${dragX}px)`;

    // Size strip: vertical, 1/N per item
    const sizeItemPercent = 100 / allSizes.length;
    const sizeTranslate = `calc(-${sizeIndex * sizeItemPercent}% + ${dragY}px)`;

    const subtleButton: React.CSSProperties = {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.25rem",
        opacity: 0.5,
    };

    const prevRegion = () => {
        const prev = (regionIndex - 1 + regions.length) % regions.length;
        dispatch({ type: SET_REGION, payload: regions[prev] as Region });
    };

    const nextRegion = () => {
        const next = (regionIndex + 1) % regions.length;
        dispatch({ type: SET_REGION, payload: regions[next] as Region });
    };

    return (
        <SwipeArea inputRegion={inputRegion} regions={regions} dispatch={dispatch} onDragMove={handleDragMove}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button onClick={prevRegion} style={subtleButton}>&lsaquo;</button>
                    <div style={{ overflow: "hidden", width: "4rem" }}>
                        <ToggleGroup
                            value={inputRegion}
                            onValueChange={(r) => dispatch({ type: SET_REGION, payload: r as Region })}
                            style={{
                                display: "flex",
                                width: `${regions.length * 100}%`,
                                transform: `translateX(${regionTranslate})`,
                                transition: isDragging ? "none" : "transform 0.3s ease",
                            }}
                        >
                            {regions.map((r) => (
                                <ToggleGroupItem key={r} value={r}>
                                    {r}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <button onClick={nextRegion} style={subtleButton}>&rsaquo;</button>
                </div>
                <button onClick={() => dispatch({ type: INCREMENT_SIZE })} style={subtleButton}>&#x2303;</button>
                <div style={{ overflow: "hidden", height: "2rem" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: `${allSizes.length * 100}%`,
                            transform: `translateY(${sizeTranslate})`,
                            transition: isDragging ? "none" : "transform 0.3s ease",
                        }}
                    >
                        {allSizes.map((row) => {
                            const label = row.conversions[inputRegion] ?? row.key;
                            return (
                                <div
                                    key={row.key}
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button onClick={() => dispatch({ type: DECREMENT_SIZE })} style={subtleButton}>&#x2304;</button>
            </div>
            <p> Conversions </p>
            <p>EU: {conversions?.EU} UK: {conversions?.UK} US: {conversions?.US}</p>
        </SwipeArea>
    );
}