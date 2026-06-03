import {kidsClothingTable} from "@data/sizeCharts/kids_clothing_sizes.ts";
import type {Region} from "@/types/types.ts";
import {type Action, DECREMENT_SIZE, INCREMENT_SIZE, SET_REGION} from "@features/calculator/size/size.action.ts";
import {findSizeForHeight, listAvailableSizes} from "@utils/size.utils.ts";
import {useKids} from "@hooks/context/KidsContext.tsx";
import {useKidFilter} from "@hooks/context/KidFilterContext.tsx";
import {getEffectiveHeight} from "@utils/growth.utils.ts";
import {getKidColor, regions} from "@constants/constants.ts";
import {useCallback, useMemo, useRef, useState, type CSSProperties, type Dispatch} from "react";
import {SwipeArea} from "@features/calculator/size/SwipeArea.tsx";
import {ToggleGroup, ToggleGroupItem} from "@features/calculator/size/ToggleGroup.tsx";
import styles from "@features/calculator/size/Size.module.css";


interface SizeProps {
    size: string;
    inputRegion: Region;
    conversions: Partial<Record<Region, string>>;
    dispatch: Dispatch<Action>;
}

const allSizes = [...listAvailableSizes(kidsClothingTable)].reverse();

export default function Size({ size, inputRegion, conversions, dispatch }: SizeProps) {
    const { kids } = useKids();
    const { activeKidIds } = useKidFilter();

    const kidsBySizeKey = useMemo(() => {
        const map = new Map<string, { name: string; id: number }[]>();
        for (const kid of kids) {
            if (!activeKidIds.has(kid.id)) continue;
            const key = findSizeForHeight(kidsClothingTable, getEffectiveHeight(kid)).key;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push({ name: kid.name, id: kid.id });
        }
        return map;
    }, [kids, activeKidIds]);
    const displayValue = conversions?.[inputRegion] ?? size;
    const [dragX, setDragX] = useState(0);
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const regionIndex = regions.indexOf(inputRegion);
    const sizeIndex = allSizes.findIndex(
        (row) => (row.conversions[inputRegion] ?? row.key) === displayValue,
    );
    const sizeWindowRef = useRef<HTMLDivElement>(null);

    const handleDragMove = useCallback((x: number, y: number, active: boolean) => {
        setDragX(x);
        setDragY(y);
        setIsDragging(active);
    }, []);

    const handleDragEnd = useCallback((_mx: number, my: number) => {
        if (Math.abs(my) < 5) return;
        const itemEl = sizeWindowRef.current?.querySelector<HTMLElement>('[data-size-item]');
        const itemHeight = itemEl?.getBoundingClientRect().height ?? 0;
        if (itemHeight === 0) return;
        const deltaSteps = Math.round(my / itemHeight);
        if (deltaSteps === 0) return;
        const actionType = deltaSteps > 0 ? INCREMENT_SIZE : DECREMENT_SIZE;
        const steps = Math.abs(deltaSteps);
        for (let i = 0; i < steps; i++) {
            dispatch({ type: actionType });
        }
    }, [dispatch]);

    // Region strip: horizontal, each chip = 1/3 of window so prev/next peek at the edges.
    const REGION_SLOTS = 3;
    const regionItemPercent = 100 / regions.length;
    const regionTranslate = `calc(${(1 - regionIndex) * regionItemPercent}% + ${dragX}px)`;

    // Size strip: vertical, fixed slot height in rem so window can show multiple slots.
    // Current slot is centered in a 2-slot-tall window: offset by half a slot.
    // A MAX sentinel is prepended and a MIN sentinel appended, so DOM positions are shifted by 1.
    const SLOT_REM = 3.5;
    const sizeTranslate = `calc(${(-0.5 - sizeIndex) * SLOT_REM}rem + ${dragY}px)`;

    const prevRegionIndex = (regionIndex - 1 + regions.length) % regions.length;
    const nextRegionIndex = (regionIndex + 1) % regions.length;

    const prevRegion = () => {
        dispatch({ type: SET_REGION, payload: regions[prevRegionIndex] as Region });
    };

    const nextRegion = () => {
        dispatch({ type: SET_REGION, payload: regions[nextRegionIndex] as Region });
    };

    return (
        <SwipeArea inputRegion={inputRegion} regions={regions} dispatch={dispatch} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
            <div className={styles.container}>
                <div className={styles.sizeRow}>
                    <div className={styles.sideControl}>
                        <button
                            className={styles.arrowButton}
                            onClick={prevRegion}
                            aria-label="Previous region"
                        >&lsaquo;</button>
                        <span className={styles.sideLabel}>{regions[prevRegionIndex]}</span>
                    </div>

                    <div className={styles.centerGroup}>
                    <div className={styles.regionStripRow}>
                        <div className={styles.regionStripWindow}>
                            <ToggleGroup
                                value={inputRegion}
                                onValueChange={(r) => dispatch({ type: SET_REGION, payload: r as Region })}
                                style={{
                                    display: "flex",
                                    width: `${(regions.length * 100) / REGION_SLOTS}%`,
                                    transform: `translateX(${regionTranslate})`,
                                    transition: isDragging ? "none" : "transform 0.4s ease",
                                }}
                            >
                                {regions.map((r) => (
                                    <ToggleGroupItem
                                        key={r}
                                        value={r}
                                        className={styles.regionChip}
                                        style={{ width: `${100 / regions.length}%` }}
                                    >
                                        {r}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.sizeWindowWrapper}>
                        <button
                            type="button"
                            className={`${styles.sizeStepOverlay} ${styles.sizeStepOverlayTop}`}
                            onClick={() => dispatch({ type: INCREMENT_SIZE })}
                            aria-label="Larger size"
                        >larger</button>
                        <button
                            type="button"
                            className={`${styles.sizeStepOverlay} ${styles.sizeStepOverlayBottom}`}
                            onClick={() => dispatch({ type: DECREMENT_SIZE })}
                            aria-label="Smaller size"
                        >smaller</button>
                        <div ref={sizeWindowRef} className={styles.sizeWindow}>
                            <div
                                style={{
                                    height: `${(allSizes.length + 2) * SLOT_REM}rem`,
                                    transform: `translateY(${sizeTranslate})`,
                                    transition: isDragging ? "none" : "transform 0.3s ease",
                                }}
                            >
                                <div className={`${styles.sizeItem} ${styles.sizeSentinel}`} aria-hidden="true">MAX</div>
                                {allSizes.map((row) => {
                                    const label = row.conversions[inputRegion] ?? row.key;
                                    const kidsHere = kidsBySizeKey.get(row.key);
                                    return (
                                        <div key={row.key} data-size-item className={styles.sizeItem}>
                                            {label}
                                            {kidsHere && (
                                                <div className={styles.kidChips}>
                                                    {kidsHere.map(({ name, id }) => (
                                                        <span
                                                            key={id}
                                                            className={styles.kidChip}
                                                            title={name}
                                                            style={{'--kid-color': getKidColor(id)} as CSSProperties}
                                                        >
                                                            {name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                <div className={`${styles.sizeItem} ${styles.sizeSentinel}`} aria-hidden="true">MIN</div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className={styles.sideControl}>
                        <button
                            className={styles.arrowButton}
                            onClick={nextRegion}
                            aria-label="Next region"
                        >&rsaquo;</button>
                        <span className={styles.sideLabel}>{regions[nextRegionIndex]}</span>
                    </div>
                </div>
            </div>
        </SwipeArea>
    );
}