import { Placement } from "@floating-ui/react";
import { HTMLAttributes, ReactNode } from "react";

export type TooltipTrigger = "hover" | "click" | "click-hover";

export interface TooltipOffset {
    mainAxis?: number;
    crossAxis?: number;
}

export interface TooltipClassNames {
    root?: string;
    tooltip?: string;
    arrow?: string;
    content?: string;
}

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    label: ReactNode;
    children: ReactNode;
    position?: Placement;
    offset?: number | TooltipOffset;
    disabled?: boolean;
    opened?: boolean;
    withArrow?: boolean;
    arrowSize?: number;
    arrowRadius?: number;
    multiline?: boolean;
    inline?: boolean;
    trigger?: TooltipTrigger;
    openDelay?: number;
    closeDelay?: number;
    zIndex?: number;
    classNames?: TooltipClassNames;
}
