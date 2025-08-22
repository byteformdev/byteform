import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { TransitionProps } from "./types";
import { TRANSITIONS } from "./transitions";

export const Transition = ({
    children,
    mounted,
    transition,
    duration = 250,
    timingFunction = "ease",
    enterDelay = 0,
    exitDelay = 0,
    keepMounted = false,
    onExited,
    onEntered,
    className
}: TransitionProps) => {
    const [visible, setVisible] = useState(mounted);

    const transitionStyles = useMemo(() => {
        if (typeof transition === "string") {
            return TRANSITIONS[transition] || TRANSITIONS.fade;
        }
        return transition;
    }, [transition]);

    const easingValue = useMemo(() => {
        const easingMap: Record<string, string> = {
            ease: "easeInOut",
            "ease-in": "easeIn",
            "ease-out": "easeOut",
            "ease-in-out": "easeInOut",
            linear: "linear",
            easeIn: "easeIn",
            easeOut: "easeOut",
            easeInOut: "easeInOut",
            anticipate: "anticipate",
            backInOut: "backInOut",
            circIn: "circIn",
            circOut: "circOut",
            circInOut: "circInOut"
        };
        return easingMap[timingFunction] || "easeInOut";
    }, [timingFunction]);

    useEffect(() => {
        if (mounted) {
            setVisible(true);
        } else if (!keepMounted) {
            setVisible(false);
        }
    }, [mounted, keepMounted]);

    const variants = useMemo(
        () => ({
            initial: {
                ...transitionStyles.out,
                ...(transitionStyles.common || {})
            },
            animate: {
                ...transitionStyles.in,
                ...(transitionStyles.common || {})
            },
            exit: {
                ...transitionStyles.out,
                ...(transitionStyles.common || {})
            }
        }),
        [transitionStyles]
    );

    const currentStyles = useMemo(
        () =>
            (mounted
                ? variants.animate
                : variants.initial) as React.CSSProperties,
        [mounted, variants]
    );

    return (
        <AnimatePresence
            onExitComplete={() => {
                !keepMounted && setVisible(false);
                onExited?.();
            }}
        >
            {(mounted || (keepMounted && visible)) && (
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants as any}
                    transition={{
                        duration: duration / 1000,
                        ease: easingValue as any,
                        delay: mounted ? enterDelay / 1000 : exitDelay / 1000
                    }}
                    onAnimationComplete={() => {
                        if (mounted) {
                            onEntered?.();
                        }
                    }}
                    className={className}
                >
                    {typeof children === "function"
                        ? children(currentStyles)
                        : children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Transition.displayName = "@byteform/core/Transition";
