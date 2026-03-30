import {initialState} from "../initialState.tsx";
import {heightReducer} from "./height.reducer.ts";
import {useReducer} from "react";
import { INCREMENT_HEIGHT, DECREMENT_HEIGHT, SET_HEIGHT } from "./height.action.ts";


interface HeightProps {
    height: number;
    dispatch: React.Dispatch<any>;
};


export default function Height( { height, dispatch }: HeightProps) {
    return (
        <>
            <h1> Height</h1>
            <button onClick={() => dispatch( { type: DECREMENT_HEIGHT}) }> - </button>
            <input type="number" value={height} onChange={(e) => dispatch({ type: SET_HEIGHT, payload: parseInt(e.target.value) })} />
            <button onClick={() => dispatch( { type: INCREMENT_HEIGHT}) }> + </button>
       </> )
}


