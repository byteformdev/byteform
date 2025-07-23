import { forwardRef, useEffect, useState, useRef } from "react";
import { TabsListProps } from "./types";
import { useTabs } from "./context";
import { useTheme } from "../_theme";

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
    ({ children, className, ...props }, ref) => {
        const { orientation, grow, classNames, value, tabRefs } = useTabs();
        const { theme, cx } = useTheme();
        const listRef = useRef<HTMLDivElement>(null);
        const [indicatorStyle, setIndicatorStyle] =
            useState<React.CSSProperties>({});

        useEffect(() => {
            if (!value || !tabRefs.has(value)) {
                setIndicatorStyle({ opacity: 0 });
                return;
            }

            const activeTabRef = tabRefs.get(value);
            const activeTabElement = activeTabRef?.current;
            const listElement = listRef.current;

            if (!activeTabElement || !listElement) {
                setIndicatorStyle({ opacity: 0 });
                return;
            }

            const listRect = listElement.getBoundingClientRect();
            const tabRect = activeTabElement.getBoundingClientRect();

            if (orientation === "horizontal") {
                setIndicatorStyle({
                    opacity: 1,
                    transform: `translateX(${tabRect.left - listRect.left}px)`,
                    width: `${tabRect.width}px`,
                    height: "2px",
                    bottom: "-1px",
                    left: 0
                });
            } else {
                setIndicatorStyle({
                    opacity: 1,
                    transform: `translateY(${tabRect.top - listRect.top}px)`,
                    width: "2px",
                    height: `${tabRect.height}px`,
                    right: "-1px",
                    top: 0
                });
            }
        }, [value, tabRefs, orientation]);

        return (
            <div
                ref={(node) => {
                    listRef.current = node;
                    if (typeof ref === "function") {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                role="tablist"
                aria-orientation={orientation}
                className={cx(
                    "relative flex gap-1",
                    theme === "light"
                        ? "border-[var(--byteform-light-border)]"
                        : "border-[var(--byteform-dark-border)]",
                    orientation === "vertical"
                        ? "flex-col min-w-fit border"
                        : "flex-row border-b",
                    grow && orientation === "horizontal" && "w-full",
                    classNames?.list,
                    className
                )}
                {...props}
            >
                {children}

                <div
                    className={cx(
                        "absolute bg-[var(--byteform-primary)] transition-all duration-200 ease-out pointer-events-none opacity-0",
                        orientation === "horizontal"
                            ? "rounded-t-sm"
                            : "rounded-l-sm",
                        classNames?.indicator
                    )}
                    style={indicatorStyle}
                />
            </div>
        );
    }
);

TabsList.displayName = "@byteform/core/Tabs.List";
