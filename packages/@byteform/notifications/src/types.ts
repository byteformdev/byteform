import { ReactNode } from "react";
import {
    NotificationProps,
    TransitionName,
    TransitionStyles
} from "@byteform/core";

export type NotificationPosition =
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";

export interface NotificationData
    extends Omit<NotificationProps, "onClose" | "children"> {
    id: string;
    duration?: number;
    transition?: TransitionName | TransitionStyles;
    autoClose?: boolean;
    persistent?: boolean;
    content?: ReactNode;
    position?: NotificationPosition;
}

export interface NotificationProviderSettings {
    position?: NotificationPosition;
    duration?: number;
    transition?: TransitionName | TransitionStyles;
    autoClose?: boolean;
    maxNotifications?: number;
    zIndex?: number;
    containerClassName?: string;
    target?: HTMLElement | string | null;
    withinTarget?: boolean;
}

export interface NotificationContextValue {
    notifications: NotificationData[];
    show: (notification: Omit<NotificationData, "id">) => string;
    update: (
        id: string,
        notification: Partial<Omit<NotificationData, "id">>
    ) => void;
    hide: (id: string) => void;
    hideAll: () => void;
    settings: NotificationProviderSettings;
}

export interface NotificationProviderProps {
    children: ReactNode;
    settings?: NotificationProviderSettings;
}
