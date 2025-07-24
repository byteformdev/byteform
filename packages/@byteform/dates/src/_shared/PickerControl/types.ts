import { ButtonHTMLAttributes } from "react";

export type PickerControlDirection = "previous" | "next";

export interface PickerControlProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    direction: PickerControlDirection;
    disabled?: boolean;
    className?: string;
}
