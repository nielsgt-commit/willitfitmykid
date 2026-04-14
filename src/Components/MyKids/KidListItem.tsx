import type { UserRecord } from '../../types.ts';
import { KidDetail } from './KidDetail.tsx';
import { KidActions } from './KidActions.tsx';
import { KidsForm } from './KidsForm/KidsForm.tsx';

type KidListItemProps = {
    kid: UserRecord;
    isEditing: boolean;
    onSave: (data: Omit<UserRecord, 'id'>) => void;
    onEdit: () => void;
    onCancelEdit: () => void;
    onRemove: () => void;
};

export function KidListItem({ kid, isEditing, onSave, onEdit, onCancelEdit, onRemove }: KidListItemProps) {
    if (isEditing) {
        return (
            <li>
                <KidsForm
                    key={kid.id}
                    mode="edit"
                    kid={kid}
                    onSubmit={onSave}
                    onCancel={onCancelEdit}
                />
            </li>
        );
    }

    return (
        <li>
            <KidDetail kid={kid} />
            <KidActions onEdit={onEdit} onRemove={onRemove} />
        </li>
    );
}
