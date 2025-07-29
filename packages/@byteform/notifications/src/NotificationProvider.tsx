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
    maxNotifications: 5,
    zIndex: 9999
};

export const NotificationProvider = ({
    children,
    settings = {}
}: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
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

            setNotifications((prev) => {
                const updated = [newNotification, ...prev];
                if (
                    finalSettings.maxNotifications &&
                    updated.length > finalSettings.maxNotifications
                ) {
                    return updated.slice(0, finalSettings.maxNotifications);
                }
                return updated;
            });

            if (newNotification.autoClose && !newNotification.persistent) {
                setTimeout(() => {
                    hide(id);
                }, newNotification.duration);
            }

            return id;
        },
        [finalSettings, generateId]
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
        },
        []
    );

    const hide = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    }, []);

    const hideAll = useCallback(() => {
        setNotifications([]);
    }, []);

    const contextValue = useMemo(
        () => ({
            notifications,
            show,
            update,
            hide,
            hideAll,
            settings: finalSettings
        }),
        [notifications, show, update, hide, hideAll, finalSettings]
    );

    useEffect(() => {
        setGlobalNotificationContext({
            show,
            update,
            hide,
            hideAll
        });

        return () => {
            setGlobalNotificationContext(null);
        };
    }, [show, update, hide, hideAll]);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            {mounted && (
                <Portal target={settings.target ?? document.body}>
                    {/* Group notifications by position and render separate containers */}
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
