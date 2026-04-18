import { KidsProvider } from "@hooks/context/KidsContext.tsx";
import { KidFilterProvider } from "@hooks/context/KidFilterContext.tsx";
import { AppContent } from "@app/AppContent.tsx";

function App() {
    return (
        <KidsProvider>
            <KidFilterProvider>
                <AppContent />
            </KidFilterProvider>
        </KidsProvider>
    );
}

export default App