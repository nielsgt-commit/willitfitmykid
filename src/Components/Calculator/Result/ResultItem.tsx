import type {Season, WillFitWhenResult} from "../../../types.ts";
import {UserName} from "./UserName.tsx";
import {SeasonRange} from "./SeasonRange.tsx";

type ResultItemProps = {
    result: WillFitWhenResult;
    multiUser: boolean;
    filterSeasons?: Set<Season>;
};

export function ResultItem({result, multiUser, filterSeasons}: ResultItemProps) {
    const content = (
        <>
            <UserName name={result.user.name} />{" "}
            <SeasonRange start={result.start} end={result.end} filterSeasons={filterSeasons} />
        </>
    );

    if (multiUser) {
        return <div>{content}</div>;
    }

    return <span>{content}</span>;
}
