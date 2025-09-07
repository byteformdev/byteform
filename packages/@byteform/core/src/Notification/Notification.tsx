import { forwardRef, useMemo } from "react";
import { NotificationProps } from "./types";
import { useTheme } from "../_theme";
import { Loader } from "../Loader";
import { IconButton } from "../IconButton";
import { IconX } from "@tabler/icons-react";

const getIconPosition = (
    iconPosition: NotificationProps["iconPosition"]
): string => {
    switch (iconPosition) {
        case "top":
            return "self-start";
        case "bottom":
            return "self-end";
        default:
            return "self-center";
    }
};

const getCloseButtonPosition = (
    closeButtonPosition: NotificationProps["closeButtonPosition"]
): string => {
    switch (closeButtonPosition) {
        case "top":
            return "self-start";
        case "bottom":
            return "self-end";
        default:
            return "self-center";
    }
};

const getVariant = (
    variant: NotificationProps["variant"]
): { container: string; closeButton: string } => {
    const variants = {
        default: {
            container: "",
            closeButton: ""
        },
        success: {
            container: "bg-[var(--byteform-green-6)]",
            closeButton: "hover:bg-[var(--byteform-green-5)]"
        },
        error: {
            container: "bg-[var(--byteform-red-6)]",
            closeButton: "hover:bg-[var(--byteform-red-5)]"
        },
        warning: {
            container: "bg-[var(--byteform-yellow-6)]",
            closeButton: "hover:bg-[var(--byteform-yellow-5)]"
        },
        info: {
            container: "bg-[var(--byteform-blue-6)]",
            closeButton: "hover:bg-[var(--byteform-blue-5)]"
        }
    };

    return variants[variant as keyof typeof variants] || variants.default;
};

const getSize = (size: NotificationProps["size"]): string => {
    const sizes = {
        xs: "text-xs px-2 py-1 gap-2",
        sm: "text-sm px-3 py-1.5 gap-2.5",
        md: "text-base px-4 py-2 gap-3",
        lg: "text-lg px-5 py-2.5 gap-3.5",
        xl: "text-xl px-6 py-3 gap-4"
    };

    return sizes[size as keyof typeof sizes] || sizes.md;
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
    (
        {
            children,
            icon,
            variant = "default",
            size = "md",
            iconPosition = "center",
            loading,
            loaderProps = {
                size: 24,
                stroke: 2
            },
            onClose,
            title,
            actions,
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

        const iconPositionClass = useMemo(
            () => getIconPosition(iconPosition),
            [iconPosition]
        );

        const closeButtonPositionClass = useMemo(
            () => getCloseButtonPosition(closeButtonPosition),
            [closeButtonPosition]
        );

        const variantClass = useMemo(() => getVariant(variant), [variant]);
        const sizeClass = useMemo(() => getSize(size), [size]);

        return (
            <div
                ref={ref}
                role="alert"
                className={cx(
                    "flex rounded-md shadow-md",
                    sizeClass,
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] text-[var(--byteform-light-text)]"
                        : "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-text)]",
                    variantClass.container,
                    className
                )}
                {...props}
            >
                {(icon || loading) && (
                    <div
                        className={cx(
                            "flex-shrink-0",
                            iconPositionClass,
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

                    {actions && (
                        <div className={cx("text-sm", classNames?.actions)}>
                            {actions}
                        </div>
                    )}
                </div>

                {!hideCloseButton && (
                    <div
                        className={cx(
                            "flex-shrink-0",
                            closeButtonPositionClass
                        )}
                    >
                        {closeButton || (
                            <IconButton
                                onClick={handleClose}
                                className={cx(
                                    "h-fit",
                                    variantClass.closeButton,
                                    classNames?.closeButton
                                )}
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
