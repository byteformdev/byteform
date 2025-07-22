import { ReactNode } from "react";

export type SegmentedControlSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SegmentedControlOrientation = "horizontal" | "vertical";

export interface SegmentedControlItem {
    value: string;
    label?: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
}

export interface SegmentedControlClassNames {
    root?: string;
    container?: string;
    item?: string;
    itemActive?: string;
    itemDisabled?: string;
    itemLabel?: string;
    itemIcon?: string;
    indicator?: string;
}

export interface SegmentedControlProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    data: SegmentedControlItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    size?: SegmentedControlSize;
    orientation?: SegmentedControlOrientation;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
    classNames?: SegmentedControlClassNames;
}
