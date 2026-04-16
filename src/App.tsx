import { KidsProvider } from "./hooks/context/KidsContext.tsx";
import { AppContent } from "./app/AppContent.tsx";

function App() {
    return (
        <KidsProvider>
            <AppContent />
        </KidsProvider>
    );
}

export default App