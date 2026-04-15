export function UserName({name, color}: { name: string; color?: string }) {
    return <span style={color ? { color, fontWeight: 600 } : undefined}>{name}</span>;
}
