import { HTMLAttributes } from "react";
import { AvatarSize } from "../types";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    size?: AvatarSize;
    spacing?: number;
    limit?: number;
    total?: number;
    renderSurplus?: (surplus: number) => React.ReactNode;
    className?: string;
}
