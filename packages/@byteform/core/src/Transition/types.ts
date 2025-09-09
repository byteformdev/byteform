import { ReactNode } from "react";
import { Variants, Transition as FramerTransition } from "framer-motion";

export type TransitionName =
    | "fade"
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "scale"
    | "scale-y"
    | "scale-x"
    | "skew-up"
    | "skew-down"
    | "rotate-left"
    | "rotate-right"
    | "slide-down"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "pop"
    | "pop-bottom-left"
    | "pop-bottom-right"
    | "pop-top-left"
    | "pop-top-right"
    | "bounce"
    | "spring";

export interface TransitionProps {
    /** The content to animate */
    children: ReactNode;

    /** Whether the component should be visible */
    mounted: boolean;

    /** Predefined transition name or custom framer-motion variants */
    transition?: TransitionName | Variants;

    /** Animation duration in milliseconds */
    duration?: number;

    /** Framer motion transition configuration */
    transitionConfig?: FramerTransition;

    /** Delay before enter animation starts (ms) */
    enterDelay?: number;

    /** Delay before exit animation starts (ms) */
    exitDelay?: number;

    /** Keep component mounted in DOM when not visible */
    keepMounted?: boolean;

    /** CSS class name */
    className?: string;

    /** Callback fired when enter animation completes */
    onEntered?: () => void;

    /** Callback fired when exit animation completes */
    onExited?: () => void;
}
