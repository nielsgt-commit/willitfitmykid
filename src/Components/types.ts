import type {UserRecord} from './../TestUsers.ts'
import type {Region} from './../Data/SizeCharts/kids_clothing_sizes.ts'

export type MonthEntry = { Month: number; P1: number; P3: number; P5: number; P10: number; P15: number; P25: number; P50: number; P75: number; P85: number; P90: number; P95: number; P97: number };

type UserState = {
    selectedUserId: string | null;
    usersById: Record<string, UserRecord>;
    userOrder: string[];
};

export interface ProfileState {
    name: string;
    birthday: number;
    heightNow: number;
    calculatedPercentile: number;
}

export interface State {
    selectedUser: UserRecord ;
    size: `${number}`,
    inputRegion: Region,
    conversions: Partial<Record<'EU' | 'UK' | 'US', string>>,
}