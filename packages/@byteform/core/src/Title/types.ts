import { CSSProperties, HTMLAttributes } from "react";
import { TextSize, TextWeight, TextAlign } from "../Text/types";

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
    order?: TitleOrder;
    size?: TextSize;
    weight?: TextWeight;
    align?: TextAlign;
    inline?: boolean;
    inherit?: boolean;
    italic?: boolean;
    underline?: boolean;
    dimmed?: boolean;
    style?: CSSProperties;
    className?: string;
    children: React.ReactNode;
}
