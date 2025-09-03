import { TextProps } from "../Text/types";

export type AnchorUnderline = "always" | "hover" | "never";

export interface AnchorProps
    extends Omit<TextProps, "component" | "underline"> {
    href: string;
    target?: string;
    underline?: AnchorUnderline;
}
