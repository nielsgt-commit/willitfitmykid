import {INCREMENT_SIZE, DECREMENT_SIZE, SET_REGION} from "./size.action.ts";
import type {Action} from "./size.action.ts"
import type { Region } from "../../../types.ts";
import { listAvailableSizes } from "../../../Utils/size.utils.ts";
import { kidsClothingTable } from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {regions} from "../../../constants.ts";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup.tsx";
import { SwipeArea } from "./SwipeArea.tsx";
import * as React from "react";
import styles from "./Size.module.css";

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

    const prevRegion = () => {
        const prev = (regionIndex - 1 + regions.length) % regions.length;
        dispatch({ type: SET_REGION, payload: regions[prev] as Region });
    };

    const nextRegion = () => {
        const next = (regionIndex + 1) % regions.length;
        dispatch({ type: SET_REGION, payload: regions[next] as Region });
    };

    return (
        <>
        <p className={styles.regionLabel}> Region </p>
        <SwipeArea inputRegion={inputRegion} regions={regions} dispatch={dispatch} onDragMove={handleDragMove}>
            <div className={styles.sizeContainer}>
                <div className={styles.regionRow}>

                    <button onClick={prevRegion} className={styles.subtleButton}>&lsaquo;</button>
                    <div className={styles.regionWindow}>
                        <ToggleGroup
                            value={inputRegion}
                            onValueChange={(r) => dispatch({ type: SET_REGION, payload: r as Region })}
                            style={{
                                display: "flex",
                                width: `${regions.length * 100}%`,
                                transform: `translateX(${regionTranslate})`,
                                transition: isDragging ? "none" : "transform 0.4s ease",
                            }}
                        >
                            {regions.map((r) => (
                                <ToggleGroupItem key={r} value={r}>
                                    {r}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <button onClick={nextRegion} className={styles.subtleButton}>&rsaquo;</button>
                </div>
                <button onClick={() => dispatch({ type: INCREMENT_SIZE })} className={styles.subtleButton}>&#x2303;</button>
                <div className={styles.sizeWindow}>
                    <div
                        className={styles.sizeStrip}
                        style={{
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
                                    className={styles.sizeItem}
                                >
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button onClick={() => dispatch({ type: DECREMENT_SIZE })} className={styles.subtleButton}>&#x2304;</button>
            </div>
            <p className={styles.regionLabel}> Andre regioner </p>
            <p className={styles.conversionsLabel}>EU: {conversions?.EU} UK: {conversions?.UK} US: {conversions?.US}</p>
        </SwipeArea>
        </>
    );
}