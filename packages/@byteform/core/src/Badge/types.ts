import { ReactNode } from "react";

export type BadgeVariant = "filled" | "outline";
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BadgeClassNames {
    wrapper?: string;
    section?: string;
    label?: string;
}

export interface BadgeProps
    extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    fullWidth?: boolean;
    className?: string;
    classNames?: BadgeClassNames;
}
