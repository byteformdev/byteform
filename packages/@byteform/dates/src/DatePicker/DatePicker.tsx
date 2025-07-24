import { forwardRef, useState, useCallback, useMemo } from "react";
import { DatePickerProps } from "./types";
import { PickerHeader } from "../_shared/PickerHeader";
import { MonthPicker } from "../MonthPicker";
import { YearPicker } from "../YearPicker";
import { useTheme } from "@byteform/core";
import { useDates } from "../DatesProvider/context";
import dayjs from "dayjs";

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (
        {
            allowDeselect = false,
            type = "default",
            allowSingleDateInRange = false,
            defaultValue,
            value,
            onChange,
            hideOutsideDates = false,
            showWeekNumbers = false,
            hideWeekdays = false,
            renderDay,
            minDate,
            maxDate,
            headerControlsOrder = ["previous", "level", "next"],
            excludeDate,
            className,
            disabled = false,
            monthFormat = "MMMM YYYY",
            yearFormat = "YYYY",
            dayFormat = "D",
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const { locale, firstDayOfWeek, weekendDays, consistentWeeks } =
            useDates();

        const [currentDate, setCurrentDate] = useState(() => {
            const now = dayjs();
            return now.toDate();
        });

        const [viewMode, setViewMode] = useState<"date" | "month" | "year">(
            "date"
        );

        const [internalValue, setInternalValue] = useState<
            Date | Date[] | null
        >(defaultValue || null);

        const selectedValue = value !== undefined ? value : internalValue;

        const calendarDays = useMemo(() => {
            const startOfMonth = dayjs(currentDate).startOf("month");
            const endOfMonth = dayjs(currentDate).endOf("month");

            const firstCalendarDay = startOfMonth.day(firstDayOfWeek);
            const adjustedFirstDay = firstCalendarDay.isAfter(startOfMonth)
                ? firstCalendarDay.subtract(7, "day")
                : firstCalendarDay;

            const weeksToShow = consistentWeeks
                ? 6
                : Math.ceil((endOfMonth.diff(adjustedFirstDay, "day") + 1) / 7);

            const days: Date[] = [];
            let currentDay = adjustedFirstDay;

            for (let week = 0; week < weeksToShow; week++) {
                for (let day = 0; day < 7; day++) {
                    days.push(currentDay.toDate());
                    currentDay = currentDay.add(1, "day");
                }
            }

            return days;
        }, [currentDate, firstDayOfWeek, consistentWeeks]);

        const weekdayHeaders = useMemo(() => {
            const headers: string[] = [];
            let currentDay = dayjs().day(firstDayOfWeek);

            for (let i = 0; i < 7; i++) {
                headers.push(currentDay.locale(locale).format("dd"));
                currentDay = currentDay.add(1, "day");
            }

            return headers;
        }, [firstDayOfWeek, locale]);

        const handlePreviousMonth = useCallback(() => {
            setCurrentDate((prev) => dayjs(prev).subtract(1, "month").toDate());
        }, []);

        const handleNextMonth = useCallback(() => {
            setCurrentDate((prev) => dayjs(prev).add(1, "month").toDate());
        }, []);

        const handleHeaderClick = useCallback(() => {
            setViewMode("month");
        }, []);

        const handleMonthSelect = useCallback(
            (selectedMonth: Date | Date[] | null) => {
                if (selectedMonth && !Array.isArray(selectedMonth)) {
                    setCurrentDate(selectedMonth);
                    setViewMode("date");
                }
            },
            []
        );

        const handleYearSelect = useCallback(
            (selectedYear: Date | Date[] | null) => {
                if (selectedYear && !Array.isArray(selectedYear)) {
                    setCurrentDate((prev) =>
                        dayjs(prev).year(dayjs(selectedYear).year()).toDate()
                    );
                    setViewMode("month");
                }
            },
            []
        );

        const isDayDisabled = useCallback(
            (date: Date) => {
                if (disabled) return true;
                if (excludeDate && excludeDate(date)) return true;
                if (minDate && dayjs(date).isBefore(dayjs(minDate), "day"))
                    return true;
                if (maxDate && dayjs(date).isAfter(dayjs(maxDate), "day"))
                    return true;
                return false;
            },
            [disabled, excludeDate, minDate, maxDate]
        );

        const isDaySelected = useCallback(
            (date: Date) => {
                if (!selectedValue) return false;

                if (Array.isArray(selectedValue)) {
                    return selectedValue.some((selectedDate) =>
                        dayjs(selectedDate).isSame(dayjs(date), "day")
                    );
                }

                return dayjs(selectedValue).isSame(dayjs(date), "day");
            },
            [selectedValue]
        );

        const isDayInRange = useCallback(
            (date: Date) => {
                if (
                    type !== "range" ||
                    !Array.isArray(selectedValue) ||
                    selectedValue.length !== 2
                ) {
                    return false;
                }

                const [start, end] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );

                return (
                    dayjs(date).isAfter(dayjs(start), "day") &&
                    dayjs(date).isBefore(dayjs(end), "day")
                );
            },
            [type, selectedValue]
        );

        const isDayFirstInRange = useCallback(
            (date: Date) => {
                if (type !== "range" || !Array.isArray(selectedValue))
                    return false;
                const [start] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );
                return dayjs(date).isSame(dayjs(start), "day");
            },
            [type, selectedValue]
        );

        const isDayLastInRange = useCallback(
            (date: Date) => {
                if (type !== "range" || !Array.isArray(selectedValue))
                    return false;
                const [_, end] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );
                return dayjs(date).isSame(dayjs(end), "day");
            },
            [type, selectedValue]
        );

        const isDayOutsideMonth = useCallback(
            (date: Date) => {
                return !dayjs(date).isSame(dayjs(currentDate), "month");
            },
            [currentDate]
        );

        const isDayWeekend = useCallback(
            (date: Date) => {
                return weekendDays.includes(dayjs(date).day());
            },
            [weekendDays]
        );

        const getWeekNumber = useCallback((date: Date) => {
            const startOfYear = dayjs(date).startOf("year");
            const startOfWeek = dayjs(date).startOf("week");
            return Math.ceil(startOfWeek.diff(startOfYear, "day") / 7) + 1;
        }, []);

        const handleDayClick = useCallback(
            (date: Date) => {
                if (isDayDisabled(date)) return;
                if (hideOutsideDates && isDayOutsideMonth(date)) return;

                let newValue: Date | Date[] | null = null;

                if (type === "default") {
                    if (allowDeselect && isDaySelected(date)) {
                        newValue = null;
                    } else {
                        newValue = date;
                    }
                } else if (type === "multiple") {
                    const currentArray = Array.isArray(selectedValue)
                        ? selectedValue
                        : [];

                    if (isDaySelected(date)) {
                        if (allowDeselect) {
                            newValue = currentArray.filter(
                                (selectedDate) =>
                                    !dayjs(selectedDate).isSame(
                                        dayjs(date),
                                        "day"
                                    )
                            );
                        } else {
                            newValue = currentArray;
                        }
                    } else {
                        newValue = [...currentArray, date];
                    }
                } else if (type === "range") {
                    const currentArray = Array.isArray(selectedValue)
                        ? selectedValue
                        : [];

                    if (currentArray.length === 0) {
                        newValue = [date];
                    } else if (currentArray.length === 1) {
                        newValue = [currentArray[0], date].sort((a, b) =>
                            dayjs(a).diff(dayjs(b))
                        );
                    } else {
                        newValue = [date];
                    }

                    if (
                        !allowSingleDateInRange &&
                        Array.isArray(newValue) &&
                        newValue.length === 1
                    ) {
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
                isDayDisabled,
                isDaySelected,
                isDayOutsideMonth,
                hideOutsideDates,
                onChange,
                value
            ]
        );

        const rootClasses = cx(
            "w-full text-sm flex flex-col items-center justify-center",
            theme === "light"
                ? "text-[var(--byteform-light-text)]"
                : "text-[var(--byteform-dark-text)]",
            className
        );

        const getDayButtonClasses = (date: Date) => {
            const isSelected = isDaySelected(date);
            const isInRange = isDayInRange(date);
            const isFirstInRange = isDayFirstInRange(date);
            const isLastInRange = isDayLastInRange(date);
            const isDisabled = isDayDisabled(date);
            const isOutside = isDayOutsideMonth(date);
            const isWeekend = isDayWeekend(date);

            return cx(
                "flex items-center justify-center rounded-md h-8 min-w-0 transition-all duration-300 font-medium text-center",
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

                    "opacity-60 cursor-not-allowed": isDisabled,
                    "opacity-40": isOutside && hideOutsideDates,
                    "text-[var(--byteform-red-3)]":
                        isWeekend && !isSelected && !isInRange,
                    hidden: hideOutsideDates && isOutside
                }
            );
        };

        const headerLabel = dayjs(currentDate)
            .locale(locale)
            .format(monthFormat);

        if (viewMode === "year") {
            return (
                <div
                    ref={ref}
                    className={cx("w-full text-sm", className)}
                    {...props}
                >
                    <YearPicker
                        type="default"
                        value={dayjs(currentDate).startOf("year").toDate()}
                        onChange={handleYearSelect}
                        yearFormat={yearFormat}
                        minDate={minDate}
                        maxDate={maxDate}
                        disabled={disabled}
                        headerControlsOrder={headerControlsOrder}
                        className="w-full"
                    />
                </div>
            );
        }

        if (viewMode === "month") {
            return (
                <div
                    ref={ref}
                    className={cx("w-full text-sm", className)}
                    {...props}
                >
                    <MonthPicker
                        type="default"
                        value={dayjs(currentDate).startOf("month").toDate()}
                        onChange={handleMonthSelect}
                        yearFormat={yearFormat}
                        minDate={minDate}
                        maxDate={maxDate}
                        disabled={disabled}
                        headerControlsOrder={headerControlsOrder}
                        className="w-full"
                        onYearClick={() => setViewMode("year")}
                    />
                </div>
            );
        }

        return (
            <div ref={ref} className={rootClasses} {...props}>
                <PickerHeader
                    label={headerLabel}
                    level="month"
                    levelClickable={true}
                    onLevelClick={handleHeaderClick}
                    onPrevious={handlePreviousMonth}
                    onNext={handleNextMonth}
                    controlsOrder={headerControlsOrder}
                />

                {!hideWeekdays && (
                    <div
                        className={cx("grid gap-1 mt-2 mb-1 w-full", {
                            "grid-cols-8": showWeekNumbers,
                            "grid-cols-7": !showWeekNumbers
                        })}
                    >
                        {showWeekNumbers && (
                            <div className="flex items-center justify-center h-8 min-w-0 text-xs opacity-60">
                                #
                            </div>
                        )}
                        {weekdayHeaders.map((weekday, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center h-8 min-w-0 text-xs font-medium opacity-60"
                            >
                                {weekday}
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid gap-1 w-full">
                    {Array.from(
                        { length: Math.ceil(calendarDays.length / 7) },
                        (_, weekIndex) => (
                            <div
                                key={weekIndex}
                                className={cx("grid gap-1 w-full", {
                                    "grid-cols-8": showWeekNumbers,
                                    "grid-cols-7": !showWeekNumbers
                                })}
                            >
                                {showWeekNumbers && (
                                    <div className="flex items-center justify-center h-8 min-w-0 text-xs opacity-60">
                                        {getWeekNumber(
                                            calendarDays[weekIndex * 7]
                                        )}
                                    </div>
                                )}
                                {calendarDays
                                    .slice(weekIndex * 7, (weekIndex + 1) * 7)
                                    .map((date, dayIndex) => (
                                        <button
                                            key={dayIndex}
                                            type="button"
                                            className={getDayButtonClasses(
                                                date
                                            )}
                                            onClick={() => handleDayClick(date)}
                                            disabled={
                                                isDayDisabled(date) ||
                                                (hideOutsideDates &&
                                                    isDayOutsideMonth(date))
                                            }
                                        >
                                            {renderDay
                                                ? renderDay(date)
                                                : dayjs(date).format(dayFormat)}
                                        </button>
                                    ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
);

DatePicker.displayName = "@byteform/dates/DatePicker";
