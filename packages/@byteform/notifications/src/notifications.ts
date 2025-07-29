import { NotificationData } from "./types";

let globalNotificationContext: {
    show: (notification: Omit<NotificationData, "id">) => string;
    update: (
        id: string,
        notification: Partial<Omit<NotificationData, "id">>
    ) => void;
    hide: (id: string) => void;
    hideAll: () => void;
} | null = null;

export const setGlobalNotificationContext = (
    context: typeof globalNotificationContext
) => {
    globalNotificationContext = context;
};

export const notifications = {
    show: (notification: Omit<NotificationData, "id">) => {
        if (!globalNotificationContext) {
            console.warn(
                "NotificationProvider is not mounted. Please wrap your app with NotificationProvider."
            );
            return "";
        }
        return globalNotificationContext.show(notification);
    },

    update: (
        id: string,
        notification: Partial<Omit<NotificationData, "id">>
    ) => {
        if (!globalNotificationContext) {
            console.warn(
                "NotificationProvider is not mounted. Please wrap your app with NotificationProvider."
            );
            return;
        }
        globalNotificationContext.update(id, notification);
    },

    hide: (id: string) => {
        if (!globalNotificationContext) {
            console.warn(
                "NotificationProvider is not mounted. Please wrap your app with NotificationProvider."
            );
            return;
        }
        globalNotificationContext.hide(id);
    },

    hideAll: () => {
        if (!globalNotificationContext) {
            console.warn(
                "NotificationProvider is not mounted. Please wrap your app with NotificationProvider."
            );
            return;
        }
        globalNotificationContext.hideAll();
    }
};
