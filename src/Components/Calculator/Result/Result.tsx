import type {State} from "../../types.ts";

import {testUsers} from "../../../TestUsers.ts";

interface ResultProps {
    state: State;
}

export function Result({selectedUser, size}: State): ResultProps{
    const child_name = selectedUser.name;
    const projected_season = " Sommer"; // getProjectedSeason( selectedUser.birthday, selectedUser.percentile);
    const projected_year = "2027"; // getProjectedYear( selectedUser.birthday, selectedUser.percentile);

    const matchesNow = testUsers.filter(testUser => size === testUser.sizeNow);



    return (
        <>
            {matchesNow.length > 0 ? (
                <p> Dette plagget passer trolig {matchesNow.map(user => user.name).join(", ")} nå. </p>
            ) : (
                <p>Passer ikke noen nå</p>
            )}
        </>
    )
}
