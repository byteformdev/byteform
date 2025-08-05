import { forwardRef, useEffect, useState } from "react";
import { AnimationState, ModalProps } from "./types";
import { ModalContext } from "./context";
import { ModalRoot } from "./ModalRoot";
import { ModalOverlay } from "./ModalOverlay";
import { ModalTitle } from "./ModalTitle";
import { ModalContent } from "./ModalContent";
import { ModalBody } from "./ModalBody";
import { OptionalPortal } from "../Portal";

const Modal = forwardRef<HTMLDivElement, ModalProps>(
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
            centered = true,
            overlayOpacity = 0.6,
            fullScreen = false,
            withOverlay = true,
            transitionDuration = 200,
            transitionTimingFunction = "ease",
            className,
            classNames,
            target,
            withinPortal = true
        },
        ref
    ) => {
        const [mounted, setMounted] = useState(false);
        const [animationState, setAnimationState] = useState<AnimationState>(
            opened ? "entered" : "exited"
        );
        const [visible, setVisible] = useState(opened);

        useEffect(() => {
            setMounted(true);

            if (!canClose || !closeOnEscape) return;

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, [canClose, onClose, closeOnEscape]);

        useEffect(() => {
            if (opened) {
                setVisible(true);
                setAnimationState("entering");
                const timer = setTimeout(() => {
                    setAnimationState("entered");
                }, 10);
                return () => clearTimeout(timer);
            } else if (mounted) {
                setAnimationState("exiting");
                const timer = setTimeout(() => {
                    setAnimationState("exited");
                    setVisible(false);
                }, transitionDuration);
                return () => clearTimeout(timer);
            }
        }, [opened, mounted, transitionDuration]);

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

        if (!mounted || !visible) return null;

        const modalContent = (
            <ModalContext.Provider
                value={{
                    zIndex,
                    classNames,
                    centered,
                    overlayOpacity,
                    canClose,
                    closeOnClickOutside,
                    onClose,
                    withCloseButton,
                    size,
                    fullScreen,
                    withOverlay,
                    className,
                    animationState,
                    transitionDuration,
                    transitionTimingFunction
                }}
            >
                <ModalRoot>
                    <ModalOverlay />
                    <ModalContent ref={ref}>
                        {(title || withCloseButton) && (
                            <ModalTitle>{title}</ModalTitle>
                        )}
                        <ModalBody>{children}</ModalBody>
                    </ModalContent>
                </ModalRoot>
            </ModalContext.Provider>
        );

        return (
            <OptionalPortal withinPortal={withinPortal} target={target}>
                {modalContent}
            </OptionalPortal>
        );
    }
);

const ModalExtended = Object.assign(Modal, {
    Overlay: ModalOverlay,
    Root: ModalRoot,
    Content: ModalContent,
    Title: ModalTitle,
    Body: ModalBody
});

ModalExtended.displayName = "@byteform/core/Modal";

export { ModalExtended as Modal };
