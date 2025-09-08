import { ElementType, ReactNode } from "react";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type GridFlow = "row" | "col" | "dense" | "row-dense" | "col-dense";
export type GridJustify =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly";
export type GridAlign =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly";
export type GridJustifyItems = "start" | "end" | "center" | "stretch";
export type GridAlignItems =
    | "start"
    | "end"
    | "center"
    | "baseline"
    | "stretch";
export type GridItemJustify = "auto" | "start" | "end" | "center" | "stretch";
export type GridItemAlign =
    | "auto"
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "baseline";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    cols?: GridColumns;
    gap?: GridGap;
    gapY?: GridGap;
    gapX?: GridGap;
    flow?: GridFlow;
    autoFit?: boolean;
    minColWidth?: string;
    justify?: GridJustify;
    align?: GridAlign;
    justifyItems?: GridJustifyItems;
    alignItems?: GridAlignItems;
    component?: ElementType;
    className?: string;
    breakpoints?: {
        xs?: GridColumns;
        sm?: GridColumns;
        md?: GridColumns;
        lg?: GridColumns;
        xl?: GridColumns;
    };
}

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    span?: GridColumns;
    start?: GridColumns;
    end?: GridColumns;
    grow?: boolean;
    justify?: GridItemJustify;
    align?: GridItemAlign;
    component?: ElementType;
    className?: string;
    breakpoints?: {
        xs?: GridColumns;
        sm?: GridColumns;
        md?: GridColumns;
        lg?: GridColumns;
        xl?: GridColumns;
    };
}
