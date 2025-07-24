import { Placement } from "@floating-ui/react";
import { InputProps } from "../../byteform/Input/types";
import { MonthPickerProps, MonthPickerValue } from "../MonthPicker/types";

export interface MonthInputProps
    extends Omit<InputProps, "value" | "onChange" | "defaultValue"> {
    value?: MonthPickerValue;
    defaultValue?: MonthPickerValue;
    onChange?: (value: MonthPickerValue) => void;

    allowDeselect?: boolean;
    type?: MonthPickerProps["type"];
    allowSingleDateInRange?: boolean;
    minDate?: Date;
    maxDate?: Date;

    monthFormat?: string;
    yearFormat?: string;
    displayFormat?: string;

    columnsPerRow?: number;

    position?: Placement;
    closeOnSelect?: boolean;
    clearable?: boolean;
    readOnly?: boolean;
    withAsterisk?: boolean;
}
