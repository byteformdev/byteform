import { forwardRef, useState, useCallback, useMemo } from "react";
import { YearPickerProps } from "./types";
import { PickerHeader } from "../_shared/PickerHeader";
import { useTheme } from "../../byteform/_theme";
import dayjs from "dayjs";

export const YearPicker = forwardRef<HTMLDivElement, YearPickerProps>(
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
            decadeFormat = "YYYY",
            columnsPerRow = 3,
            className,
            disabled = false,
            headerControlsOrder = ["previous", "level", "next"],
            renderYear,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [currentDecade, setCurrentDecade] = useState(() => {
            const now = dayjs();
            const currentYear = now.year();
            return Math.floor(currentYear / 10) * 10;
        });

        const [internalValue, setInternalValue] = useState<
            Date | Date[] | null
        >(defaultValue || null);

        const selectedValue = value !== undefined ? value : internalValue;

        const years = useMemo(() => {
            return Array.from({ length: 10 }, (_, i) => currentDecade + i);
        }, [currentDecade]);

        const handlePreviousDecade = useCallback(() => {
            setCurrentDecade((prev) => prev - 10);
        }, []);

        const handleNextDecade = useCallback(() => {
            setCurrentDecade((prev) => prev + 10);
        }, []);

        const isYearDisabled = useCallback(
            (year: number) => {
                if (disabled) return true;

                const yearStart = dayjs().year(year).startOf("year").toDate();
                const yearEnd = dayjs().year(year).endOf("year").toDate();

                if (minDate && yearEnd < minDate) return true;
                if (maxDate && yearStart > maxDate) return true;

                return false;
            },
            [disabled, minDate, maxDate]
        );

        const isYearSelected = useCallback(
            (year: number) => {
                if (!selectedValue) return false;

                const yearDate = dayjs().year(year).startOf("year").toDate();

                if (Array.isArray(selectedValue)) {
                    return selectedValue.some((date) =>
                        dayjs(date).isSame(yearDate, "year")
                    );
                }

                return dayjs(selectedValue).isSame(yearDate, "year");
            },
            [selectedValue]
        );

        const isYearInRange = useCallback(
            (year: number) => {
                if (
                    type !== "range" ||
                    !Array.isArray(selectedValue) ||
                    selectedValue.length !== 2
                ) {
                    return false;
                }

                const yearDate = dayjs().year(year).startOf("year").toDate();
                const [start, end] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );

                return (
                    dayjs(yearDate).isAfter(dayjs(start), "year") &&
                    dayjs(yearDate).isBefore(dayjs(end), "year")
                );
            },
            [type, selectedValue]
        );

        const isYearFirstInRange = useCallback(
            (year: number) => {
                if (type !== "range" || !Array.isArray(selectedValue))
                    return false;
                const yearDate = dayjs().year(year).startOf("year").toDate();
                const [start] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );
                return dayjs(yearDate).isSame(dayjs(start), "year");
            },
            [type, selectedValue]
        );

        const isYearLastInRange = useCallback(
            (year: number) => {
                if (type !== "range" || !Array.isArray(selectedValue))
                    return false;
                const yearDate = dayjs().year(year).startOf("year").toDate();
                const [_, end] = selectedValue.sort((a, b) =>
                    dayjs(a).diff(dayjs(b))
                );
                return dayjs(yearDate).isSame(dayjs(end), "year");
            },
            [type, selectedValue]
        );

        const handleYearClick = useCallback(
            (year: number) => {
                if (isYearDisabled(year)) return;

                const yearDate = dayjs().year(year).startOf("year").toDate();

                let newValue: Date | Date[] | null = null;

                if (type === "default") {
                    if (allowDeselect && isYearSelected(year)) {
                        newValue = null;
                    } else {
                        newValue = yearDate;
                    }
                } else if (type === "multiple") {
                    const currentArray = Array.isArray(selectedValue)
                        ? selectedValue
                        : [];

                    if (isYearSelected(year)) {
                        if (allowDeselect) {
                            newValue = currentArray.filter(
                                (date) => !dayjs(date).isSame(yearDate, "year")
                            );
                        } else {
                            newValue = currentArray;
                        }
                    } else {
                        newValue = [...currentArray, yearDate];
                    }
                } else if (type === "range") {
                    const currentArray = Array.isArray(selectedValue)
                        ? selectedValue
                        : [];

                    if (currentArray.length === 0) {
                        newValue = [yearDate];
                    } else if (currentArray.length === 1) {
                        newValue = [currentArray[0], yearDate].sort((a, b) =>
                            dayjs(a).diff(dayjs(b))
                        );
                    } else {
                        newValue = [yearDate];
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
                isYearDisabled,
                isYearSelected,
                onChange,
                value
            ]
        );

        const rootClasses = cx("w-full inline-block text-sm", className);

        const yearsGridClasses = cx("grid gap-1 mt-2");

        const getYearButtonClasses = (year: number) => {
            const isSelected = isYearSelected(year);
            const isInRange = isYearInRange(year);
            const isFirstInRange = isYearFirstInRange(year);
            const isLastInRange = isYearLastInRange(year);
            const isDisabled = isYearDisabled(year);

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

        const headerLabel = `${dayjs()
            .year(currentDecade)
            .format(decadeFormat)} - ${dayjs()
            .year(currentDecade + 9)
            .format(decadeFormat)}`;

        return (
            <div ref={ref} className={rootClasses} {...props}>
                <PickerHeader
                    label={headerLabel}
                    level="decade"
                    controlsOrder={headerControlsOrder}
                    onPrevious={handlePreviousDecade}
                    onNext={handleNextDecade}
                />

                <div
                    className={yearsGridClasses}
                    style={{
                        gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`
                    }}
                >
                    {years.map((year) => (
                        <button
                            key={year}
                            type="button"
                            className={getYearButtonClasses(year)}
                            onClick={() => handleYearClick(year)}
                            disabled={isYearDisabled(year)}
                        >
                            {renderYear
                                ? renderYear(year)
                                : dayjs().year(year).format(yearFormat)}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
);

YearPicker.displayName = "@byteform/dates/YearPicker";
