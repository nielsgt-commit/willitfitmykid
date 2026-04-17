import {KidsForm} from "@features/myKids/kidsForm/KidsForm.tsx";
import type {UserRecord} from "@/types/types.ts";
import styles from "@features/MyKids.module.css";
import {KidDetail} from "@features/myKids/kidDetail/KidDetail.tsx";
import {KidActions} from "@features/myKids/kidActions/KidActions.tsx";


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
            <div className={styles.kidRow}>
                <div className={styles.kidDetail}>
                    <KidDetail kid={kid} />
                </div>
                <div className={styles.kidActions}>
                    <KidActions onEdit={onEdit} onRemove={onRemove} />
                </div>
            </div>
        </li>
    );
}
