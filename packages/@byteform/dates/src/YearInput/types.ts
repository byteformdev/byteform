import { Placement } from "@floating-ui/react";
import { InputProps } from "../../byteform/Input/types";
import { YearPickerProps, YearPickerValue } from "../YearPicker/types";

export interface YearInputProps
    extends Omit<InputProps, "value" | "onChange" | "defaultValue"> {
    value?: YearPickerValue;
    defaultValue?: YearPickerValue;
    onChange?: (value: YearPickerValue) => void;

    allowDeselect?: boolean;
    type?: YearPickerProps["type"];
    allowSingleDateInRange?: boolean;
    minDate?: Date;
    maxDate?: Date;

    yearFormat?: string;
    decadeFormat?: string;
    displayFormat?: string;

    columnsPerRow?: number;

    position?: Placement;
    closeOnSelect?: boolean;
    clearable?: boolean;
    readOnly?: boolean;
    withAsterisk?: boolean;
}
