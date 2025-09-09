import { ReactNode, HTMLAttributes } from "react";

export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressLabelPosition = "left" | "center" | "right";
export type ProgressOrientation = "horizontal" | "vertical";

export interface ProgressClassNames {
    root?: string;
    track?: string;
    section?: string;
    label?: string;
}

export interface ProgressRootProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
    children?: ReactNode;
    size?: ProgressSize;
    orientation?: ProgressOrientation;
    className?: string;
    classNames?: ProgressClassNames;
    transitionDuration?: number;
}

export interface ProgressSectionProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
    value: number;
    className?: string;
    striped?: boolean;
    animated?: boolean;
    children?: ReactNode;
    color?: string;
    transitionDuration?: number;
}

export interface ProgressLabelProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
    children: ReactNode;
    position?: ProgressLabelPosition;
    className?: string;
}

export interface ProgressProps extends Omit<ProgressRootProps, "children"> {
    value?: number;
    label?: ReactNode;
    labelPosition?: ProgressLabelPosition;
    striped?: boolean;
    animated?: boolean;
    color?: string;
}

export interface ProgressContextValue {
    size: ProgressSize;
    orientation: ProgressOrientation;
    classNames?: ProgressClassNames;
    transitionDuration: number;
}
