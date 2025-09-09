import { useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
    onExited,
    onEntered,
    className
}: TransitionProps) => {
    const variants = useMemo(() => {
        if (typeof transition === "string") {
            return TRANSITIONS[transition];
        }
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
            delay: mounted ? enterDelay / 1000 : exitDelay / 1000
        };
    }, [duration, transitionConfig, mounted, enterDelay, exitDelay]);

    const shouldRender = mounted || keepMounted;

    return (
        <AnimatePresence
            mode="wait"
            onExitComplete={() => {
                onExited?.();
            }}
        >
            {shouldRender && (
                <motion.div
                    key={mounted ? "mounted" : "unmounted"}
                    initial="initial"
                    animate={mounted ? "animate" : "exit"}
                    exit="exit"
                    variants={variants}
                    transition={motionTransition}
                    onAnimationComplete={(definition) => {
                        if (definition === "animate" && mounted) {
                            onEntered?.();
                        }
                    }}
                    className={className}
                    style={{
                        visibility:
                            !mounted && keepMounted ? "hidden" : "visible"
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Transition.displayName = "@byteform/core/Transition";
