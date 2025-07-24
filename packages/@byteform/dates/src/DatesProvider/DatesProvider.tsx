import { useState, useEffect } from "react";
import { DatesProviderProps } from "./types";
import { DatesContext } from "./context";
import dayjs from "dayjs";

export const DatesProvider = ({
    children,
    locale = "en",
    firstDayOfWeek = 1,
    weekendDays = [0, 6],
    consistentWeeks = false
}: DatesProviderProps) => {
    const [currentLocale, setCurrentLocale] = useState<string>(locale);
    const [currentFirstDayOfWeek, setCurrentFirstDayOfWeek] =
        useState<number>(firstDayOfWeek);
    const [currentWeekendDays, setCurrentWeekendDays] =
        useState<number[]>(weekendDays);
    const [currentConsistentWeeks, setCurrentConsistentWeeks] =
        useState<boolean>(consistentWeeks);

    useEffect(() => {
        if (currentFirstDayOfWeek < 0 || currentFirstDayOfWeek > 6) {
            console.warn(
                "firstDayOfWeek must be between 0-6, defaulting to 0 (Sunday)"
            );
            setCurrentFirstDayOfWeek(0);
        }
    }, [currentFirstDayOfWeek]);

    useEffect(() => {
        const validWeekendDays = currentWeekendDays.filter(
            (day) => day >= 0 && day <= 6
        );
        if (validWeekendDays.length !== currentWeekendDays.length) {
            console.warn(
                "weekendDays must contain numbers between 0-6, filtering invalid values"
            );
            setCurrentWeekendDays(validWeekendDays);
        }
    }, [currentWeekendDays]);

    useEffect(() => {
        dayjs.locale(currentLocale);
    }, [currentLocale]);

    return (
        <DatesContext.Provider
            value={{
                locale: currentLocale,
                setLocale: setCurrentLocale,
                firstDayOfWeek: currentFirstDayOfWeek,
                setFirstDayOfWeek: setCurrentFirstDayOfWeek,
                weekendDays: currentWeekendDays,
                setWeekendDays: setCurrentWeekendDays,
                consistentWeeks: currentConsistentWeeks,
                setConsistentWeeks: setCurrentConsistentWeeks
            }}
        >
            {children}
        </DatesContext.Provider>
    );
};
