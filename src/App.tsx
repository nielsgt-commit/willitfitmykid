import { useReducer } from "react";
import Calculator from "./Components/Calculator/Calculator.tsx";
import {MyKids} from "./Components/MyKids/MyKids.tsx";

type AppState = { showMyKids: boolean };
type AppAction = { type: 'TOGGLE_MY_KIDS' };

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'TOGGLE_MY_KIDS':
            return { ...state, showMyKids: !state.showMyKids };
        default:
            return state;
    }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, { showMyKids: false });

  return (
      <>
        <h1>Will it fit my kid?</h1>
        <button onClick={() => dispatch({ type: 'TOGGLE_MY_KIDS' })}>
            {state.showMyKids ? 'Skjul mine barn' : 'Vis mine barn'}
        </button>
        {state.showMyKids && <MyKids />}
        <Calculator />
      </>
  )
}

export default App