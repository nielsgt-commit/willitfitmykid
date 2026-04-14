import type {Season, WillFitWhenResult} from "../../../types.ts";

type SeasonRangeProps = {
    start: WillFitWhenResult['start'];
    end: WillFitWhenResult['end'];
};

const SEASONS: Season[] = ['Vinter' as Season, 'Vår' as Season, 'Sommer' as Season, 'Høst' as Season];

const SEASON_COLORS: Record<Season, string> = {
    Vinter: '#4a90d9',
    Vår: '#4caf50',
    Sommer: '#e91e78',
    Høst: '#e65100',
};

function expandSeasons(start: { season: Season; year: number }, end: { season: Season; year: number }): { season: Season; year: number }[] {
    const result: { season: Season; year: number }[] = [];
    let seasonIdx = SEASONS.indexOf(start.season);
    let year = start.year;

    while (year < end.year || (year === end.year && seasonIdx <= SEASONS.indexOf(end.season))) {
        result.push({season: SEASONS[seasonIdx], year});
        seasonIdx++;
        if (seasonIdx >= SEASONS.length) {
            seasonIdx = 0;
            year++;
        }
    }

    return result;
}

export function SeasonRange({start, end}: SeasonRangeProps) {
    const pairs = expandSeasons(start, end);

    return (
        <>
            {pairs.map((pair, i) => (
                <span key={`${pair.season}-${pair.year}`}>
                    {i > 0 && i < pairs.length - 1 && ", "}
                    {i > 0 && i === pairs.length - 1 && " og "}
                    <span style={{ textDecoration: 'underline', textDecorationColor: SEASON_COLORS[pair.season], textUnderlineOffset: '2px' }}>
                        {pair.season} {pair.year}
                    </span>
                </span>
            ))}
        </>
    );
}
