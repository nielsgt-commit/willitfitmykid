import * as React from "react";
import type {Season} from "../../../../types/types.ts";
import {SEASONS, SEASON_COLORS} from "../seasonRange/season.constants.ts";
import styles from "./SeasonFilter.module.css";

type SeasonFilterProps = {
    activeSeasons: Set<Season>;
    onToggle: (season: Season) => void;
};

export function SeasonFilter({activeSeasons, onToggle}: SeasonFilterProps) {
    return (
        <div className={styles.seasonButtons}>
            {SEASONS.map(season => {
                const active = activeSeasons.has(season);
                const color = SEASON_COLORS[season];
                return (
                    <button
                        key={season}
                        onClick={() => onToggle(season)}
                        className={`${styles.seasonButton} ${active ? styles.active : ''}`}
                        style={{'--season-color': color} as React.CSSProperties}
                    >
                        {season}
                    </button>
                );
            })}
        </div>
    );
}