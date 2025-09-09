import { Placement } from "@floating-ui/react";

export type FloatingPosition = Placement;
export type FloatingStrategy = "absolute" | "fixed";

export interface FloatingAxesOffsets {
    mainAxis?: number;
    crossAxis?: number;
    alignmentAxis?: number | null;
}
