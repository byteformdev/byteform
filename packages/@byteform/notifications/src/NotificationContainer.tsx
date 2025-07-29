import { forwardRef, useState, useEffect } from "react";
import { NotificationData, NotificationPosition } from "./types";
import { Notification, Transition, useTheme } from "@byteform/core";

interface NotificationContainerProps {
    notifications: NotificationData[];
    position: NotificationPosition;
    onRemove: (id: string) => void;
    zIndex?: number;
    className?: string;
    withinTarget?: boolean;
}

export const NotificationContainer = forwardRef<
    HTMLDivElement,
    NotificationContainerProps
>(
    (
        {
            notifications,
            position,
            onRemove,
            zIndex = 9999,
            className,
            withinTarget = false
        },
        ref
    ) => {
        const { cx } = useTheme();
        const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
        const [allNotifications, setAllNotifications] = useState<
            NotificationData[]
        >([]);

        useEffect(() => {
            const currentIds = new Set(notifications.map((n) => n.id));
            const previousIds = new Set(allNotifications.map((n) => n.id));

            const removedIds = Array.from(previousIds).filter(
                (id) => !currentIds.has(id)
            );

            if (removedIds.length > 0) {
                setRemovingIds(
                    (prev) => new Set([...Array.from(prev), ...removedIds])
                );
            }

            setAllNotifications((prev) => {
                const existingMap = new Map(prev.map((n) => [n.id, n]));
                const result: NotificationData[] = [];

                notifications.forEach((notification) => {
                    result.push(notification);
                    existingMap.delete(notification.id);
                });

                existingMap.forEach((notification, id) => {
                    if (!removedIds.includes(id)) {
                        result.push(notification);
                    }
                });

                return result;
            });
        }, [notifications]);

        const getPositionStyles = (position: NotificationPosition) => {
            const positionType = withinTarget ? "absolute" : "fixed";
            const baseStyles = `${positionType} flex flex-col gap-2 p-4 pointer-events-none`;

            switch (position) {
                case "top-left":
                    return `${baseStyles} top-0 left-0`;
                case "top-right":
                    return `${baseStyles} top-0 right-0`;
                case "top-center":
                    return `${baseStyles} top-0 left-1/2 -translate-x-1/2`;
                case "bottom-left":
                    return `${baseStyles} bottom-0 left-0`;
                case "bottom-right":
                    return `${baseStyles} bottom-0 right-0`;
                case "bottom-center":
                    return `${baseStyles} bottom-0 left-1/2 -translate-x-1/2`;
                default:
                    return `${baseStyles} top-0 right-0`;
            }
        };

        const getDefaultTransition = (position: NotificationPosition) => {
            switch (position) {
                case "top-left":
                    return "slide-right";
                case "top-right":
                    return "slide-left";
                case "top-center":
                    return "slide-down";
                case "bottom-left":
                    return "slide-right";
                case "bottom-right":
                    return "slide-left";
                case "bottom-center":
                    return "slide-up";
                default:
                    return "slide-left";
            }
        };

        const handleNotificationClose = (id: string) => {
            setRemovingIds((prev) => new Set([...Array.from(prev), id]));
        };

        const handleTransitionExited = (id: string) => {
            setRemovingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
            setAllNotifications((prev) => prev.filter((n) => n.id !== id));
            onRemove(id);
        };

        return (
            <div
                ref={ref}
                className={cx(getPositionStyles(position), className)}
                style={{ zIndex }}
            >
                {allNotifications.map((notification) => {
                    const {
                        id,
                        duration,
                        transition,
                        autoClose,
                        persistent,
                        content,
                        position: notificationPosition,
                        ...notificationProps
                    } = notification;

                    const isRemoving = removingIds.has(id);
                    const isStillActive = notifications.some(
                        (n) => n.id === id
                    );

                    return (
                        <Transition
                            key={id}
                            mounted={!isRemoving}
                            transition={
                                transition || getDefaultTransition(position)
                            }
                            duration={300}
                            onExited={() => handleTransitionExited(id)}
                        >
                            <div className="pointer-events-auto">
                                <Notification
                                    {...notificationProps}
                                    onClose={() => handleNotificationClose(id)}
                                    children={content}
                                />
                            </div>
                        </Transition>
                    );
                })}
            </div>
        );
    }
);

NotificationContainer.displayName =
    "@byteform/notifications/NotificationContainer";
