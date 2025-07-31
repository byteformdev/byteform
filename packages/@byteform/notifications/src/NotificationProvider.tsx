import { useState, useCallback, useEffect, useMemo, useRef } from "react";
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
    const [hidingIds, setHidingIds] = useState<Set<string>>(new Set());
    const [mounted, setMounted] = useState(false);
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(
        null
    );

    const finalSettings = useMemo(
        () => ({ ...defaultSettings, ...settings }),
        [settings]
    );

    useEffect(() => {
        const resolveTarget = () => {
            if (!settings.target) {
                setTargetElement(document.body);
                return;
            }

            if (typeof settings.target === "string") {
                const element = document.querySelector(
                    settings.target
                ) as HTMLElement;
                setTargetElement(element || document.body);
            } else if (settings.target instanceof HTMLElement) {
                setTargetElement(settings.target);
            } else {
                setTargetElement(document.body);
            }
        };

        resolveTarget();

        const timeoutId = setTimeout(resolveTarget, 100);

        return () => clearTimeout(timeoutId);
    }, [settings.target]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const generateId = useCallback(() => {
        return `notification-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
    }, []);

    useEffect(() => {
        const visibleNotifications = notifications.filter(
            (n) => !hidingIds.has(n.id)
        );
        if (
            queue.length > 0 &&
            visibleNotifications.length < (finalSettings.limit || 5)
        ) {
            const notificationsToShow = Math.min(
                queue.length,
                (finalSettings.limit || 5) - visibleNotifications.length
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
    }, [notifications.length, queue.length, finalSettings.limit, hidingIds]);

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

            const visibleNotifications = notifications.filter(
                (n) => !hidingIds.has(n.id)
            );
            if (visibleNotifications.length < (finalSettings.limit || 5)) {
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
        [finalSettings, generateId, notifications, hidingIds]
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
        setHidingIds((prev) => new Set([...Array.from(prev), id]));

        setQueue((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
        setHidingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }, []);

    const hideAll = useCallback(() => {
        const allIds = notifications.map((n) => n.id);
        setHidingIds(new Set(allIds));
        setQueue([]);
    }, [notifications]);

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
            {mounted && targetElement && (
                <Portal target={targetElement}>
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
                            onRemove={removeNotification}
                            onHide={hide}
                            hidingIds={hidingIds}
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
