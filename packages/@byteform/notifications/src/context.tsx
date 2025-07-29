import { createContext, useContext } from "react";
import { NotificationContextValue } from "./types";

export const NotificationContext =
    createContext<NotificationContextValue | null>(null);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }
    return context;
};
