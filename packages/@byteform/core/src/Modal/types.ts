import { ReactNode } from "react";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";
export type AnimationState = "entering" | "entered" | "exiting" | "exited";

export interface ModalClassNames {
    root?: string;
    overlay?: string;
    content?: string;
    titleWrapper?: string;
    title?: string;
    closeButton?: string;
    body?: string;
}

export interface ModalProps {
    children: React.ReactNode;
    opened: boolean;
    onClose: () => void;
    canClose?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    centered?: boolean;
    fullScreen?: boolean;
    lockScroll?: boolean;
    size?: ModalSize;
    title?: ReactNode | string;
    withCloseButton?: boolean;
    withOverlay?: boolean;
    overlayOpacity?: number;
    zIndex?: number;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    className?: string;
    classNames?: ModalClassNames;
}

export interface ModalContextValue extends Partial<ModalProps> {
    animationState?: AnimationState;
}
