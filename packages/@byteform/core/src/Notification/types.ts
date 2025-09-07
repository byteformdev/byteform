import { ReactElement, ReactNode } from "react";
import { LoaderProps } from "../Loader";

export type NotificationPosition = "top" | "center" | "bottom";
export type NotificationVariant =
    | "default"
    | "success"
    | "error"
    | "warning"
    | "info";
export type NotificationSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface NotificationClassNames {
    wrapper?: string;
    icon?: string;
    title?: string;
    content?: string;
    actions?: string;
    closeButton?: string;
}

export interface NotificationProps {
    children: ReactNode;
    icon?: ReactNode;
    variant?: NotificationVariant;
    size?: NotificationSize;
    iconPosition?: NotificationPosition;
    loading?: boolean;
    loaderProps?: LoaderProps;
    onClose?: () => void;
    title?: ReactNode;
    actions?: ReactNode | ReactElement;
    hideCloseButton?: boolean;
    closeButton?: ReactNode | ReactElement;
    closeButtonPosition?: NotificationPosition;
    className?: string;
    classNames?: NotificationClassNames;
}
