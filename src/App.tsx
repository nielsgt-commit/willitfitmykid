import { useReducer } from "react";
import Calculator from "./Components/Calculator/Calculator.tsx";
import { MyKids } from "./Components/MyKids/MyKids.tsx";
import { KidsProvider, useKids } from "./context/KidsContext.tsx";

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

function AppContent() {
  const [state, dispatch] = useReducer(appReducer, { showMyKids: false });
  const { kids } = useKids();

  const buttonText = state.showMyKids ? 'Skjul mine barn' : 'Vis mine barn';

  return (
      <>
        <h1>Will it fit my kid?</h1>
        <button onClick={() => dispatch({ type: 'TOGGLE_MY_KIDS' })}>
            {buttonText}
        </button>
        {kids.length === 0 && <p>Legg til barn</p>}
        {state.showMyKids && <MyKids />}
        <Calculator />
      </>
  )
}

function App() {
    return (
        <KidsProvider>
            <AppContent />
        </KidsProvider>
    );
}

export default App