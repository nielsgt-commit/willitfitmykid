import {getEffectiveHeight} from "@utils/growth.utils.ts";
import type {UserRecord} from "@/types/types.ts";
import {getKidColor} from "@constants/constants.ts";


type KidDetailProps = {
    kid: UserRecord;
};

export function KidDetail({ kid }: KidDetailProps) {
    const height = getEffectiveHeight(kid);
    const color = getKidColor(kid.id);
    return (
        <div>
            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', backgroundColor: color, flexShrink: 0, display: 'inline-block' }} />
            {kid.name}  {kid.sex === 'F' ? 'Jente' : 'Gutt'}  {kid.birthday.toString()}  P{kid.calculatedPercentile}
            {height ? `  ${height} cm${kid.heightNow === undefined ? ' (beregnet)' : ''}` : ''}
        </div>
    );
}
