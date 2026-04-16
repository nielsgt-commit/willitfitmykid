import type {Season} from "../../../../types/types.ts";

export const SEASONS: Season[] = ['Vinter' as Season, 'Vår' as Season, 'Sommer' as Season, 'Høst' as Season];

export const SEASON_COLORS: Record<Season, string> = {
    Vinter: '#4a90d9',
    Vår: '#4caf50',
    Sommer: '#e91e78',
    Høst: '#e65100',
};