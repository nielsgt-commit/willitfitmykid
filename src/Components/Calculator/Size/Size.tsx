import { INCREMENT_SIZE, DECREMENT_SIZE, SET_SIZE } from "./size.action.ts";

interface SizeProps {
    size: number | string | undefined;
    dispatch: React.Dispatch<any>;
}

export default function Size( { size, dispatch }: SizeProps) {
    return (
        <>
             <h1>Size</h1>
              <button onClick={() => dispatch( { type: DECREMENT_SIZE}) }> - </button>
              <input type="number" value={size} onChange={(e) => dispatch({ type: SET_SIZE, payload: parseInt(e.target.value) })} />
                <button onClick={() => dispatch( { type: INCREMENT_SIZE}) }> + </button>
        </>
    )
}