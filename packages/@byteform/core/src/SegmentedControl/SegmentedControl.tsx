import React, { useState, useCallback, useRef, useEffect } from "react";
import { SegmentedControlProps, SegmentedControlSize } from "./types";
import { useTheme } from "../_theme";

const sizeStyles = {
    xs: "text-xs px-1 py-0.5 h-4",
    sm: "text-xs px-2 py-1 h-5",
    md: "text-sm px-3 py-1.5 h-6",
    lg: "text-base px-4 py-2 h-8",
    xl: "text-lg px-5 py-2.5 h-10"
};

const getSize = (size: SegmentedControlSize) => {
    return sizeStyles[size] || sizeStyles.md;
};

export const SegmentedControl = ({
    data,
    value,
    defaultValue,
    onChange,
    size = "md",
    orientation = "horizontal",
    disabled,
    fullWidth,
    className,
    classNames,
    ...props
}: SegmentedControlProps) => {
    const { theme, cx } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const [internalValue, setInternalValue] = useState<string>(
        value !== undefined ? value : defaultValue || data[0]?.value || ""
    );

    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>(
        {}
    );

    const currentValue = value !== undefined ? value : internalValue;

    const updateIndicator = useCallback(() => {
        if (!containerRef.current || !indicatorRef.current) return;

        const activeButton = containerRef.current.querySelector(
            `[data-value="${currentValue}"]`
        ) as HTMLButtonElement;

        if (activeButton) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const activeRect = activeButton.getBoundingClientRect();

            const newStyle: React.CSSProperties = {
                "--indicator-left": `${activeRect.left - containerRect.left}px`,
                "--indicator-top":
                    orientation === "horizontal"
                        ? "4px"
                        : `${activeRect.top - containerRect.top}px`,
                "--indicator-width": `${activeRect.width}px`,
                "--indicator-height": `${activeRect.height}px`
            } as React.CSSProperties;

            setIndicatorStyle(newStyle);
        }
    }, [currentValue, orientation]);

    useEffect(() => {
        updateIndicator();
    }, [updateIndicator]);

    useEffect(() => {
        const handleResize = () => updateIndicator();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [updateIndicator]);

    const handleItemClick = useCallback(
        (itemValue: string, itemDisabled?: boolean) => {
            if (disabled || itemDisabled) return;

            if (value === undefined) {
                setInternalValue(itemValue);
            }
            onChange?.(itemValue);
        },
        [disabled, value, onChange]
    );

    const renderItem = (item: (typeof data)[0], index: number) => {
        const isActive = currentValue === item.value;
        const isDisabled = disabled || item.disabled;

        return (
            <button
                key={item.value}
                type="button"
                data-value={item.value}
                disabled={isDisabled}
                onClick={() => handleItemClick(item.value, item.disabled)}
                className={cx(
                    "relative flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out outline-none z-10",
                    getSize(size),
                    !isDisabled && "cursor-pointer",
                    isDisabled && "opacity-60 cursor-not-allowed",
                    theme === "light"
                        ? "text-[var(--byteform-light-hint)]"
                        : "text-[var(--byteform-dark-hint)]",
                    !isActive &&
                        !isDisabled &&
                        (theme === "light"
                            ? "hover:text-[var(--byteform-light-text)]"
                            : "hover:text-[var(--byteform-dark-text)]"),
                    isActive && "text-white",
                    fullWidth && "flex-1",
                    classNames?.item,
                    isActive && classNames?.itemActive,
                    isDisabled && classNames?.itemDisabled
                )}
            >
                {item.icon && (
                    <span
                        className={cx(
                            "flex items-center",
                            classNames?.itemIcon
                        )}
                    >
                        {item.icon}
                    </span>
                )}
                {item.label && (
                    <span
                        className={cx(
                            "flex items-center",
                            classNames?.itemLabel
                        )}
                    >
                        {item.label}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div
            className={cx(
                "relative rounded-md overflow-hidden p-1",
                fullWidth ? "flex w-full" : "inline-flex w-fit",
                theme === "light"
                    ? "bg-[var(--byteform-light-background)] border border-[var(--byteform-light-border)]"
                    : "bg-[var(--byteform-dark-background)] border border-[var(--byteform-dark-border)]",
                orientation === "horizontal" ? "flex-row" : "flex-col",
                disabled && "opacity-60",
                classNames?.root,
                className
            )}
            ref={containerRef}
            style={indicatorStyle}
            {...props}
        >
            <div
                ref={indicatorRef}
                className={cx(
                    "absolute rounded transition-all duration-200 ease-in-out z-0",
                    "left-[var(--indicator-left,0)] top-[var(--indicator-top,0)]",
                    "w-[var(--indicator-width,0)] h-[var(--indicator-height,0)]",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background-hover)]"
                        : "bg-[var(--byteform-dark-background-hover)]",
                    classNames?.indicator
                )}
            />

            <div
                className={cx(
                    "relative flex z-10",
                    orientation === "horizontal" ? "flex-row" : "flex-col",
                    fullWidth ? "w-full" : "w-fit",
                    classNames?.container
                )}
            >
                {data.map((item, index) => renderItem(item, index))}
            </div>
        </div>
    );
};

SegmentedControl.displayName = "@byteform/core/SegmentedControl";
