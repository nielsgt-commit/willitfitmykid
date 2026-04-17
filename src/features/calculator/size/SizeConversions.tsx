import type {Region} from "@/types/types.ts";


interface SizeConversionsProps {
    conversions: Partial<Record<Region, string>>;
}

export function SizeConversions({ conversions }: SizeConversionsProps) {
    return (
        <ul>
            {(Object.entries(conversions) as [Region, string][]).map(([region, value]) => (
                <li key={region}>{region}: {value}</li>
            ))}
        </ul>
    );
}