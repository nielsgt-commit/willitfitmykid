import {DECREMENT_AGE, INCREMENT_AGE, SET_AGE   } from "./months.action.ts";

interface MonthsProps {
    months: number;
    dispatch: React.Dispatch<any>;
}
// Months
export default function Months({ months ,dispatch}: MonthsProps){
    return (
        <>
            <h1>Age </h1>
            <button onClick={() => dispatch( { type: DECREMENT_AGE })}> - </ button>
            <input type="number" value={months} onChange={(e) => dispatch({ type: SET_AGE, payload: parseInt(e.target.value) })} />
            <button onClick={() => dispatch( { type: INCREMENT_AGE })}> + </button>
        </>
    )

}
