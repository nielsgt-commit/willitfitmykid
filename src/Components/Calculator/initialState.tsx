import type { State } from "../types";
import {testUsers} from "../../TestUsers.ts";

export const initialState : State  = {
    selectedUser: testUsers[0],
    size: '86',
    inputRegion: 'EU',
    conversions: {},
}