import { HTMLAttributes } from "react";
import { ButtonAnimation, ButtonSize, ButtonVariant } from "../types";

export type ButtonGroupDirection = "horizontal" | "vertical";
export type ButtonGroupAlign =
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    size?: ButtonSize;
    variant?: ButtonVariant;
    compact?: boolean;
    disabled?: boolean;

    fullWidth?: boolean;
    direction?: ButtonGroupDirection;
    align?: ButtonGroupAlign;
    animation?: ButtonAnimation;
    wrap?: boolean;
    grow?: boolean;
    className?: string;
}
