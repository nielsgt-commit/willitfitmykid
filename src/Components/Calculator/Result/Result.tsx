import type {State} from "../../types.ts";

interface ResultProps {
    state: State;
}

export function Result({state}: State){
    const child_name =" Barnets navn";
    const projected_season = " Sommer";
    const projected_year = "2027";

    return (
        <>
            <p>` Dette plagget vil trolig passe {child_name}, {projected_season} i {projected_year}.`</p>
        </>

    )
}
