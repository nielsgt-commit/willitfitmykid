import { INCREMENT_AGE, DECREMENT_AGE, SET_AGE } from './../../actions.ts';

interface AgeProps {
    age: number;
    dispatch: React.Dispatch<any>;
}



export default function Age( { age, dispatch }: AgeProps) {

    return (
        <>
            <h1>Age buttons </h1>

            <button onClick={() => dispatch( { type: DECREMENT_AGE}) }> - </button>
            <input type="number" value={age} onChange={(e) => dispatch({ type: SET_AGE, payload: parseInt(e.target.value) })} />
            <button onClick={() => dispatch( { type: INCREMENT_AGE}) }> + </button>
        </>
    )

}
