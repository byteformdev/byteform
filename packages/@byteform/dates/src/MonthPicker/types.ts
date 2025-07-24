import { PickerHeaderControlsOrder } from "../_shared";

export type MonthPickerType = "default" | "multiple" | "range";
export type MonthPickerValue = Date | Date[] | null;

export interface MonthPickerProps {
    allowDeselect?: boolean;
    type?: MonthPickerType;
    allowSingleDateInRange?: boolean;
    defaultValue?: MonthPickerValue;
    value?: MonthPickerValue;
    onChange?: (value: MonthPickerValue) => void;
    minDate?: Date;
    maxDate?: Date;
    yearFormat?: string;
    monthFormat?: string;
    columnsPerRow?: number;
    className?: string;
    disabled?: boolean;
    headerControlsOrder?: PickerHeaderControlsOrder;
    renderMonth?: (month: number, year: number) => React.ReactNode;
    onYearClick?: () => void;
}

export interface MonthPickerStylesNames {
    root: string;
    header: string;
    monthsGrid: string;
    monthButton: string;
    monthButtonSelected: string;
    monthButtonInRange: string;
    monthButtonDisabled: string;
}
