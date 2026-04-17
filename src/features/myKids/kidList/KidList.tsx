import {KidListItem} from "@features/myKids/kidListItem/KidListItem.tsx";
import type {UserRecord} from "@/types/types.ts";


type KidListProps = {
    kids: UserRecord[];
    editingId: number | null;
    onSave: (id: number, data: Omit<UserRecord, 'id'>) => void;
    onEdit: (kid: UserRecord) => void;
    onCancelEdit: () => void;
    onRemove: (id: number) => void;
};

export function KidList({ kids, editingId, onSave, onEdit, onCancelEdit, onRemove }: KidListProps) {
    return (
        <ul>
            {kids.map(kid => (
                <KidListItem
                    key={kid.id}
                    kid={kid}
                    isEditing={editingId === kid.id}
                    onSave={data => onSave(kid.id, data)}
                    onEdit={() => onEdit(kid)}
                    onCancelEdit={onCancelEdit}
                    onRemove={() => onRemove(kid.id)}
                />
            ))}
        </ul>
    );
}
