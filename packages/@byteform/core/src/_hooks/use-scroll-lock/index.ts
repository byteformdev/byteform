import { useCallback, useEffect, useRef, useState } from "react";
import { UseScrollLockOptions, UseScrollLockReturnValue } from "./types";

export function useScrollLock(
    initialState: boolean = false,
    options: UseScrollLockOptions = {}
): UseScrollLockReturnValue {
    const { restoreScrollPosition = true, root } = options;
    const [isLocked, setIsLocked] = useState(initialState);
    const scrollPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const originalStylesRef = useRef<{
        overflow?: string;
        paddingRight?: string;
        position?: string;
        top?: string;
        left?: string;
        width?: string;
        height?: string;
    }>({});

    const getScrollbarWidth = useCallback(() => {
        const outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.overflow = "scroll";
        // @ts-ignore
        outer.style.msOverflowStyle = "scrollbar";
        document.body.appendChild(outer);

        const inner = document.createElement("div");
        outer.appendChild(inner);

        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode?.removeChild(outer);

        return scrollbarWidth;
    }, []);

    const lockScroll = useCallback(() => {
        if (typeof window === "undefined") return;

        const targetElement = root || document.body;
        const scrollbarWidth = getScrollbarWidth();

        scrollPositionRef.current = {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };

        const computedStyle = window.getComputedStyle(targetElement);
        originalStylesRef.current = {
            overflow: targetElement.style.overflow,
            paddingRight: targetElement.style.paddingRight,
            position: targetElement.style.position,
            top: targetElement.style.top,
            left: targetElement.style.left,
            width: targetElement.style.width,
            height: targetElement.style.height
        };

        targetElement.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            const currentPaddingRight =
                parseInt(computedStyle.paddingRight, 10) || 0;
            targetElement.style.paddingRight = `${
                currentPaddingRight + scrollbarWidth
            }px`;
        }

        if (targetElement === document.body) {
            targetElement.style.position = "fixed";
            targetElement.style.top = `-${scrollPositionRef.current.y}px`;
            targetElement.style.left = `-${scrollPositionRef.current.x}px`;
            targetElement.style.width = "100%";
            targetElement.style.height = "100%";
        }

        setIsLocked(true);
    }, [root, getScrollbarWidth]);

    const unlockScroll = useCallback(() => {
        if (typeof window === "undefined") return;

        const targetElement = root || document.body;
        const { x, y } = scrollPositionRef.current;

        Object.entries(originalStylesRef.current).forEach(([key, value]) => {
            if (value !== undefined) {
                (targetElement.style as any)[key] = value;
            } else {
                (targetElement.style as any)[key] = "";
            }
        });

        if (restoreScrollPosition && (x !== 0 || y !== 0)) {
            window.scrollTo(x, y);
        }

        setIsLocked(false);
    }, [root, restoreScrollPosition]);

    const toggle = useCallback(() => {
        if (isLocked) {
            unlockScroll();
        } else {
            lockScroll();
        }
    }, [isLocked, lockScroll, unlockScroll]);

    useEffect(() => {
        if (initialState) {
            lockScroll();
        }

        return () => {
            if (isLocked) {
                unlockScroll();
            }
        };
    }, []);

    useEffect(() => {
        if (isLocked) {
            lockScroll();
        } else {
            unlockScroll();
        }
    }, [isLocked, lockScroll, unlockScroll]);

    return {
        isLocked,
        lock: lockScroll,
        unlock: unlockScroll,
        toggle
    };
}
