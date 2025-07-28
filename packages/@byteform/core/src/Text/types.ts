import { CSSProperties, HTMLAttributes } from "react";

export type TextSize = CSSProperties["fontSize"] | number;
export type TextWeight = CSSProperties["fontWeight"] | number;
export type TextAlign = CSSProperties["textAlign"];
export type TextTransform = CSSProperties["textTransform"];
export type TextSpacing = CSSProperties["letterSpacing"];
export type TextTruncate = "end" | "start" | boolean;

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: TextSize;
    weight?: TextWeight;
    align?: TextAlign;
    lineClamp?: number;
    truncate?: TextTruncate;
    inline?: boolean;
    inherit?: boolean;
    italic?: boolean;
    span?: boolean;
    underline?: boolean;
    dimmed?: boolean;
    style?: CSSProperties;
    className?: string;
    children: React.ReactNode;
}
