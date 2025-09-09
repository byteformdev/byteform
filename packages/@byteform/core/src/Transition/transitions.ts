import { Variants } from "framer-motion";
import { TransitionName } from "./types";

export const TRANSITIONS: Record<TransitionName, Variants> = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    },

    "fade-up": {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
    },

    "fade-down": {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    },

    "fade-left": {
        initial: { opacity: 0, x: 10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 10 }
    },

    "fade-right": {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -10 }
    },

    scale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    },

    "scale-y": {
        initial: { opacity: 0, scaleY: 0, originY: 0 },
        animate: { opacity: 1, scaleY: 1, originY: 0 },
        exit: { opacity: 0, scaleY: 0, originY: 0 }
    },

    "scale-x": {
        initial: { opacity: 0, scaleX: 0, originX: 0 },
        animate: { opacity: 1, scaleX: 1, originX: 0 },
        exit: { opacity: 0, scaleX: 0, originX: 0 }
    },

    "skew-up": {
        initial: { opacity: 0, y: -20, skewX: -10, skewY: -5 },
        animate: { opacity: 1, y: 0, skewX: 0, skewY: 0 },
        exit: { opacity: 0, y: -20, skewX: -10, skewY: -5 }
    },

    "skew-down": {
        initial: { opacity: 0, y: 20, skewX: -10, skewY: -5 },
        animate: { opacity: 1, y: 0, skewX: 0, skewY: 0 },
        exit: { opacity: 0, y: 20, skewX: -10, skewY: -5 }
    },

    "rotate-left": {
        initial: { opacity: 0, y: 20, rotate: -5 },
        animate: { opacity: 1, y: 0, rotate: 0 },
        exit: { opacity: 0, y: 20, rotate: -5 }
    },

    "rotate-right": {
        initial: { opacity: 0, y: 20, rotate: 5 },
        animate: { opacity: 1, y: 0, rotate: 0 },
        exit: { opacity: 0, y: 20, rotate: 5 }
    },

    "slide-down": {
        initial: { opacity: 0, y: "-100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "-100%" }
    },

    "slide-up": {
        initial: { opacity: 0, y: "100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "100%" }
    },

    "slide-left": {
        initial: { opacity: 0, x: "100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "100%" }
    },

    "slide-right": {
        initial: { opacity: 0, x: "-100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "-100%" }
    },

    pop: {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0 }
    },

    "pop-bottom-left": {
        initial: { opacity: 0, scale: 0, originX: 0, originY: 1 },
        animate: { opacity: 1, scale: 1, originX: 0, originY: 1 },
        exit: { opacity: 0, scale: 0, originX: 0, originY: 1 }
    },

    "pop-bottom-right": {
        initial: { opacity: 0, scale: 0, originX: 1, originY: 1 },
        animate: { opacity: 1, scale: 1, originX: 1, originY: 1 },
        exit: { opacity: 0, scale: 0, originX: 1, originY: 1 }
    },

    "pop-top-left": {
        initial: { opacity: 0, scale: 0, originX: 0, originY: 0 },
        animate: { opacity: 1, scale: 1, originX: 0, originY: 0 },
        exit: { opacity: 0, scale: 0, originX: 0, originY: 0 }
    },

    "pop-top-right": {
        initial: { opacity: 0, scale: 0, originX: 1, originY: 0 },
        animate: { opacity: 1, scale: 1, originX: 1, originY: 0 },
        exit: { opacity: 0, scale: 0, originX: 1, originY: 0 }
    },

    bounce: {
        initial: { opacity: 0, scale: 0.3, y: 50 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", bounce: 0.4 }
        },
        exit: { opacity: 0, scale: 0.3, y: 50 }
    },

    spring: {
        initial: { opacity: 0, scale: 0.8, y: 20 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        },
        exit: { opacity: 0, scale: 0.8, y: 20 }
    }
};
