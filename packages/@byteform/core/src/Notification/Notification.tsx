import { forwardRef } from "react";
import { NotificationProps } from "./types";
import { useTheme } from "../_theme";
import { Loader } from "../Loader";
import { IconButton } from "../IconButton";
import { IconX } from "@tabler/icons-react";

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
    (
        {
            children,
            icon,
            iconPosition = "center",
            loading,
            loaderProps = {
                size: 24,
                stroke: 2
            },
            onClose,
            title,
            hideCloseButton,
            closeButton,
            closeButtonPosition = "center",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const handleClose = () => {
            if (!onClose) return;
            onClose();
        };

        const getIconPosition = () => {
            switch (iconPosition) {
                case "top":
                    return "self-start";
                case "bottom":
                    return "self-end";
                default:
                    return "self-center";
            }
        };

        const getCloseButtonPosition = () => {
            switch (closeButtonPosition) {
                case "top":
                    return "self-start";
                case "bottom":
                    return "self-end";
                default:
                    return "self-center";
            }
        };

        return (
            <div
                ref={ref}
                role="alert"
                className={cx(
                    "flex gap-3 p-3 rounded-md shadow-md border",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] text-[var(--byteform-light-text)] border-[var(--byteform-light-border)]"
                        : "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-text)] border-[var(--byteform-dark-border)]",
                    className
                )}
                {...props}
            >
                {(icon || loading) && (
                    <div
                        className={cx(
                            "flex-shrink-0",
                            getIconPosition(),
                            classNames?.icon
                        )}
                    >
                        {loading ? <Loader {...loaderProps} /> : icon}
                    </div>
                )}

                <div
                    className={cx(
                        "flex-1 text-left",
                        !title && "flex items-center"
                    )}
                >
                    {title && (
                        <div
                            className={cx(
                                "text-sm font-medium mb-1",
                                classNames?.title
                            )}
                        >
                            {title}
                        </div>
                    )}

                    <div className={cx("text-sm", classNames?.content)}>
                        {children}
                    </div>
                </div>

                {!hideCloseButton && (
                    <div
                        className={cx(
                            "flex-shrink-0",
                            getCloseButtonPosition()
                        )}
                    >
                        {closeButton || (
                            <IconButton
                                onClick={handleClose}
                                className={cx("h-fit", classNames?.closeButton)}
                            >
                                <IconX size={16} />
                            </IconButton>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Notification.displayName = "@byteform/core/Notification";
