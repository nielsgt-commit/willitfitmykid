/* eslint-disable react-refresh/only-export-components --
   This file is a result-view module: by contract it must export the
   `perKidExpandView` descriptor (a const object) alongside its component. */
import type { Season, UserRecord, WillFitWhenResult } from "@myTypes/types.ts";
import type {
    ResultViewDescriptor,
    ResultViewProps,
} from "@features/calculator/result/altViews/resultView.types.ts";
import { getKidColor } from "@constants/constants.ts";
import { SEASON_COLORS, SEASONS } from "@features/calculator/result/seasonRange/season.constants.ts";
import { currentSeason } from "@features/calculator/result/result.utils.ts";
import styles from "./PerKidExpandView.module.css";

type Endpoint = WillFitWhenResult["start"];
type Cell = { season: Season; year: number };

/** First letter of the first two name parts, uppercased — mirrors the kid card. */
function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    const first = parts[0][0] ?? "";
    const second = parts.length > 1 ? (parts[1][0] ?? "") : "";
    return (first + second).toUpperCase();
}

/** A kid currently fits if their fit window opens in the present season/year. */
function fitsNow(start: Endpoint): boolean {
    return start.season === currentSeason() && start.year === new Date().getFullYear();
}

function sameMoment(a: Endpoint, b: Endpoint): boolean {
    return a.season === b.season && a.year === b.year;
}

/** Expand a start→end span into every (season, year) cell it covers. */
function expandSeasons(start: Cell, end: Cell): Cell[] {
    const out: Cell[] = [];
    let i = SEASONS.indexOf(start.season);
    let y = start.year;
    while (y < end.year || (y === end.year && i <= SEASONS.indexOf(end.season))) {
        out.push({ season: SEASONS[i], year: y });
        if (++i >= SEASONS.length) {
            i = 0;
            y++;
        }
    }
    return out;
}

/** A small season-coloured chip, e.g. a coloured "Vår 2026". */
/**
 * A season chip. Filled in its season colour when that season is in the active
 * season filter; otherwise just an outline in the season colour — mirroring the
 * selected/unselected look of the season filter group.
 */
function SeasonTag({ season, year, selected }: Cell & { selected: boolean }) {
    const color = SEASON_COLORS[season];
    return (
        <span
            className={styles.seasonTag}
            style={{
                border: `var(--border-width) solid ${color}`,
                color: selected ? "#fff" : color,
                backgroundColor: selected ? color : "transparent",
            }}
        >
            {season} {year}
        </span>
    );
}

/** The condensed verdict shown in the collapsed summary — same as "Per barn". */
function FitLine({ result, activeSeasons }: { result: WillFitWhenResult; activeSeasons: Set<Season> }) {
    const { start, end } = result;
    const now = fitsNow(start);

    if (sameMoment(start, end)) {
        return (
            <>
                <span className={styles.lead}>{now ? "Passer nå" : "Passer"}</span>
                {!now && <SeasonTag season={start.season} year={start.year} selected={activeSeasons.has(start.season)} />}
            </>
        );
    }

    return (
        <>
            <span className={styles.lead}>{now ? "Passer nå" : "Passer"}</span>
            {now ? (
                <>
                    <span className={styles.connector}>t.o.m.</span>
                    <SeasonTag season={end.season} year={end.year} selected={activeSeasons.has(end.season)} />
                </>
            ) : (
                <>
                    <SeasonTag season={start.season} year={start.year} selected={activeSeasons.has(start.season)} />
                    <span className={styles.arrow} aria-hidden="true">→</span>
                    <SeasonTag season={end.season} year={end.year} selected={activeSeasons.has(end.season)} />
                </>
            )}
        </>
    );
}

function Avatar({ kid }: { kid: UserRecord }) {
    const color = getKidColor(kid.id);
    return (
        <span className={styles.avatar} style={{ borderColor: color, color }} aria-hidden="true">
            {getInitials(kid.name)}
        </span>
    );
}

/** A fitting kid: collapsed row + on-click reveal of the full season range. */
function FitRow({ kid, result, activeSeasons }: { kid: UserRecord; result: WillFitWhenResult; activeSeasons: Set<Season> }) {
    const cells = expandSeasons(
        { season: result.start.season, year: result.start.year },
        { season: result.end.season, year: result.end.year },
    );

    return (
        <li>
            <details className={styles.details}>
                <summary className={styles.summary}>
                    <Avatar kid={kid} />
                    <span className={styles.body}>
                        <span className={styles.name}>{kid.name}</span>
                        <span className={styles.verdict}>
                            <FitLine result={result} activeSeasons={activeSeasons} />
                        </span>
                    </span>
                    <span className={styles.pillFit} aria-label="Passer">✓ Passer</span>
                    <span className={styles.chevron} aria-hidden="true">⌄</span>
                </summary>

                <div className={styles.expand}>
                    {cells.map((cell) => (
                        <SeasonTag
                            key={`${cell.season}-${cell.year}`}
                            season={cell.season}
                            year={cell.year}
                            selected={activeSeasons.has(cell.season)}
                        />
                    ))}
                </div>
            </details>
        </li>
    );
}

/** A kid whose window doesn't intersect the chosen seasons: static, no reveal. */
function NoFitRow({ kid }: { kid: UserRecord }) {
    return (
        <li className={styles.row}>
            <Avatar kid={kid} />
            <span className={styles.body}>
                <span className={styles.name}>{kid.name}</span>
                <span className={styles.verdict}>
                    <span className={styles.noFitText}>Passer ikke i valgte sesonger</span>
                </span>
            </span>
            <span className={styles.pillNoFit} aria-label="Passer ikke">✗ Passer ikke</span>
        </li>
    );
}

function Empty({ children }: { children: string }) {
    return <p className={styles.empty}>{children}</p>;
}

function PerKidExpandView({ kids, filteredByKids, filtered, activeSeasons }: ResultViewProps) {
    if (kids.length === 0) {
        return <Empty>Legg til barn for å finne størrelser som passer og sesong.</Empty>;
    }
    if (filteredByKids.length === 0) {
        return <Empty>Ingen av barna i listen</Empty>;
    }
    if (activeSeasons.size === 0) {
        return <Empty>Velg sesong i panelet under</Empty>;
    }

    // Stable row set: one row per active-filter kid. Fitting kids expand to show
    // their full season range; others stay collapsed with a no-fit verdict.
    const inSeasonByKid = new Map<number, WillFitWhenResult>();
    for (const r of filtered) inSeasonByKid.set(r.user.id, r);

    return (
        <ul className={styles.list} aria-label="Resultat per barn">
            {filteredByKids.map((r) => {
                const inSeason = inSeasonByKid.get(r.user.id);
                return inSeason ? (
                    <FitRow key={r.user.id} kid={r.user} result={inSeason} activeSeasons={activeSeasons} />
                ) : (
                    <NoFitRow key={r.user.id} kid={r.user} />
                );
            })}
        </ul>
    );
}

export const perKidExpandView: ResultViewDescriptor = {
    id: "perKidExpand",
    label: "Barn +",
    Component: PerKidExpandView,
};
