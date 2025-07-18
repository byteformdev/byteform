import { ElementType, HTMLAttributes } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    src?: string;
    alt?: string;
    size?: AvatarSize;
    component?: ElementType;
    className?: string;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    spacing?: number;
    className?: string;
}
