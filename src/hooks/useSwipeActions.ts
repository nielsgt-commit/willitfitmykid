import { useCallback, useEffect, useRef, useState } from 'react';

type UseSwipeActionsOptions = {
    actionsWidth: number;
    openThresholdRatio?: number;
    disabled?: boolean;
};

type UseSwipeActionsResult<T extends HTMLElement> = {
    trackRef: React.RefObject<T | null>;
    translateX: number;
    isOpen: boolean;
    isDragging: boolean;
    close: () => void;
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
};

const HORIZONTAL_INTENT_PX = 8;
const VERTICAL_CANCEL_PX = 12;

export function useSwipeActions<T extends HTMLElement = HTMLDivElement>({
    actionsWidth,
    openThresholdRatio = 0.4,
    disabled = false,
}: UseSwipeActionsOptions): UseSwipeActionsResult<T> {
    const trackRef = useRef<T | null>(null);
    const startX = useRef(0);
    const startY = useRef(0);
    const baseOffset = useRef(0);
    const intentLocked = useRef<'horizontal' | 'vertical' | null>(null);
    const activePointerId = useRef<number | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    // Mirrors intentLocked === 'horizontal' so render never reads a ref.
    const [horizontalDrag, setHorizontalDrag] = useState(false);

    const close = useCallback(() => {
        setIsOpen(false);
        setDragOffset(0);
    }, []);

    const onPointerDown = useCallback(
        (event: React.PointerEvent<HTMLElement>) => {
            if (disabled) return;
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            activePointerId.current = event.pointerId;
            startX.current = event.clientX;
            startY.current = event.clientY;
            baseOffset.current = isOpen ? -actionsWidth : 0;
            intentLocked.current = null;
            setHorizontalDrag(false);
            setIsDragging(true);
        },
        [actionsWidth, disabled, isOpen]
    );

    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (event: PointerEvent) => {
            if (event.pointerId !== activePointerId.current) return;
            const dx = event.clientX - startX.current;
            const dy = event.clientY - startY.current;

            if (intentLocked.current === null) {
                if (Math.abs(dy) > VERTICAL_CANCEL_PX && Math.abs(dy) > Math.abs(dx)) {
                    intentLocked.current = 'vertical';
                    setIsDragging(false);
                    setDragOffset(0);
                    return;
                }
                if (Math.abs(dx) > HORIZONTAL_INTENT_PX) {
                    intentLocked.current = 'horizontal';
                    setHorizontalDrag(true);
                }
            }

            if (intentLocked.current !== 'horizontal') return;

            event.preventDefault();
            const next = baseOffset.current + dx;
            const clamped = Math.min(0, Math.max(-actionsWidth, next));
            setDragOffset(clamped);
        };

        const handleUp = (event: PointerEvent) => {
            if (event.pointerId !== activePointerId.current) return;
            activePointerId.current = null;

            if (intentLocked.current === 'horizontal') {
                const dx = event.clientX - startX.current;
                const finalOffset = Math.min(0, Math.max(-actionsWidth, baseOffset.current + dx));
                setIsOpen(-finalOffset >= actionsWidth * openThresholdRatio);
                setDragOffset(0);
            }
            setHorizontalDrag(false);
            setIsDragging(false);
        };

        window.addEventListener('pointermove', handleMove, { passive: false });
        window.addEventListener('pointerup', handleUp);
        window.addEventListener('pointercancel', handleUp);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerup', handleUp);
            window.removeEventListener('pointercancel', handleUp);
        };
    }, [actionsWidth, isDragging, openThresholdRatio]);

    useEffect(() => {
        if (!isOpen) return;
        const onDocPointerDown = (event: PointerEvent) => {
            if (!trackRef.current) return;
            if (trackRef.current.contains(event.target as Node)) return;
            close();
        };
        window.addEventListener('pointerdown', onDocPointerDown);
        return () => window.removeEventListener('pointerdown', onDocPointerDown);
    }, [close, isOpen]);

    const translateX = isDragging && horizontalDrag
        ? dragOffset
        : isOpen
            ? -actionsWidth
            : 0;

    return { trackRef, translateX, isOpen, isDragging, close, onPointerDown };
}
