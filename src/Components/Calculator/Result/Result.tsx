import type {State} from "../../types.ts";

interface ResultProps {
    state: State;
}

export function Result({selectedUser}: State){
    const child_name = selectedUser.name;
    const projected_season = " Sommer"; // getProjectedSeason( selectedUser.birthday, selectedUser.percentile);
    const projected_year = "2027"; // getProjected

    return (
        <>
            <p>` Dette plagget vil trolig passe {child_name}, {projected_season} i {projected_year}.`</p>
        </>

    )
}
