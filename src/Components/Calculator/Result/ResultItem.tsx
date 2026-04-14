import type {WillFitWhenResult} from "../../../types.ts";
import {UserName} from "./UserName.tsx";
import {SeasonRange} from "./SeasonRange.tsx";

type ResultItemProps = {
    result: WillFitWhenResult;
    multiUser: boolean;
};

export function ResultItem({result, multiUser}: ResultItemProps) {
    const content = (
        <>
            <UserName name={result.user.name} />{" "}
            <SeasonRange start={result.start} end={result.end} />
        </>
    );

    if (multiUser) {
        return <div>{content}</div>;
    }

    return <span>{content}</span>;
}
