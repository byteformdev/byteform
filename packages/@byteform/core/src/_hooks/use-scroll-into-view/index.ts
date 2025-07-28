import { useRef, useCallback, useState } from "react";
import {
    UseScrollIntoViewOptions,
    UseScrollIntoViewReturnValue,
    UseScrollIntoViewAnimation
} from "./types";

const defaultEasing = (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export function useScrollIntoView<
    Target extends HTMLElement = any,
    Parent extends HTMLElement | null = null
>(
    options: UseScrollIntoViewOptions = {}
): UseScrollIntoViewReturnValue<Target, Parent> {
    const {
        onScrollFinish,
        duration = 1250,
        axis = "y",
        easing = defaultEasing,
        offset = 0,
        cancelable = true,
        isList = false
    } = options;

    const targetRef = useRef<Target | null>(null);
    const scrollableRef = useRef<Parent | null>(null);
    const [animationId, setAnimationId] = useState<number | null>(null);

    const getScrollableElement = useCallback(() => {
        return scrollableRef.current || document.documentElement;
    }, []);

    const cancel = useCallback(() => {
        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            setAnimationId(null);
        }
    }, [animationId]);

    const scrollIntoView = useCallback(
        (params: UseScrollIntoViewAnimation = {}) => {
            const { alignment = "start" } = params;

            if (!targetRef.current) return;

            const target = targetRef.current;
            const scrollableElement = getScrollableElement();

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) {
                target.scrollIntoView({
                    behavior: "auto",
                    block:
                        alignment === "center"
                            ? "center"
                            : alignment === "end"
                            ? "end"
                            : "start",
                    inline:
                        alignment === "center"
                            ? "center"
                            : alignment === "end"
                            ? "end"
                            : "start"
                });
                return;
            }

            cancel();

            const targetRect = target.getBoundingClientRect();
            const scrollableRect = scrollableElement.getBoundingClientRect();

            let startPosition: number;
            let endPosition: number;

            if (axis === "x") {
                startPosition = scrollableElement.scrollLeft;

                switch (alignment) {
                    case "center":
                        endPosition =
                            startPosition +
                            targetRect.left -
                            scrollableRect.left -
                            scrollableRect.width / 2 +
                            targetRect.width / 2 +
                            offset;
                        break;
                    case "end":
                        endPosition =
                            startPosition +
                            targetRect.right -
                            scrollableRect.right +
                            offset;
                        break;
                    default:
                        endPosition =
                            startPosition +
                            targetRect.left -
                            scrollableRect.left -
                            offset;
                }
            } else {
                startPosition = scrollableElement.scrollTop;

                switch (alignment) {
                    case "center":
                        endPosition =
                            startPosition +
                            targetRect.top -
                            scrollableRect.top -
                            scrollableRect.height / 2 +
                            targetRect.height / 2 +
                            offset;
                        break;
                    case "end":
                        endPosition =
                            startPosition +
                            targetRect.bottom -
                            scrollableRect.bottom +
                            offset;
                        break;
                    default:
                        endPosition =
                            startPosition +
                            targetRect.top -
                            scrollableRect.top -
                            offset;
                }
            }

            const distance = endPosition - startPosition;
            const startTime = performance.now();

            let userScrolled = false;

            const handleUserScroll = () => {
                if (cancelable) {
                    userScrolled = true;
                    cancel();
                }
            };

            if (cancelable) {
                scrollableElement.addEventListener("wheel", handleUserScroll, {
                    passive: true
                });
                scrollableElement.addEventListener(
                    "touchmove",
                    handleUserScroll,
                    { passive: true }
                );
            }

            const animate = (currentTime: number) => {
                if (userScrolled) return;

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easing(progress);
                const currentPosition =
                    startPosition + distance * easedProgress;

                if (axis === "x") {
                    scrollableElement.scrollLeft = currentPosition;
                } else {
                    scrollableElement.scrollTop = currentPosition;
                }

                if (progress < 1) {
                    const newAnimationId = requestAnimationFrame(animate);
                    setAnimationId(newAnimationId);
                } else {
                    setAnimationId(null);
                    if (cancelable) {
                        scrollableElement.removeEventListener(
                            "wheel",
                            handleUserScroll
                        );
                        scrollableElement.removeEventListener(
                            "touchmove",
                            handleUserScroll
                        );
                    }
                    onScrollFinish?.();
                }
            };

            const newAnimationId = requestAnimationFrame(animate);
            setAnimationId(newAnimationId);
        },
        [
            axis,
            cancel,
            duration,
            easing,
            getScrollableElement,
            offset,
            onScrollFinish,
            cancelable
        ]
    );

    return {
        scrollableRef,
        targetRef,
        scrollIntoView,
        cancel
    };
}
