import type { Dispatch, KeyboardEvent } from "react";
import { useKids } from "@hooks/context/KidsContext.tsx";
import { ToggleMyKids } from "@app/ToggleMyKids.tsx";
import { AvatarStack } from "@features/myKids/avatarStack/AvatarStack.tsx";
import { MyKids } from "@features/myKids/MyKids.tsx";
import { TOGGLE_MY_KIDS, OPEN_ADD_FORM, type Action } from "@app/app.action.ts";
import type { AppState } from "@app/app.reducer.ts";
import styles from "./MyKidsCard.module.css";

type MyKidsCardProps = {
    state: AppState;
    dispatch: Dispatch<Action>;
    initialAdding?: boolean;
    onCancelFirstAdd?: () => void;
};

export function MyKidsCard({ state, dispatch, initialAdding, onCancelFirstAdd }: MyKidsCardProps) {
    const { kids } = useKids();
    const hasKids = kids.length > 0;

    const handleHeaderClick = () => {
        dispatch({ type: hasKids ? TOGGLE_MY_KIDS : OPEN_ADD_FORM });
    };

    const handleHeaderKey = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleHeaderClick();
        }
    };

    return (
        <div className={styles.card}>
            <div
                className={styles.header}
                role="button"
                tabIndex={0}
                aria-expanded={state.showMyKids}
                onClick={handleHeaderClick}
                onKeyDown={handleHeaderKey}
            >
                <div className={styles.upper}>
                    <ToggleMyKids state={state} dispatch={dispatch} />
                </div>
                <hr className={styles.divider} />
                {!state.showMyKids && (
                    <div className={styles.lower}>
                        <AvatarStack kids={kids} />
                    </div>
                )}
            </div>
            {state.showMyKids && (
                <div className={styles.expanded}>
                    <MyKids initialAdding={initialAdding} onCancelFirstAdd={onCancelFirstAdd} />
                </div>
            )}
        </div>
    );
}
