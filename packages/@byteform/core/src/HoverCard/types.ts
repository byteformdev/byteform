import { ReactElement, ReactNode, RefObject } from "react";
import {
    UseFloatingReturn,
    FloatingContext,
    ReferenceType,
    Middleware
} from "@floating-ui/react";

export type HoverCardPosition =
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";

export interface HoverCardOffset {
    mainAxis?: number;
    crossAxis?: number;
}

export interface HoverCardProps {
    children: ReactNode;
    defaultOpened?: boolean;
    opened?: boolean;
    onChange?: (opened: boolean) => void;
    position?: HoverCardPosition;
    offset?: number | HoverCardOffset;
    withArrow?: boolean;
    arrowSize?: number;
    arrowRadius?: number;
    disabled?: boolean;
    openDelay?: number;
    closeDelay?: number;
    zIndex?: number;
    classNames?: HoverCardClassNames;
    middlewares?: Middleware[];
}

export interface HoverCardClassNames {
    root?: string;
    dropdown?: string;
    arrow?: string;
}

export interface HoverCardContextType extends HoverCardProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    refs: UseFloatingReturn<ReferenceType>["refs"];
    context: FloatingContext<ReferenceType>;
    floatingStyles: UseFloatingReturn<ReferenceType>["floatingStyles"];
    getReferenceProps: (props?: any) => any;
    getFloatingProps: (props?: any) => any;
    targetId: string;
    dropdownId: string;
    middlewareData: UseFloatingReturn<ReferenceType>["middlewareData"];
    arrowRef: RefObject<SVGSVGElement | null>;
}

export interface HoverCardTargetProps {
    children: ReactElement | ReactNode;
    refProp?: string;
}

export interface HoverCardDropdownProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export interface HoverCardGroupProps {
    children: ReactNode;
    openDelay?: number;
    closeDelay?: number;
}
