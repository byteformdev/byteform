import { ElementType, ReactNode } from "react";

export type PaginationSize = "xs" | "sm" | "md" | "lg" | "xl";
export type PaginationVariant = "filled" | "outline" | "ghost";

export interface PaginationClassNames {
    root?: string;
    control?: string;
    edge?: string;
    prevNext?: string;
    dots?: string;
    label?: string;
}

export interface PaginationContextValue {
    total: number;
    page: number;
    onChange: (page: number) => void;
    siblings: number;
    boundaries: number;
    disabled: boolean;
    size: PaginationSize;
    variant: PaginationVariant;
    classNames?: PaginationClassNames;
    getPageNumbers: () => (number | string)[];
}

export interface PaginationRootProps {
    children: ReactNode;
    total: number;
    page?: number;
    defaultPage?: number;
    onChange?: (page: number) => void;
    siblings?: number;
    boundaries?: number;
    disabled?: boolean;
    size?: PaginationSize;
    variant?: PaginationVariant;
    className?: string;
    classNames?: PaginationClassNames;
}

export interface PaginationControlProps {
    page: number | string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    component?: ElementType;
    children?: ReactNode;
    onClick?: () => void;
}

export interface PaginationEdgeProps {
    type: "first" | "last";
    disabled?: boolean;
    className?: string;
    component?: ElementType;
    children?: ReactNode;
    onClick?: () => void;
}

export interface PaginationPrevNextProps {
    type: "previous" | "next";
    disabled?: boolean;
    className?: string;
    component?: ElementType;
    children?: ReactNode;
    onClick?: () => void;
}

export interface PaginationDotsProps {
    className?: string;
}

export interface PaginationLabelProps {
    children?: ReactNode;
    className?: string;
}

export interface PaginationProps extends Omit<PaginationRootProps, "children"> {
    withControls?: boolean;
    withEdges?: boolean;
    withPages?: boolean;
    label?: string;
}
