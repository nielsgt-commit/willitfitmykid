import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {KidsForm} from "@features/myKids/kidsForm/KidsForm.tsx";
import type {UserRecord} from "@/types/types.ts";
import {KidDetail} from "@features/myKids/kidDetail/KidDetail.tsx";
import {KidActions} from "@features/myKids/kidActions/KidActions.tsx";
import {useSwipeActions} from "@hooks/useSwipeActions.ts";
import {getKidColor} from "@constants/constants.ts";
import styles from "./KidListItem.module.css";

/** First letter of the first two name parts, uppercased — mirrors the kid card. */
function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    const first = parts[0][0] ?? "";
    const second = parts.length > 1 ? (parts[1][0] ?? "") : "";
    return (first + second).toUpperCase();
}

/** The coloured-initial avatar in its own card, shown before the detail card. */
function AvatarCard({ kid }: { kid: UserRecord }) {
    const color = getKidColor(kid.id);
    return (
        <span className={styles.avatarCard}>
            <span className={styles.avatar} style={{ borderColor: color, color }} aria-hidden="true">
                {getInitials(kid.name)}
            </span>
        </span>
    );
}

/** The growth percentile in its own card, circled, after the detail card. */
function PercentileCard({ kid }: { kid: UserRecord }) {
    const color = getKidColor(kid.id);
    return (
        <span className={styles.percentileCard}>
            <span className={styles.percentile} style={{ borderColor: color, color }}>
                P{kid.calculatedPercentile}
            </span>
        </span>
    );
}

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
        useSwipeActions<HTMLDivElement>({ actionsWidth, disabled: isEditing || actionsWidth === 0 });

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
        <li className={styles.row}>
            <AvatarCard kid={kid} />
            <div className={styles.item} ref={trackRef}>
                <div
                    className={`${styles.content}${isDragging ? '' : ' ' + styles.animating}`}
                    style={contentStyle}
                    onPointerDown={onPointerDown}
                    onDoubleClick={handleEdit}
                >
                    <KidDetail kid={kid} />
                </div>
                <div className={styles.actions} ref={actionsRef}>
                    <KidActions onEdit={handleEdit} onRemove={handleRemove} />
                </div>
            </div>
            <PercentileCard kid={kid} />
        </li>
    );
}