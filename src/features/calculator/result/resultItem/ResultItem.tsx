import type {Season, WillFitWhenResult} from "../../../../types/types.ts";
import {UserName} from "../userName/UserName.tsx";
import {SeasonRange} from "../seasonRange/SeasonRange.tsx";
import {getKidColor} from "../../../../constants/constants.ts";

type ResultItemProps = {
    result: WillFitWhenResult;
    multiUser: boolean;
    filterSeasons?: Set<Season>;
};

export function ResultItem({result, multiUser, filterSeasons}: ResultItemProps) {
    const color = getKidColor(result.user.id);
    const content = (
        <>
            <UserName name={result.user.name} color={color} />{" "}
            <SeasonRange start={result.start} end={result.end} filterSeasons={filterSeasons} />
        </>
    );

    if (multiUser) {
        return <div>{content}</div>;
    }

    return <span>{content}</span>;
}
