import { RefObject } from "react";

export interface UseScrollIntoViewAnimation {
    alignment?: "start" | "end" | "center";
}

export interface UseScrollIntoViewOptions {
    onScrollFinish?: () => void;
    duration?: number;
    axis?: "x" | "y";
    easing?: (t: number) => number;
    offset?: number;
    cancelable?: boolean;
    isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
    Target extends HTMLElement = any,
    Parent extends HTMLElement | null = null
> {
    scrollableRef: RefObject<Parent | null>;
    targetRef: RefObject<Target | null>;
    scrollIntoView: (params?: UseScrollIntoViewAnimation) => void;
    cancel: () => void;
}
