import { useState, useCallback, useEffect, useMemo } from "react";
import { NotificationContext } from "./context";
import {
    NotificationProviderProps,
    NotificationData,
    NotificationProviderSettings,
    NotificationPosition
} from "./types";
import { NotificationContainer } from "./NotificationContainer";
import { Portal } from "@byteform/core";
import { setGlobalNotificationContext } from "./notifications";

const defaultSettings: NotificationProviderSettings = {
    position: "top-right",
    duration: 4000,
    autoClose: true,
    limit: 5,
    zIndex: 9999
};

export const NotificationProvider = ({
    children,
    settings = {}
}: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [queue, setQueue] = useState<NotificationData[]>([]);
    const [mounted, setMounted] = useState(false);

    const finalSettings = useMemo(
        () => ({ ...defaultSettings, ...settings }),
        [settings]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    const generateId = useCallback(() => {
        return `notification-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
    }, []);

    useEffect(() => {
        if (
            queue.length > 0 &&
            notifications.length < (finalSettings.limit || 5)
        ) {
            const notificationsToShow = Math.min(
                queue.length,
                (finalSettings.limit || 5) - notifications.length
            );

            const toShow = queue.slice(0, notificationsToShow);
            const remaining = queue.slice(notificationsToShow);

            setQueue(remaining);
            setNotifications((prev) => [...prev, ...toShow]);

            toShow.forEach((notification) => {
                if (notification.autoClose && !notification.persistent) {
                    setTimeout(() => {
                        hide(notification.id);
                    }, notification.duration);
                }
            });
        }
    }, [notifications.length, queue.length, finalSettings.limit]);

    const show = useCallback(
        (notification: Omit<NotificationData, "id">) => {
            const id = generateId();
            const newNotification: NotificationData = {
                ...notification,
                id,
                duration: notification.duration ?? finalSettings.duration,
                transition: notification.transition ?? finalSettings.transition,
                autoClose: notification.autoClose ?? finalSettings.autoClose,
                position: notification.position ?? finalSettings.position
            };

            if (notifications.length < (finalSettings.limit || 5)) {
                setNotifications((prev) => [newNotification, ...prev]);

                if (newNotification.autoClose && !newNotification.persistent) {
                    setTimeout(() => {
                        hide(id);
                    }, newNotification.duration);
                }
            } else {
                setQueue((prev) => [...prev, newNotification]);
            }

            return id;
        },
        [finalSettings, generateId, notifications.length]
    );

    const update = useCallback(
        (
            id: string,
            updatedNotification: Partial<Omit<NotificationData, "id">>
        ) => {
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === id
                        ? { ...notification, ...updatedNotification }
                        : notification
                )
            );

            setQueue((prev) =>
                prev.map((notification) =>
                    notification.id === id
                        ? { ...notification, ...updatedNotification }
                        : notification
                )
            );
        },
        []
    );

    const hide = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );

        setQueue((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    }, []);

    const hideAll = useCallback(() => {
        setNotifications([]);
        setQueue([]);
    }, []);

    const clearQueue = useCallback(() => {
        setQueue([]);
    }, []);

    const contextValue = useMemo(
        () => ({
            notifications,
            queue,
            show,
            update,
            hide,
            hideAll,
            clearQueue,
            settings: finalSettings
        }),
        [
            notifications,
            queue,
            show,
            update,
            hide,
            hideAll,
            clearQueue,
            finalSettings
        ]
    );

    useEffect(() => {
        setGlobalNotificationContext({
            show,
            update,
            hide,
            hideAll,
            clearQueue
        });

        return () => {
            setGlobalNotificationContext(null);
        };
    }, [show, update, hide, hideAll, clearQueue]);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            {mounted && (
                <Portal target={settings.target ?? document.body}>
                    {Object.entries(
                        notifications.reduce((acc, notification) => {
                            const position =
                                notification.position ??
                                finalSettings.position!;
                            if (!acc[position]) {
                                acc[position] = [];
                            }
                            acc[position].push(notification);
                            return acc;
                        }, {} as Record<NotificationPosition, NotificationData[]>)
                    ).map(([position, positionNotifications]) => (
                        <NotificationContainer
                            key={position}
                            notifications={positionNotifications}
                            position={position as NotificationPosition}
                            onRemove={hide}
                            zIndex={finalSettings.zIndex}
                            className={finalSettings.containerClassName}
                            withinTarget={finalSettings.withinTarget}
                        />
                    ))}
                </Portal>
            )}
        </NotificationContext.Provider>
    );
};

NotificationProvider.displayName =
    "@byteform/notifications/NotificationProvider";
