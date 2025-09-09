import {
    FlipOptions,
    InlineOptions,
    Placement,
    ShiftOptions
} from "@floating-ui/react";
import { HTMLAttributes, ReactNode } from "react";
import { FloatingAxesOffsets, FloatingPosition } from "../_utils/Floating";

export type TooltipTrigger = "hover" | "click" | "click-hover";

export interface TooltipClassNames {
    root?: string;
    tooltip?: string;
    arrow?: string;
    content?: string;
}

export interface TooltipMiddlewares {
    shift?: boolean | ShiftOptions;
    flip?: boolean | FlipOptions;
    inline?: boolean | InlineOptions;
}

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    label: ReactNode;
    children: ReactNode;
    position?: Placement;
    onPositionChange?: (position: Placement) => void;
    offset?: number | FloatingAxesOffsets;
    disabled?: boolean;
    opened?: boolean;
    withArrow?: boolean;
    arrowSize?: number;
    arrowRadius?: number;
    multiline?: boolean;
    inline?: boolean;
    compact?: boolean;
    trigger?: TooltipTrigger;
    openDelay?: number;
    closeDelay?: number;
    zIndex?: number;
    classNames?: TooltipClassNames;
    middlewares?: TooltipMiddlewares;
}

export interface UseTooltipProps {
    position?: FloatingPosition;
    onPositionChange?: (position: Placement) => void;
    offset?: number | FloatingAxesOffsets;
    disabled?: boolean;
    opened?: boolean;
    withArrow?: boolean;
    trigger?: TooltipTrigger;
    inline?: boolean;
    openDelay?: number;
    closeDelay?: number;
    middlewares?: TooltipMiddlewares;
}
