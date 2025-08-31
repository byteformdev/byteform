import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo
} from "react";
import { SegmentedControlProps, SegmentedControlSize } from "./types";
import { useTheme } from "../_theme";

const sizeStyles = {
    xs: {
        container: "p-0.5 gap-0.5",
        item: "text-xs px-2 py-1 min-h-6"
    },
    sm: {
        container: "p-1 gap-1",
        item: "text-xs px-2.5 py-1 min-h-6"
    },
    md: {
        container: "p-1 gap-1",
        item: "text-sm px-2.5 py-1.5 min-h-7"
    },
    lg: {
        container: "p-1 gap-1.5",
        item: "text-base px-3 py-2 min-h-8"
    },
    xl: {
        container: "p-1 gap-2",
        item: "text-lg px-4 py-2.5 min-h-10"
    }
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
    withAnimation = true,
    className,
    classNames,
    ...props
}: SegmentedControlProps) => {
    const { theme, cx, settings } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const [internalValue, setInternalValue] = useState<string>(
        value !== undefined ? value : defaultValue || data[0]?.value || ""
    );

    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>(
        {}
    );

    const currentValue = value !== undefined ? value : internalValue;
    const sizeConfig = useMemo(() => getSize(size), [size]);
    const useAnimations = withAnimation;

    const updateIndicator = useCallback(() => {
        if (!containerRef.current || !indicatorRef.current) return;

        const activeButton = containerRef.current.querySelector(
            `[data-value="${currentValue}"]`
        ) as HTMLButtonElement;

        if (activeButton) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const activeRect = activeButton.getBoundingClientRect();

            const newStyle: React.CSSProperties = {
                left: `${activeRect.left - containerRect.left}px`,
                top: `${activeRect.top - containerRect.top}px`,
                width: `${activeRect.width}px`,
                height: `${activeRect.height}px`,
                opacity: 1
            };

            setIndicatorStyle(newStyle);
        }
    }, [currentValue]);

    useEffect(() => {
        const timeoutId = setTimeout(updateIndicator, 50);
        return () => clearTimeout(timeoutId);
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

    const getItemStyles = (isActive: boolean, isDisabled: boolean) => {
        const baseStyles = [
            "relative flex items-center justify-center gap-2 font-medium outline-none z-10 select-none rounded-md",
            sizeConfig.item,
            useAnimations && "transition-all duration-200 ease-in-out",
            fullWidth && "flex-1", // Apply flex-1 to all items when fullWidth is true
            theme === "light"
                ? "text-[var(--byteform-light-text)]"
                : "text-[var(--byteform-dark-text)]"
        ];

        if (isDisabled) {
            return cx([...baseStyles, "opacity-60 cursor-not-allowed"]);
        }

        if (isActive) {
            return cx([
                ...baseStyles,
                "cursor-pointer",
                theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-white",
                !useAnimations &&
                    (theme === "light"
                        ? "bg-[var(--byteform-light-background-hover)]"
                        : "bg-[var(--byteform-dark-background-hover)]")
            ]);
        }

        return cx([
            ...baseStyles,
            "cursor-pointer",
            theme === "light"
                ? "text-[var(--byteform-light-hint)] hover:text-[var(--byteform-light-text)]"
                : "text-[var(--byteform-dark-hint)] hover:text-[var(--byteform-dark-text)]",
            useAnimations &&
                (theme === "light"
                    ? "hover:bg-[var(--byteform-light-background-hover)]"
                    : "hover:bg-[var(--byteform-dark-background-hover)]")
        ]);
    };

    const renderItem = (item: (typeof data)[0], index: number) => {
        const isActive = currentValue === item.value;
        const isDisabled = disabled || item.disabled || false;

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLButtonElement>
        ) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleItemClick(item.value, item.disabled);
            }
        };

        return (
            <button
                key={item.value || index}
                type="button"
                data-value={item.value}
                data-active={isActive}
                disabled={isDisabled}
                onClick={() => handleItemClick(item.value, item.disabled)}
                onKeyDown={handleKeyDown}
                aria-pressed={isActive}
                role="button"
                className={cx(
                    getItemStyles(isActive, isDisabled),
                    classNames?.item,
                    isActive && classNames?.itemActive,
                    isDisabled && classNames?.itemDisabled
                )}
            >
                {item.icon && (
                    <span
                        className={cx(
                            "flex items-center shrink-0",
                            classNames?.itemIcon
                        )}
                    >
                        {item.icon}
                    </span>
                )}
                {item.label && (
                    <span
                        className={cx(
                            "flex items-center truncate",
                            classNames?.itemLabel
                        )}
                    >
                        {item.label}
                    </span>
                )}
            </button>
        );
    };

    const getContainerStyles = () => {
        const baseStyles = [
            "relative overflow-hidden rounded-md",
            sizeConfig.container,
            fullWidth ? "flex w-full" : "inline-flex w-fit",
            orientation === "horizontal" ? "flex-row" : "flex-col"
        ];

        const themeStyles =
            theme === "light"
                ? [
                      "bg-[var(--byteform-light-background)]",
                      "border border-[var(--byteform-light-border)]"
                  ]
                : [
                      "bg-[var(--byteform-dark-background)]",
                      "border border-[var(--byteform-dark-border)]"
                  ];

        const stateStyles = disabled ? ["opacity-60"] : [];

        return cx([...baseStyles, ...themeStyles, ...stateStyles]);
    };

    const getIndicatorStyles = () => {
        const baseStyles = ["absolute z-0 rounded-md pointer-events-none"];

        const animationStyles = useAnimations
            ? ["transition-all duration-200 ease-out"]
            : [];

        const themeStyles =
            theme === "light"
                ? ["bg-[var(--byteform-light-background-hover)]"]
                : ["bg-[var(--byteform-dark-background-hover)]"];

        return cx([...baseStyles, ...animationStyles, ...themeStyles]);
    };

    return (
        <div
            role="radiogroup"
            aria-orientation={orientation}
            className={cx(getContainerStyles(), classNames?.root, className)}
            ref={containerRef}
            {...props}
        >
            <div
                ref={indicatorRef}
                className={cx(getIndicatorStyles(), classNames?.indicator)}
                style={{
                    ...indicatorStyle,
                    opacity: currentValue ? indicatorStyle.opacity || 1 : 0
                }}
                aria-hidden="true"
            />

            <div
                className={cx(
                    "relative flex",
                    sizeConfig.container,
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
