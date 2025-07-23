import { ReactElement, ReactNode } from "react";
import { LoaderProps } from "../Loader";

export type NotificationIconPosition = "top" | "center" | "bottom";

export interface NotificationClassNames {
    wrapper?: string;
    icon?: string;
    title?: string;
    content?: string;
    closeButton?: string;
}

export interface NotificationProps {
    children: ReactNode;
    icon?: ReactNode;
    iconPosition?: NotificationIconPosition;
    loading?: boolean;
    loaderProps?: LoaderProps;
    onClose?: () => void;
    title?: ReactNode;
    hideCloseButton?: boolean;
    closeButton?: ReactNode | ReactElement;
    closeButtonPosition?: NotificationIconPosition;
    className?: string;
    classNames?: NotificationClassNames;
}
