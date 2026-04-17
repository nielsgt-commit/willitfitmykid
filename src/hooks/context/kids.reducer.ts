import type { UserRecord } from '@myTypes/types.ts';
import { ADD_KID, UPDATE_KID, REMOVE_KID, type Action } from './kids.action.ts';

export type KidsState = { kids: UserRecord[]; nextId: number };

export default function kidsReducer(state: KidsState, action: Action): KidsState {
    switch (action.type) {
        case ADD_KID: {
            const newKid: UserRecord = { ...action.payload, id: state.nextId };
            return { kids: [...state.kids, newKid], nextId: state.nextId + 1 };
        }
        case UPDATE_KID: {
            const { id, updates } = action.payload;
            return {
                ...state,
                kids: state.kids.map(k => (k.id === id ? { ...k, ...updates } : k)),
            };
        }
        case REMOVE_KID:
            return { ...state, kids: state.kids.filter(k => k.id !== action.payload) };

        default:
            return state;
    }
}
