import { HTMLAttributes } from "react";

export type PickerHeaderLevel = "month" | "year" | "decade";
export type PickerHeaderControlsOrder = Array<"previous" | "next" | "level">;

export interface PickerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    level?: PickerHeaderLevel;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
    onLevelClick?: () => void;
    nextDisabled?: boolean;
    previousDisabled?: boolean;
    levelClickable?: boolean;
    controlsOrder?: PickerHeaderControlsOrder;
    className?: string;
}
