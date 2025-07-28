export type PaginationSize = "xs" | "sm" | "md" | "lg" | "xl";
export type PaginationAlign = "left" | "center" | "right";

export interface PaginationClassNames {
    root?: string;
    edgeControl?: string;
    control?: string;
    pageControl?: string;
    dots?: string;
    label?: string;
    active?: string;
}

export interface PaginationProps {
    total: number;
    page?: number;
    onChange?: (page: number) => void;
    siblings?: number;
    boundaries?: number;
    disabled?: boolean;
    size?: PaginationSize;
    withControls?: boolean;
    withEdges?: boolean;
    withPages?: boolean;
    label?: string;
    className?: string;
    classNames?: PaginationClassNames;
}
