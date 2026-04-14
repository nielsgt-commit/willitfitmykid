import type {WillFitWhenResult} from "../../../types.ts";
import {ResultItem} from "./ResultItem.tsx";

type ResultListProps = {
    results: WillFitWhenResult[];
};

export function ResultList({results}: ResultListProps) {
    const multiUser = results.length > 1;

    return (
        <>
            {results.map((result) => (
                <ResultItem key={result.user.id} result={result} multiUser={multiUser} />
            ))}
        </>
    );
}
