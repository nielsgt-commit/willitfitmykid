import { useReducer } from 'react';
import { INCREMENT_AGE, DECREMENT_AGE, SET_AGE } from './ageReducer.ts'; // TODO

export default function Age() {
 const intialState = { age: 0 };

    return (
        <>
            <h1>Age buttons </h1>
            <button onClick={() => dispatch( { type: INCREMENT_AGE}) }> + </button>
            <input type="number" value={age} onChange={(e) => dispatch({ type: SET_AGE, payload: parseInt(e.target.value) })} />
            <button onClick={() => dispatch( { type: DECREMENT_AGE}) }> - </button>
        </>
    )

}
