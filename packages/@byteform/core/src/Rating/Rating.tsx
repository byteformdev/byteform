import { forwardRef, useState, useCallback, useMemo } from "react";
import { RatingProps, RatingSize } from "./types";
import { useTheme } from "../_theme";
import { IconStar } from "@tabler/icons-react";

const sizeClasses = {
    xs: {
        item: "w-4 h-4",
        icon: 16,
        gap: "gap-0.5"
    },
    sm: {
        item: "w-5 h-5",
        icon: 20,
        gap: "gap-1"
    },
    md: {
        item: "w-6 h-6",
        icon: 24,
        gap: "gap-1"
    },
    lg: {
        item: "w-7 h-7",
        icon: 28,
        gap: "gap-1.5"
    },
    xl: {
        item: "w-8 h-8",
        icon: 32,
        gap: "gap-2"
    }
};

const getSize = (size: RatingSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
    (
        {
            count = 5,
            value,
            defaultValue = 0,
            highlightSelectedOnly = false,
            readOnly = false,
            fractions = 1,
            emptySymbol,
            fullSymbol,
            onChange,
            size = "md",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const [internalValue, setInternalValue] = useState(defaultValue);
        const [hoverValue, setHoverValue] = useState<number | null>(null);

        const currentValue = value !== undefined ? value : internalValue;
        const displayValue = hoverValue !== null ? hoverValue : currentValue;

        const sizeStyles = getSize(size);

        const handleItemClick = useCallback(
            (index: number, event: React.MouseEvent) => {
                if (readOnly) return;

                let newValue: number;

                if (fractions === 1) {
                    newValue = index + 1;
                } else {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const clickX = event.clientX - rect.left;
                    const width = rect.width;
                    const fraction =
                        Math.ceil((clickX / width) * fractions) / fractions;
                    newValue = index + fraction;
                }

                if (value === undefined) {
                    setInternalValue(newValue);
                }
                onChange?.(newValue);
            },
            [readOnly, value, onChange, fractions]
        );

        const handleItemHover = useCallback(
            (index: number, event: React.MouseEvent) => {
                if (readOnly) return;

                let hoverVal: number;

                if (fractions === 1) {
                    hoverVal = index + 1;
                } else {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const hoverX = event.clientX - rect.left;
                    const width = rect.width;
                    const fraction =
                        Math.ceil((hoverX / width) * fractions) / fractions;
                    hoverVal = index + fraction;
                }

                setHoverValue(hoverVal);
            },
            [readOnly, fractions]
        );

        const handleMouseLeave = useCallback(() => {
            if (readOnly) return;
            setHoverValue(null);
        }, [readOnly]);

        const getStarFillPercentage = useCallback(
            (starIndex: number) => {
                const starValue = starIndex + 1;

                if (highlightSelectedOnly) {
                    const starStart = starIndex;
                    const starEnd = starIndex + 1;

                    if (displayValue > starStart && displayValue <= starEnd) {
                        return 100;
                    }
                    return 0;
                }

                if (displayValue >= starValue) {
                    return 100;
                } else if (displayValue > starIndex) {
                    return Math.round((displayValue - starIndex) * 100);
                }
                return 0;
            },
            [displayValue, highlightSelectedOnly]
        );

        const renderSymbol = useCallback(
            (starIndex: number) => {
                const fillPercentage = getStarFillPercentage(starIndex);
                const isEmpty = fillPercentage === 0;
                const isFull = fillPercentage === 100;
                const isPartial = fillPercentage > 0 && fillPercentage < 100;

                if (isFull && fullSymbol) {
                    return (
                        <div
                            className={cx(
                                "transition-all duration-200 text-[var(--byteform-yellow-5)]",
                                classNames?.symbol
                            )}
                        >
                            {fullSymbol}
                        </div>
                    );
                }

                if (isEmpty && emptySymbol) {
                    return (
                        <div
                            className={cx(
                                "transition-all duration-200",
                                theme === "light"
                                    ? "text-[var(--byteform-light-border)]"
                                    : "text-[var(--byteform-dark-border)]",
                                classNames?.symbol
                            )}
                        >
                            {emptySymbol}
                        </div>
                    );
                }

                if (isPartial && fractions > 1) {
                    return (
                        <div className="relative">
                            <IconStar
                                size={sizeStyles.icon}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className={cx(
                                    "transition-all duration-200",
                                    theme === "light"
                                        ? "text-[var(--byteform-light-border)]"
                                        : "text-[var(--byteform-dark-border)]",
                                    classNames?.symbol
                                )}
                            />
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    clipPath: `inset(0 ${
                                        100 - fillPercentage
                                    }% 0 0)`
                                }}
                            >
                                <IconStar
                                    size={sizeStyles.icon}
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className={cx(
                                        "transition-all duration-200 text-[var(--byteform-yellow-5)]",
                                        classNames?.symbol
                                    )}
                                />
                            </div>
                        </div>
                    );
                }

                return (
                    <IconStar
                        size={sizeStyles.icon}
                        fill={isFull ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className={cx(
                            "transition-all duration-200",
                            isFull
                                ? "text-[var(--byteform-yellow-5)]"
                                : theme === "light"
                                ? "text-[var(--byteform-light-border)]"
                                : "text-[var(--byteform-dark-border)]",
                            classNames?.symbol
                        )}
                    />
                );
            },
            [
                getStarFillPercentage,
                fullSymbol,
                emptySymbol,
                theme,
                cx,
                classNames?.symbol,
                sizeStyles.icon,
                fractions
            ]
        );

        const items = useMemo(() => {
            const itemsArray = [];

            for (let i = 0; i < count; i++) {
                itemsArray.push(
                    <div
                        key={i}
                        className={cx(
                            "relative flex items-center justify-center cursor-pointer transition-transform duration-150",
                            !readOnly && "hover:scale-110",
                            readOnly && "cursor-default",
                            sizeStyles.item,
                            classNames?.item
                        )}
                        onClick={(e) => handleItemClick(i, e)}
                        onMouseMove={(e) => handleItemHover(i, e)}
                    >
                        {renderSymbol(i)}
                    </div>
                );
            }

            return itemsArray;
        }, [
            count,
            cx,
            readOnly,
            sizeStyles.item,
            classNames?.item,
            handleItemClick,
            handleItemHover,
            renderSymbol
        ]);

        return (
            <div
                ref={ref}
                className={cx(
                    "inline-flex items-center",
                    sizeStyles.gap,
                    readOnly && "pointer-events-none",
                    classNames?.root,
                    className
                )}
                onMouseLeave={handleMouseLeave}
                role="radiogroup"
                aria-label={`Rating: ${currentValue} out of ${count}`}
                {...props}
            >
                {items}
            </div>
        );
    }
);

Rating.displayName = "@byteform/core/Rating";
