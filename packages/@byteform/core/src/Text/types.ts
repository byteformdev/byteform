import { CSSProperties, HTMLAttributes } from "react";

export type TextSize = CSSProperties["fontSize"] | number;
export type TextWeight = CSSProperties["fontWeight"] | number;
export type TextAlign = CSSProperties["textAlign"];
export type TextTransform = CSSProperties["textTransform"];
export type TextSpacing = CSSProperties["letterSpacing"];
export type TextTruncate = "end" | "start" | boolean;
export type TextComponent =
    | "p"
    | "span"
    | "a"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

export interface TextProps
    extends HTMLAttributes<
        | HTMLParagraphElement
        | HTMLSpanElement
        | HTMLAnchorElement
        | HTMLHeadingElement
        | HTMLDivElement
    > {
    size?: TextSize;
    weight?: TextWeight;
    align?: TextAlign;
    lineClamp?: number;
    truncate?: TextTruncate;
    inline?: boolean;
    inherit?: boolean;
    italic?: boolean;
    underline?: boolean;
    dimmed?: boolean;
    component?: TextComponent;
    style?: CSSProperties;
    className?: string;
    href?: string;
    target?: string;
    children: React.ReactNode;
}
