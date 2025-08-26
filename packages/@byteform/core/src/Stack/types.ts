import { ElementType, ReactNode } from "react";

export type StackAlign = "start" | "end" | "center" | "stretch";
export type StackJustify =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
export type StackGap = "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    align?: StackAlign;
    justify?: StackJustify;
    gap?: StackGap;
    grow?: boolean;
    component?: ElementType;
    className?: string;
    breakpoints?: {
        xs?: Partial<Pick<StackProps, "align" | "justify" | "gap">>;
        sm?: Partial<Pick<StackProps, "align" | "justify" | "gap">>;
        md?: Partial<Pick<StackProps, "align" | "justify" | "gap">>;
        lg?: Partial<Pick<StackProps, "align" | "justify" | "gap">>;
        xl?: Partial<Pick<StackProps, "align" | "justify" | "gap">>;
    };
}
