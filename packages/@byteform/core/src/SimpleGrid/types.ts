import { ElementType, ReactNode } from "react";

export type SimpleGridColumns =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;
export type SimpleGridGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    cols?: SimpleGridColumns;
    gap?: SimpleGridGap;
    minChildWidth?: string;
    component?: ElementType;
    className?: string;
    breakpoints?: {
        sm?: SimpleGridColumns;
        md?: SimpleGridColumns;
        lg?: SimpleGridColumns;
        xl?: SimpleGridColumns;
    };
}
