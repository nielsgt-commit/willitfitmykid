import type {State} from "../../../types.ts";
import {useKids} from "../../../context/KidsContext.tsx";
import {willFitWhen} from "../../../Utils/fit.utils.ts";
import {ResultList} from "./ResultList.tsx";

export function Result({size}: Pick<State, "size">) {
    const {kids} = useKids();
    const results = willFitWhen(kids, size);

    if (results.length === 0) {
        return <p>Passer ikke noen av barna i listen</p>;
    }

    return (
        <p>
            Dette plagget passer trolig{" "}
            <ResultList results={results} />
        </p>
    );
}
