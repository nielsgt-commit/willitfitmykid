import {INCREMENT_SIZE, DECREMENT_SIZE, SET_REGION} from "./size.action.ts";
import type {Action} from "./size.action.ts"
import type { Region } from "../../../types.ts";
import { listAvailableSizes, findSizeForHeight } from "../../../Utils/size.utils.ts";
import { getEffectiveHeight } from "../../../Utils/growth.utils.ts";
import { kidsClothingTable } from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {regions, getKidColor} from "../../../constants.ts";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup.tsx";
import { SwipeArea } from "./SwipeArea.tsx";
import { SizeConversions } from "./SizeConversions.tsx";
import * as React from "react";
import styles from "./Size.module.css";
import { useKids } from "../../../context/KidsContext.tsx";

interface SizeProps {
    size: string;
    inputRegion: Region;
    conversions: Partial<Record<Region, string>>;
    dispatch: React.Dispatch<Action>;
}

const allSizes = listAvailableSizes(kidsClothingTable);

export default function Size({ size, inputRegion, conversions, dispatch }: SizeProps) {
    const { kids } = useKids();

    const kidsBySizeKey = React.useMemo(() => {
        const map = new Map<string, { name: string; id: number }[]>();
        for (const kid of kids) {
            const key = findSizeForHeight(kidsClothingTable, getEffectiveHeight(kid)).key;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push({ name: kid.name, id: kid.id });
        }
        return map;
    }, [kids]);
    const displayValue = conversions?.[inputRegion] ?? size;
    const [dragX, setDragX] = React.useState(0);
    const [dragY, setDragY] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const regionIndex = regions.indexOf(inputRegion);
    const sizeIndex = allSizes.findIndex(
        (row) => (row.conversions[inputRegion] ?? row.key) === displayValue,
    );
    const sizeWindowRef = React.useRef<HTMLDivElement>(null);

    const handleDragMove = React.useCallback((x: number, y: number, active: boolean) => {
        setDragX(x);
        setDragY(y);
        setIsDragging(active);
    }, []);

    const handleDragEnd = React.useCallback((mx: number, my: number) => {
        const itemHeight = sizeWindowRef.current?.clientHeight ?? 0;
        if (itemHeight === 0 || Math.abs(my) < 5) return;
        const deltaSteps = Math.round(my / itemHeight);
        if (deltaSteps === 0) return;
        const actionType = deltaSteps > 0 ? DECREMENT_SIZE : INCREMENT_SIZE;
        const steps = Math.abs(deltaSteps);
        for (let i = 0; i < steps; i++) {
            dispatch({ type: actionType });
        }
    }, [dispatch]);

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
        <SwipeArea inputRegion={inputRegion} regions={regions} dispatch={dispatch} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
            <div className={styles.sizeContainer}>

                <p className={styles.regionLabel}> Region </p>
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
                <div className={styles.sizeWindow} ref={sizeWindowRef}>
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
                            const kidsHere = kidsBySizeKey.get(row.key);
                            return (
                                <div
                                    key={row.key}
                                    className={styles.sizeItem}
                                >
                                    {label}
                                    {kidsHere && (
                                        <div className={styles.kidDots}>
                                            {kidsHere.map(({ name, id }) => {
                                                const color = getKidColor(id);
                                                return (
                                                    <div key={id} className={styles.kidDot} title={name} style={{ backgroundColor: color }}>
                                                        <span className={styles.kidDotName} style={{ color }}>{name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button onClick={() => dispatch({ type: DECREMENT_SIZE })} className={styles.subtleButton}>&#x2304;</button>
            </div>
            <p className={styles.regionLabel}> Andre regioner </p>
            <SizeConversions conversions={conversions} />
        </SwipeArea>
        </>
    );
}