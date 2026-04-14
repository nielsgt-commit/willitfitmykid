import type {State} from "../../../types.ts";
import {useKids} from "../../../context/KidsContext.tsx";
import {willFitWhen, formatSeasonRange} from "../../../Utils/fit.utils.ts";

export function Result({size}: Pick<State, 'size'>) {
    const { kids } = useKids();
    const willFitWhenResults = willFitWhen(kids, size);

    return (
        <>
            {willFitWhenResults.length > 0 ? (
                <p> Dette plagget passer trolig {willFitWhenResults.map(result => {
                    const { user, start, end } = result;
                    const range = formatSeasonRange(start, end);
                    return `${user.name} (${range})`;
                }).join(", ")} </p>
            ) : (
                <p>Passer ikke noen av barna i listen  </p>
            )}
        </>
    )
}
