import type {Season} from "@/types/types.ts";
import styles from "@features/calculator/result/seasonFilter/SeasonFilter.module.css";
import {SEASON_COLORS, SEASONS} from "@features/calculator/result/seasonRange/season.constants.ts";


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