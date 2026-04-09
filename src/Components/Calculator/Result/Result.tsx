import type {State} from "../../types.ts";

import {Temporal} from "temporal-polyfill";
import {testUsers} from "../../../TestUsers.ts";

interface ResultProps {
    state: State;
}

function calculateAgeInMonths(birthday: Temporal.PlainDate): number {
    const today = Temporal.Now.plainDateISO();
    const duration = birthday.until(today, { largestUnit: 'months' });
    return duration.months + (duration.years * 12);
}





export function Result({selectedUser, size}: State): ResultProps{
    const child_name = selectedUser.name;
    const projected_season = " Sommer"; // getProjectedSeason( selectedUser.birthday, selectedUser.percentile);
    const projected_year = "2027"; // getProjectedYear( selectedUser.birthday, selectedUser.percentile);

    const matchesNow = testUsers.filter(testUser => size === testUser.sizeNow);


    const ageMonths = calculateAgeInMonths(selectedUser.birthday);

//

    return (
        <>
            {matchesNow.length > 0 ? (
                <p> Dette plagget passer trolig {matchesNow.map(user => user.name).join(", ")} nå. </p>
            ) : (
                <p>Passer ikke noen nå {ageMonths}</p>
            )}
        </>
    )
}
