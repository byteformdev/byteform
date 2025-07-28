import { Placement } from "@floating-ui/react";
import { InputProps } from "@byteform/core";
import { DatePickerProps, DatePickerValue } from "../DatePicker/types";

export interface DateInputProps
    extends Omit<InputProps, "value" | "onChange" | "defaultValue"> {
    value?: DatePickerValue;
    defaultValue?: DatePickerValue;
    onChange?: (value: DatePickerValue) => void;

    allowDeselect?: boolean;
    type?: DatePickerProps["type"];
    allowSingleDateInRange?: boolean;
    hideOutsideDates?: boolean;
    showWeekNumbers?: boolean;
    hideWeekdays?: boolean;
    renderDay?: DatePickerProps["renderDay"];
    minDate?: Date;
    maxDate?: Date;
    excludeDate?: (date: Date) => boolean;

    dateFormat?: string;
    monthFormat?: string;
    yearFormat?: string;
    dayFormat?: string;

    position?: Placement;
    closeOnSelect?: boolean;
    clearable?: boolean;
    readOnly?: boolean;
    withAsterisk?: boolean;
}
