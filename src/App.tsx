import { useReducer } from "react";
import Calculator from "./Components/Calculator/Calculator.tsx";
import { MyKids } from "./Components/MyKids/MyKids.tsx";
import { KidsProvider, useKids } from "./context/KidsContext.tsx";
import styles from "./App.module.css";

type AppState = { showMyKids: boolean; openAddForm: boolean };
type AppAction = { type: 'TOGGLE_MY_KIDS' } | { type: 'OPEN_ADD_FORM' } | { type: 'CLOSE_MY_KIDS' };

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'TOGGLE_MY_KIDS':
            return { ...state, showMyKids: !state.showMyKids, openAddForm: false };
        case 'OPEN_ADD_FORM':
            return { showMyKids: true, openAddForm: true };
        case 'CLOSE_MY_KIDS':
            return { showMyKids: false, openAddForm: false };
        default:
            return state;
    }
}

function AppContent() {
  const [state, dispatch] = useReducer(appReducer, { showMyKids: false, openAddForm: false });
  const { kids } = useKids();

  return (
      <div className={styles.app}>
        <h1>Will it fit my kid?</h1>
        {kids.length === 0 && !state.showMyKids && (
            <button onClick={() => dispatch({ type: 'OPEN_ADD_FORM' })}>Legg til barn</button>
        )}
        {kids.length > 0 && (
            <button onClick={() => dispatch({ type: 'TOGGLE_MY_KIDS' })}>
                {state.showMyKids ? 'Skjul mine barn' : 'Vis mine barn'}
            </button>
        )}
        {state.showMyKids && (
            <MyKids
                initialAdding={state.openAddForm}
                onCancelFirstAdd={() => dispatch({ type: 'CLOSE_MY_KIDS' })}
            />
        )}
        <Calculator />
      </div>
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