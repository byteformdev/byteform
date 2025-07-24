import { PickerHeaderControlsOrder } from "../_shared";

export type YearPickerType = "default" | "multiple" | "range";
export type YearPickerValue = Date | Date[] | null;

export interface YearPickerProps {
    allowDeselect?: boolean;
    type?: YearPickerType;
    allowSingleDateInRange?: boolean;
    defaultValue?: YearPickerValue;
    value?: YearPickerValue;
    onChange?: (value: YearPickerValue) => void;
    minDate?: Date;
    maxDate?: Date;
    yearFormat?: string;
    decadeFormat?: string;
    columnsPerRow?: number;
    className?: string;
    disabled?: boolean;
    headerControlsOrder?: PickerHeaderControlsOrder;
    renderYear?: (year: number) => React.ReactNode;
}

export interface YearPickerStylesNames {
    root: string;
    header: string;
    yearsGrid: string;
    yearButton: string;
    yearButtonSelected: string;
    yearButtonInRange: string;
    yearButtonDisabled: string;
}
