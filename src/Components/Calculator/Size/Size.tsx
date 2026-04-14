import {INCREMENT_SIZE, DECREMENT_SIZE, SET_SIZE, SET_REGION} from "./size.action.ts";
import type {Action} from "./size.action.ts"
import type { Region } from "../../../types.ts";
import { listAvailableSizes } from "../../../Utils/size.utils.ts";
import { kidsClothingTable } from "../../../Data/SizeCharts/kids_clothing_sizes.ts";
import {regions} from "../../../constants.ts";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup.tsx";
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

    return (
        <>

            <ToggleGroup value={inputRegion} onValueChange={(r) => dispatch({ type: SET_REGION, payload: r as Region })}>
                {regions.map((r) => (
                    <ToggleGroupItem key={r} value={r}>
                        {r}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <button onClick={() => dispatch({ type: DECREMENT_SIZE })}> - </button>
            <select
                value={displayValue}
                onChange={(e) => dispatch({ type: SET_SIZE, payload: e.target.value })}
            >
                {allSizes.map((row) => {
                    const label = row.conversions[inputRegion] ?? row.key;
                    return (
                        <option key={row.key} value={label}>
                            {label}
                        </option>
                    );
                })}
            </select>
            <button onClick={() => dispatch({ type: INCREMENT_SIZE })}> + </button>
            <p> Conversions </p>
            <p>EU: {conversions?.EU} UK: {conversions?.UK} US: {conversions?.US}</p>
        </>
    );
}