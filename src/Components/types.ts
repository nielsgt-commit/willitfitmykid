import type {UserRecord} from './../TestUsers.ts'

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
    conversions: Partial<Record<'EU' | 'UK' | 'US', string>>,
}