import Calculator from "../features/calculator/Calculator.tsx";
import { AppLayout } from "../components/layouts/AppLayout.tsx";
import { ToggleMyKids } from "./ToggleMyKids.tsx";

export function AppContent() {
    return (
        <AppLayout title={<h6>Will it fit my kid?</h6>}>
            <Calculator />
            <ToggleMyKids />
        </AppLayout>
    );
}