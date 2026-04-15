import * as React from "react";
import { useDrag } from "@use-gesture/react";
import { INCREMENT_SIZE, DECREMENT_SIZE, SET_REGION } from "./size.action.ts";
import type { Action } from "./size.action.ts";
import type { Region } from "../../../types.ts";
import styles from "./SwipeArea.module.css";

interface SwipeAreaProps {
    inputRegion: Region;
    regions: readonly Region[];
    dispatch: React.Dispatch<Action>;
    onDragMove?: (x: number, y: number, active: boolean) => void;
    children: React.ReactNode;
}

export function SwipeArea({ inputRegion, regions, dispatch, onDragMove, children }: SwipeAreaProps) {
    const indexRef = React.useRef(regions.indexOf(inputRegion));
    React.useEffect(() => {
        indexRef.current = regions.indexOf(inputRegion);
    }, [inputRegion, regions]);

    const bind = useDrag(({ swipe: [swipeX, swipeY], movement: [mx, my], active, last }) => {
        onDragMove?.(active ? mx : 0, active ? my : 0, active);

        if (!last) return;

        if (swipeX === -1) {
            const next = (indexRef.current + 1) % regions.length;
            dispatch({ type: SET_REGION, payload: regions[next] });
        } else if (swipeX === 1) {
            const prev = (indexRef.current - 1 + regions.length) % regions.length;
            dispatch({ type: SET_REGION, payload: regions[prev] });
        }

        if (swipeY === 1) {
            dispatch({ type: INCREMENT_SIZE });
        } else if (swipeY === -1) {
            dispatch({ type: DECREMENT_SIZE });
        }
    }, {
        swipe: { distance: 20, velocity: 0.1, duration: 500 },
    });

    return (
        <div {...bind()} className={styles.swipeArea}>
            {children}
        </div>
    );
}