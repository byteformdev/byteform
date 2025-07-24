export interface DatesProviderProps {
    children: React.ReactNode;
    locale?: string;
    firstDayOfWeek?: number;
    weekendDays?: number[];
    consistentWeeks?: boolean;
}

export interface DatesContextType {
    locale: string;
    setLocale: (locale: string) => void;
    firstDayOfWeek: number;
    setFirstDayOfWeek: (day: number) => void;
    weekendDays: number[];
    setWeekendDays: (days: number[]) => void;
    consistentWeeks: boolean;
    setConsistentWeeks: (consistent: boolean) => void;
}
