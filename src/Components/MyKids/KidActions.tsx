type KidActionsProps = {
    onEdit: () => void;
    onRemove: () => void;
};

export function KidActions({ onEdit, onRemove }: KidActionsProps) {
    return (
        <>
            <button onClick={onEdit}>Rediger</button>
            <button onClick={onRemove}>Slett</button>
        </>
    );
}
