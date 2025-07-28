import { forwardRef, useState, useCallback, useMemo, useEffect } from "react";
import { MonthPickerProps } from "./types";
import { PickerHeader } from "../_shared/PickerHeader";
import { YearPicker } from "../YearPicker";
import { useTheme } from "@byteform/core";
import { useDates } from "../DatesProvider/context";
import dayjs from "dayjs";

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
    (
        {
            allowDeselect = false,
            type = "default",
            allowSingleDateInRange = false,
            defaultValue,
            value,
            onChange,
            minDate,
            maxDate,
            yearFormat = "YYYY",
            monthFormat = "MMM",
            columnsPerRow = 3,
            className,
            disabled = false,
            headerControlsOrder = ["previous", "level", "next"],
            renderMonth,
            onYearClick,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const { locale } = useDates();

        const [currentYear, setCurrentYear] = useState(() => {
            if (value && !Array.isArray(value)) {
                return dayjs(value).year();
            }
            if (defaultValue && !Array.isArray(defaultValue)) {
                return dayjs(defaultValue).year();
            }
            return dayjs().year();
        });

        useEffect(() => {
            if (value && !Array.isArray(value)) {
                setCurrentYear(dayjs(value).year());
            }
        }, [value]);

        const [viewMode, setViewMode] = useState<"month" | "year">("month");

        const [internalValue, setInternalValue] = useState<
            Date | Date[] | null
        >(defaultValue || null);

        const selectedValue = value !== undefined ? value : internalValue;

        const months = useMemo(() => {
            return Array.from({ length: 12 }, (_, i) => i);
        }, []);

        const handlePreviousYear = useCallback(() => {
            setCurrentYear((prev) => prev - 1);
        }, []);

        const handleNextYear = useCallback(() => {
            setCurrentYear((prev) => prev + 1);
        }, []);

        const handleYearClick = useCallback(() => {
            if (onYearClick) {
                onYearClick();
            } else {
                setViewMode("year");
            }
        }, [onYearClick]);

        const handleYearSelect = useCallback(
            (selectedYear: Date | Date[] | null) => {
                if (selectedYear && !Array.isArray(selectedYear)) {
                    setCurrentYear(dayjs(selectedYear).year());
                    setViewMode("month");
                }
            },
            []
        );

        const isMonthDisabled = useCallback(
            (month: number) => {
                if (disabled) return true;

                const monthStart = dayjs()
                    .year(currentYear)
                    .month(month)
                    .startOf("month")
                    .toDate();
                const monthEnd = dayjs()
                    .year(currentYear)
                    .month(month)
                    .endOf("month")
                    .toDate();

                if (minDate && monthEnd < minDate) return true;
                if (maxDate && monthStart > maxDate) return true;

                return false;
            },
            [disabled, minDate, maxDate, currentYear]
        );

        const isMonthSelected = useCallback(
            (month: number) => {
                if (!selectedValue) return false;

                const monthDate = dayjs()
                    .year(currentYear)
                    .month(month)
                    .startOf("month")
                    .toDate();

                if (Array.isArray(selectedValue)) {
                    return selectedValue.some((date) =>
                        dayjs(date).isSame(monthDate, "month")
                    );
                }

                return dayjs(selectedValue).isSame(monthDate, "month");
            },
            [selectedValue, currentYear]
        );

        const isMonthInRange = useCallback(
            (month: number) => {
                if (
                    type !== "range" ||
                    !Array.isArray(selectedValue) ||
                    selectedValue.length !== 2
                ) {
                    return false;
                }

                const monthDate = dayjs()
                    .year(currentYear)
                    .month(month)
                    .startOf("month")
                    .toDate();
                const [start, end] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );

                return (
                    dayjs(monthDate).isAfter(dayjs(start), "month") &&
                    dayjs(monthDate).isBefore(dayjs(end), "month")
                );
            },
            [type, selectedValue, currentYear]
        );

        const isMonthFirstInRange = useCallback(
            (month: number) => {
                if (type !== "range" || !Array.isArray(selectedValue))
                    return false;
                const monthDate = dayjs()
                    .year(currentYear)
                    .month(month)
                    .startOf("month")
                    .toDate();
                const [start] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );
                return dayjs(monthDate).isSame(dayjs(start), "month");
            },
            [type, selectedValue, currentYear]
        );

        const isMonthLastInRange = useCallback(
            (month: number) => {
                if (type !== "range" || !Array.isArray(selectedValue))
                    return false;
                const monthDate = dayjs()
                    .year(currentYear)
                    .month(month)
                    .startOf("month")
                    .toDate();
                const [_, end] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );
                return dayjs(monthDate).isSame(dayjs(end), "month");
            },
            [type, selectedValue, currentYear]
        );

        const handleMonthClick = useCallback(
            (month: number) => {
                if (isMonthDisabled(month)) return;

                const monthDate = dayjs()
                    .year(currentYear)
                    .month(month)
                    .startOf("month")
                    .toDate();

                let newValue: Date | Date[] | null = null;

                if (type === "default") {
                    if (allowDeselect && isMonthSelected(month)) {
                        newValue = null;
                    } else {
                        newValue = monthDate;
                    }
                } else if (type === "multiple") {
                    const currentArray = Array.isArray(selectedValue)
                        ? selectedValue
                        : [];

                    if (isMonthSelected(month)) {
                        if (allowDeselect) {
                            newValue = currentArray.filter(
                                (date) =>
                                    !dayjs(date).isSame(monthDate, "month")
                            );
                        } else {
                            newValue = currentArray;
                        }
                    } else {
                        newValue = [...currentArray, monthDate];
                    }
                } else if (type === "range") {
                    const currentArray = Array.isArray(selectedValue)
                        ? selectedValue
                        : [];

                    if (currentArray.length === 0) {
                        newValue = [monthDate];
                    } else if (currentArray.length === 1) {
                        newValue = [currentArray[0], monthDate].sort((a, b) =>
                            dayjs(a).diff(dayjs(b))
                        );
                    } else {
                        newValue = [monthDate];
                    }

                    if (
                        !allowSingleDateInRange &&
                        Array.isArray(newValue) &&
                        newValue.length === 1
                    ) {
                        // Keep single date in range if allowed
                    }
                }

                if (value === undefined) {
                    setInternalValue(newValue);
                }

                onChange?.(newValue);
            },
            [
                type,
                selectedValue,
                allowDeselect,
                allowSingleDateInRange,
                isMonthDisabled,
                isMonthSelected,
                onChange,
                value,
                currentYear
            ]
        );

        const rootClasses = cx("w-full inline-block text-sm", className);

        const monthsGridClasses = cx("grid gap-1 mt-2");

        const getMonthButtonClasses = (month: number) => {
            const isSelected = isMonthSelected(month);
            const isInRange = isMonthInRange(month);
            const isFirstInRange = isMonthFirstInRange(month);
            const isLastInRange = isMonthLastInRange(month);
            const isDisabled = isMonthDisabled(month);

            return cx(
                "flex items-center justify-center rounded-md h-8 px-2 transition-all duration-300 font-medium",
                {
                    [theme === "light"
                        ? "bg-transparent enabled:hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]"
                        : "bg-transparent enabled:hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]"]:
                        !isSelected && !isInRange,

                    [theme === "light"
                        ? "bg-[var(--byteform-primary)] text-[var(--byteform-light-text)] enabled:hover:bg-[var(--byteform-primary-hover)]"
                        : "bg-[var(--byteform-primary)] text-[var(--byteform-dark-text)] enabled:hover:bg-[var(--byteform-primary-hover)]"]:
                        isSelected,

                    [theme === "light"
                        ? "bg-[var(--byteform-primary-light)] text-[var(--byteform-light-text)]"
                        : "bg-[var(--byteform-primary-light)] text-[var(--byteform-dark-text)]"]:
                        isInRange,

                    "rounded-none":
                        isInRange && !isFirstInRange && !isLastInRange,
                    "rounded-r-none": isFirstInRange,
                    "rounded-l-none": isLastInRange,

                    "opacity-60 cursor-not-allowed": isDisabled
                }
            );
        };

        const headerLabel = dayjs().year(currentYear).format(yearFormat);

        if (viewMode === "year") {
            return (
                <div
                    ref={ref}
                    className={cx("w-full text-sm", className)}
                    {...props}
                >
                    <YearPicker
                        type="default"
                        value={dayjs()
                            .year(currentYear)
                            .startOf("year")
                            .toDate()}
                        onChange={handleYearSelect}
                        yearFormat={yearFormat}
                        minDate={minDate}
                        maxDate={maxDate}
                        disabled={disabled}
                        columnsPerRow={columnsPerRow}
                        headerControlsOrder={headerControlsOrder}
                        className="w-full"
                    />
                </div>
            );
        }

        return (
            <div ref={ref} className={rootClasses} {...props}>
                <PickerHeader
                    label={headerLabel}
                    level="year"
                    levelClickable={true}
                    onLevelClick={handleYearClick}
                    onPrevious={handlePreviousYear}
                    onNext={handleNextYear}
                    controlsOrder={headerControlsOrder}
                />

                <div
                    className={monthsGridClasses}
                    style={{
                        gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`
                    }}
                >
                    {months.map((month) => (
                        <button
                            key={month}
                            type="button"
                            className={getMonthButtonClasses(month)}
                            onClick={() => handleMonthClick(month)}
                            disabled={isMonthDisabled(month)}
                        >
                            {renderMonth
                                ? renderMonth(month, currentYear)
                                : dayjs()
                                      .year(currentYear)
                                      .month(month)
                                      .locale(locale)
                                      .format(monthFormat)}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
);

MonthPicker.displayName = "@byteform/dates/MonthPicker";
