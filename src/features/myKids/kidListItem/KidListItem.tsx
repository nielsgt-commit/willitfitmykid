import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {KidsForm} from "@features/myKids/kidsForm/KidsForm.tsx";
import type {UserRecord} from "@/types/types.ts";
import {KidDetail} from "@features/myKids/kidDetail/KidDetail.tsx";
import {KidActions} from "@features/myKids/kidActions/KidActions.tsx";
import {useSwipeActions} from "@hooks/useSwipeActions.ts";
import styles from "./KidListItem.module.css";


type KidListItemProps = {
    kid: UserRecord;
    isEditing: boolean;
    onSave: (data: Omit<UserRecord, 'id'>) => void;
    onEdit: () => void;
    onCancelEdit: () => void;
    onRemove: () => void;
};

export function KidListItem({ kid, isEditing, onSave, onEdit, onCancelEdit, onRemove }: KidListItemProps) {
    const actionsRef = useRef<HTMLDivElement | null>(null);
    const [actionsWidth, setActionsWidth] = useState(0);

    useLayoutEffect(() => {
        if (!actionsRef.current) return;
        const el = actionsRef.current;
        const update = () => setActionsWidth(el.getBoundingClientRect().width);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [isEditing]);

    const { trackRef, translateX, isOpen, isDragging, close, onPointerDown } =
        useSwipeActions<HTMLLIElement>({ actionsWidth, disabled: isEditing || actionsWidth === 0 });

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

    const contentStyle: CSSProperties = { '--actions-width': `${actionsWidth}px` } as CSSProperties;
    const atRest = !isDragging && !isOpen;
    if (!atRest) {
        (contentStyle as Record<string, string>)['--swipe-x'] = `${translateX}px`;
    }

    const handleEdit = () => {
        close();
        onEdit();
    };

    const handleRemove = () => {
        close();
        onRemove();
    };

    return (
        <li className={styles.item} ref={trackRef}>
            <div
                className={`${styles.content}${isDragging ? '' : ' ' + styles.animating}`}
                style={contentStyle}
                onPointerDown={onPointerDown}
            >
                <KidDetail kid={kid} />
            </div>
            <div className={styles.actions} ref={actionsRef}>
                <KidActions onEdit={handleEdit} onRemove={handleRemove} />
            </div>
        </li>
    );
}