import { ButtonHTMLAttributes, ElementType } from "react";
import { LoaderProps } from "../Loader";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "filled" | "outline" | "danger" | "ghost";
export type ButtonLoaderPosition = "left" | "right";
export type ButtonAlign = "left" | "center" | "right";
export type ButtonType = "button" | "submit" | "reset";

export interface ButtonClassNames {
    wrapper?: string;
    leftSection?: string;
    rightSection?: string;
    disabled?: string;
}

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "color"> {
    children: React.ReactNode;
    type?: ButtonType;
    component?: ElementType;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    active?: boolean;
    loading?: boolean;
    loaderPosition?: ButtonLoaderPosition;
    loaderProps?: LoaderProps;
    fullWidth?: boolean;
    href?: string;
    target?: string;
    align?: ButtonAlign;
    useAnimation?: boolean;
    compact?: boolean;
    className?: string;
    classNames?: ButtonClassNames;
}
