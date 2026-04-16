import type {Season, WillFitWhenResult} from "../../../../types/types.ts";
import {ResultItem} from "../resultItem/ResultItem.tsx";

type ResultListProps = {
    results: WillFitWhenResult[];
    filterSeasons?: Set<Season>;
};

export function ResultList({results, filterSeasons}: ResultListProps) {
    const multiUser = results.length > 1;

    return (
        <>
            {results.map((result) => (
                <ResultItem key={result.user.id} result={result} multiUser={multiUser} filterSeasons={filterSeasons} />
            ))}
        </>
    );
}
