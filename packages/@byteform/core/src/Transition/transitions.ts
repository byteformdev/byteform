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
    },

    flip: {
        initial: { opacity: 0, rotateX: 90 },
        animate: { opacity: 1, rotateX: 0 },
        exit: { opacity: 0, rotateX: 90 }
    },

    "flip-x": {
        initial: { opacity: 0, rotateY: 90 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: 90 }
    },

    "flip-y": {
        initial: { opacity: 0, rotateX: 90 },
        animate: { opacity: 1, rotateX: 0 },
        exit: { opacity: 0, rotateX: 90 }
    },

    "zoom-in": {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 }
    },

    "zoom-out": {
        initial: { opacity: 0, scale: 1.5 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.5 }
    },

    blur: {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
        exit: { opacity: 0, filter: "blur(10px)" }
    },

    elastic: {
        initial: { opacity: 0, scale: 0.3 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                bounce: 0.6,
                stiffness: 400,
                damping: 10
            }
        },
        exit: { opacity: 0, scale: 0.3 }
    },

    "rubber-band": {
        initial: { opacity: 0, scale: 1 },
        animate: {
            opacity: 1,
            scale: [1, 1.25, 0.75, 1.15, 0.95, 1],
            transition: {
                duration: 0.8,
                times: [0, 0.4, 0.6, 0.7, 0.8, 1]
            }
        },
        exit: { opacity: 0, scale: 0.8 }
    }
};
