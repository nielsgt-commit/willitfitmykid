interface PercentileProps {
    percentile: number;
    dispatch: React.Dispatch<any>;
}

import {INCREMENT_PERCENTILE, DECREMENT_PERCENTILE, SET_PERCENTILE} from "../actions.ts";

export default function Percentile({percentile, dispatch}: PercentileProps) {

    return (
        <>
            <h1>Percentile</h1>
             <button onClick={() => dispatch( { type: DECREMENT_PERCENTILE}) }> - </button>
             <input type="number" value={percentile} onChange={(e) => dispatch({ type: SET_PERCENTILE, payload: parseInt(e.target.value) })} />
             <button onClick={() => dispatch( { type: INCREMENT_PERCENTILE}) }> + </button>
        </>
    )
}