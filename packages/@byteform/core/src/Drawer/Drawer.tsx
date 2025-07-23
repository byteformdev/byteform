import { forwardRef, useEffect, useState } from "react";
import { DrawerProps } from "./types";
import { DrawerContext } from "./context";
import { DrawerRoot } from "./DrawerRoot";
import { DrawerContent } from "./DrawerContent";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerBody } from "./DrawerBody";
import { DrawerOverlay } from "./DrawerOverlay";
import { OptionalPortal } from "../Portal";

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
    (
        {
            children,
            opened,
            onClose,
            canClose = true,
            closeOnEscape = true,
            lockScroll = true,
            title,
            withCloseButton = true,
            closeOnClickOutside = true,
            size = "md",
            zIndex,
            position = "left",
            offset = 0,
            overlayOpacity = 0.6,
            withOverlay = true,
            transitionDuration = 250,
            target,
            withinPortal = true,
            className,
            classNames
        },
        ref
    ) => {
        const [mounted, setMounted] = useState(false);
        const [visible, setVisible] = useState(false);

        useEffect(() => {
            setMounted(true);
            if (canClose && closeOnEscape) {
                const handleEscape = (e: KeyboardEvent) => {
                    if (e.key === "Escape") onClose();
                };
                document.addEventListener("keydown", handleEscape);
                return () =>
                    document.removeEventListener("keydown", handleEscape);
            }
        }, [canClose, onClose, closeOnEscape]);

        useEffect(() => {
            if (opened) {
                setMounted(true);
                const timer = setTimeout(() => setVisible(true), 10);
                return () => clearTimeout(timer);
            } else {
                setVisible(false);
                const timer = setTimeout(() => {
                    if (!opened) setMounted(false);
                }, transitionDuration);
                return () => clearTimeout(timer);
            }
        }, [opened, transitionDuration]);

        useEffect(() => {
            if (!lockScroll) return;

            if (opened) {
                const originalStyle = window.getComputedStyle(
                    document.body
                ).overflow;
                document.body.style.overflow = "hidden";

                return () => {
                    document.body.style.overflow = originalStyle;
                };
            }
        }, [opened, lockScroll]);

        if (!mounted) return null;

        const contextValue = {
            zIndex,
            classNames,
            overlayOpacity,
            canClose,
            closeOnClickOutside,
            onClose,
            withCloseButton,
            size,
            withOverlay,
            position,
            offset,
            className,
            opened: visible,
            transitionDuration,
            target,
            withinPortal
        };

        const drawerContent = (
            <DrawerContext.Provider value={contextValue}>
                <DrawerRoot>
                    <DrawerOverlay />
                    <DrawerContent ref={ref}>
                        {(title || withCloseButton) && (
                            <DrawerTitle>{title}</DrawerTitle>
                        )}
                        <DrawerBody>{children}</DrawerBody>
                    </DrawerContent>
                </DrawerRoot>
            </DrawerContext.Provider>
        );

        return (
            <OptionalPortal withinPortal={withinPortal} target={target}>
                {drawerContent}
            </OptionalPortal>
        );
    }
);

const DrawerExtended = Object.assign(Drawer, {
    Overlay: DrawerOverlay,
    Root: DrawerRoot,
    Content: DrawerContent,
    Title: DrawerTitle,
    Body: DrawerBody
});

DrawerExtended.displayName = "@byteform/core/Drawer";

export { DrawerExtended as Drawer };
