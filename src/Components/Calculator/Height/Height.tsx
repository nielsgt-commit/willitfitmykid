interface HeightProps {
    height: number;
    dispatch: React.Dispatch<any>;
}

import {DECREMENT_HEIGHT, INCREMENT_HEIGHT, SET_HEIGHT} from "../../actions.ts";

export default function Height( { height, dispatch }: HeightProps) {

    return (
        <>
            <h1> Height</h1>
            <button onClick={() => dispatch( { type: DECREMENT_HEIGHT}) }> - </button>
            <input type="number" value={height} onChange={(e) => dispatch({ type: SET_HEIGHT, payload: parseInt(e.target.value) })} />
            <button onClick={() => dispatch( { type: INCREMENT_HEIGHT}) }> + </button>
       </> )
}


