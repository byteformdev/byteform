import { useMemo, useRef } from "react";
import {
    motion,
    AnimatePresence,
    Variants,
    useInView as useFramerInView
} from "framer-motion";
import { TransitionProps } from "./types";
import { TRANSITIONS } from "./transitions";

export const Transition = ({
    children,
    mounted,
    transition = "fade",
    duration = 250,
    transitionConfig,
    enterDelay = 0,
    exitDelay = 0,
    keepMounted = false,
    useInView,
    inViewOptions,
    onExited,
    onEntered,
    className
}: TransitionProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useFramerInView(ref, inViewOptions);
    const isVisible = useInView ? inView : mounted;

    const variants = useMemo<Variants>(() => {
        if (typeof transition === "string") return TRANSITIONS[transition];
        return transition as Variants;
    }, [transition]);

    const motionTransition = useMemo(() => {
        const baseTransition = {
            duration: duration / 1000,
            ease: "easeInOut" as const,
            ...transitionConfig
        };

        return {
            ...baseTransition,
            delay: isVisible ? enterDelay / 1000 : exitDelay / 1000
        };
    }, [duration, transitionConfig, isVisible, enterDelay, exitDelay]);

    const shouldRender = useInView ? true : isVisible || keepMounted;

    return (
        <AnimatePresence
            mode="wait"
            onExitComplete={() => {
                onExited?.();
            }}
        >
            {shouldRender && (
                <motion.div
                    ref={ref}
                    key="transition"
                    initial="initial"
                    animate={isVisible ? "animate" : "exit"}
                    exit="exit"
                    variants={variants}
                    transition={motionTransition}
                    onAnimationComplete={(definition) => {
                        if (definition === "animate" && isVisible) {
                            onEntered?.();
                        }
                        if (
                            definition === "exit" &&
                            !isVisible &&
                            !keepMounted
                        ) {
                            onExited?.();
                        }
                    }}
                    className={className}
                    style={{
                        visibility:
                            !isVisible && keepMounted ? "hidden" : "visible"
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Transition.displayName = "@byteform/core/Transition";
