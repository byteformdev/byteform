import { PickerHeaderControlsOrder } from "../_shared";

export type DatePickerType = "default" | "multiple" | "range";
export type DatePickerValue = Date | Date[] | null;

export interface DatePickerProps {
    allowDeselect?: boolean;
    type?: DatePickerType;
    allowSingleDateInRange?: boolean;
    defaultValue?: DatePickerValue;
    value?: DatePickerValue;
    onChange?: (value: DatePickerValue) => void;
    hideOutsideDates?: boolean;
    showWeekNumbers?: boolean;
    hideWeekdays?: boolean;
    renderDay?: (date: Date) => React.ReactNode;
    minDate?: Date;
    maxDate?: Date;
    headerControlsOrder?: PickerHeaderControlsOrder;
    excludeDate?: (date: Date) => boolean;
    className?: string;
    disabled?: boolean;
    monthFormat?: string;
    yearFormat?: string;
    dayFormat?: string;
}

export interface DatePickerStylesNames {
    root: string;
    header: string;
    weekdays: string;
    weekday: string;
    weekNumber: string;
    daysGrid: string;
    dayButton: string;
    dayButtonSelected: string;
    dayButtonInRange: string;
    dayButtonDisabled: string;
    dayButtonOutside: string;
    dayButtonWeekend: string;
}
