import { ElementType, ReactNode } from "react";

export type GroupDirection =
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse";
export type GroupWrap = "nowrap" | "wrap" | "wrap-reverse";
export type GroupJustify =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
export type GroupAlign = "start" | "end" | "center" | "baseline" | "stretch";
export type GroupGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    direction?: GroupDirection;
    wrap?: GroupWrap;
    justify?: GroupJustify;
    align?: GroupAlign;
    gap?: GroupGap;
    grow?: boolean;
    preventGrowOverflow?: boolean;
    component?: ElementType;
    className?: string;
    breakpoints?: {
        xs?: Partial<
            Pick<GroupProps, "direction" | "justify" | "align" | "gap" | "wrap">
        >;
        sm?: Partial<
            Pick<GroupProps, "direction" | "justify" | "align" | "gap" | "wrap">
        >;
        md?: Partial<
            Pick<GroupProps, "direction" | "justify" | "align" | "gap" | "wrap">
        >;
        lg?: Partial<
            Pick<GroupProps, "direction" | "justify" | "align" | "gap" | "wrap">
        >;
        xl?: Partial<
            Pick<GroupProps, "direction" | "justify" | "align" | "gap" | "wrap">
        >;
    };
}
