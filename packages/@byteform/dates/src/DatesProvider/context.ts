import { createContext, useContext } from "react";
import { DatesContextType } from "./types";

export const DatesContext = createContext<DatesContextType>({
    locale: "en",
    setLocale: () => {},
    firstDayOfWeek: 1,
    setFirstDayOfWeek: () => {},
    weekendDays: [0, 6],
    setWeekendDays: () => {},
    consistentWeeks: false,
    setConsistentWeeks: () => {}
});

export const useDates = () => {
    const context = useContext(DatesContext);

    if (!context) {
        throw new Error("useDates must be used within a DatesProvider");
    }

    return context;
};
