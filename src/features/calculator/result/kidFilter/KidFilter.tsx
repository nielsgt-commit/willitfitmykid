import type {UserRecord} from "@/types/types.ts";
import {getKidColor} from "@constants/constants.ts";


type KidFilterProps = {
    kids: UserRecord[];
    activeKidIds: Set<number>;
    onToggle: (id: number) => void;
};

export function KidFilter({kids, activeKidIds, onToggle}: KidFilterProps) {
    if (kids.length === 0) return null;
    return (
        <div>
            {kids.map(kid => {
                const active = activeKidIds.has(kid.id);
                const color = getKidColor(kid.id);
                return (
                    <button
                        key={kid.id}
                        onClick={() => onToggle(kid.id)}
                        aria-pressed={active}
                        style={{'--kid-color': color} as React.CSSProperties}
                    >
                        <span />
                        {kid.name}
                    </button>
                );
            })}
        </div>
    );
}