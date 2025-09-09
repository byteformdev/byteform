import { forwardRef, useRef, useEffect } from "react";
import { TabsTabProps } from "./types";
import { useTabsContext } from "./context";
import { useTheme } from "../_theme";

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
    (
        {
            children,
            value,
            disabled = false,
            leftSection,
            rightSection,
            className,
            onClick,
            ...props
        },
        ref
    ) => {
        const {
            value: activeValue,
            onChange,
            orientation,
            grow,
            classNames,
            registerTab,
            unregisterTab
        } = useTabsContext();
        const { theme, cx } = useTheme();
        const internalRef = useRef<HTMLButtonElement>(null);

        const isActive = activeValue === value;

        useEffect(() => {
            const tabRef = ref || internalRef;
            registerTab(value, tabRef as React.RefObject<HTMLButtonElement>);

            return () => {
                unregisterTab(value);
            };
        }, [value, registerTab, unregisterTab, ref]);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) {
                event.preventDefault();
                return;
            }

            onClick?.(event);
            onChange(value);
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLButtonElement>
        ) => {
            if (disabled) return;

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onChange(value);
            }
        };

        const renderSection = (
            content: React.ReactNode,
            position: "left" | "right"
        ) => {
            if (!content) return null;

            return (
                <div
                    className={cx(
                        "flex items-center justify-center",
                        theme === "light"
                            ? "text-[var(--byteform-light-section)]"
                            : "text-[var(--byteform-dark-section)]",
                        disabled && "opacity-60",
                        classNames?.tabSection
                    )}
                >
                    {content}
                </div>
            );
        };

        return (
            <button
                ref={ref || internalRef}
                role="tab"
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                disabled={disabled}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cx(
                    "relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 outline-none focus:outline-none",
                    grow && orientation === "horizontal" && "flex-1",
                    orientation === "vertical" && "justify-start w-full",
                    theme === "light"
                        ? "text-[var(--byteform-light-text)]"
                        : "text-[var(--byteform-dark-text)]",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.tab,
                    className
                )}
                {...props}
            >
                <div
                    className={cx(
                        "flex items-center gap-2 w-full",
                        orientation === "horizontal"
                            ? "justify-center"
                            : "justify-start",
                        classNames?.tabInner
                    )}
                >
                    {renderSection(leftSection, "left")}
                    <div
                        className={cx(
                            "flex items-center",
                            classNames?.tabLabel
                        )}
                    >
                        {children}
                    </div>
                    {renderSection(rightSection, "right")}
                </div>
            </button>
        );
    }
);

TabsTab.displayName = "@byteform/core/Tabs.Tab";
