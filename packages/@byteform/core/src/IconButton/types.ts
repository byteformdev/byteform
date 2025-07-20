import { ButtonHTMLAttributes, ElementType } from "react";

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconButtonVariant = "filled" | "outline" | "danger" | "ghost";

export interface IconButtonClassNames {
    wrapper?: string;
    icon?: string;
    disabled?: string;
}

export interface IconButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "color"> {
    children: React.ReactNode;
    component?: ElementType;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    disabled?: boolean;
    active?: boolean;
    fullWidth?: boolean;
    useAnimation?: boolean;
    compact?: boolean;
    className?: string;
    classNames?: IconButtonClassNames;
}
