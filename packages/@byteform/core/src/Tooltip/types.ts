import { Placement } from "@floating-ui/react";
import { HTMLAttributes, ReactNode } from "react";

export type TooltipEvents = {
    hover?: boolean;
    focus?: boolean;
    touch?: boolean;
};

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
    events?: TooltipEvents;
    openDelay?: number;
    closeDelay?: number;
    zIndex?: number;
    classNames?: TooltipClassNames;
}
