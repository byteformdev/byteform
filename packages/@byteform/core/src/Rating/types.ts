import { HTMLAttributes } from "react";

export type RatingSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface RatingProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    count?: number;
    value?: number;
    defaultValue?: number;
    highlightSelectedOnly?: boolean;
    readOnly?: boolean;
    fractions?: number;
    emptySymbol?: React.ReactNode;
    fullSymbol?: React.ReactNode;
    onChange?: (value: number) => void;
    size?: RatingSize;
    className?: string;
    classNames?: RatingClassNames;
}

export interface RatingClassNames {
    root?: string;
    item?: string;
    symbol?: string;
}
