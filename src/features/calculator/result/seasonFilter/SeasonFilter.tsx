import type {Season} from "@/types/types.ts";
import {SEASON_COLORS, SEASONS} from "@features/calculator/result/seasonRange/season.constants.ts";
import styles from "./SeasonFilter.module.css";


type SeasonFilterProps = {
    activeSeasons: Set<Season>;
    onToggle: (season: Season) => void;
};

export function SeasonFilter({activeSeasons, onToggle}: SeasonFilterProps) {
    return (
        <div className={styles.filter}>
            {SEASONS.map(season => {
                const active = activeSeasons.has(season);
                const color = SEASON_COLORS[season];
                return (
                    <button
                        key={season}
                        className={styles.chip}
                        onClick={() => onToggle(season)}
                        aria-pressed={active}
                        style={{'--season-color': color} as React.CSSProperties}
                    >
                        {season}
                    </button>
                );
            })}
        </div>
    );
}