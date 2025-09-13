import { ComponentRadius, ComponentShadow } from "../../types";
import { PolymorphicComponent } from "../../utils";
import { ReactNode } from "react";
import { LoaderProps } from "../Loader/Loader.types";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "default" | "filled" | "outline" | "ghost";
export type ButtonAnimation = "none" | "default" | "bump" | "fade";
export type ButtonAlign = "left" | "center" | "right";

export type ButtonClassNames = {
    root?: string;
    leftSection?: string;
    rightSection?: string;
    loader?: string;
};

export type ButtonProps = {
    /** The content of the button */
    children: ReactNode;

    /**
     * The size of the button
     * @default md
     * */
    size?: ButtonSize;

    /**
     * The variant of the button
     * @default default
     * */
    variant?: ButtonVariant;

    /**
     * The radius of the button
     * @default themeSettings.defaultRadius
     * */
    radius?: ComponentRadius;

    /**
     * The shadow of the button
     * @default themeSettings.defaultShadow
     * */
    shadow?: ComponentShadow;

    /**
     * The animation of the button
     * @default default
     * */
    animation?: ButtonAnimation;

    /**
     * The align of the button
     * @default center
     * */
    align?: ButtonAlign;

    /**
     * The content of the left section
     * */
    leftSection?: ReactNode;

    /**
     * The content of the right section
     * */
    rightSection?: ReactNode;

    /**
     * The props of the Loader component
     * */
    loaderProps?: LoaderProps;

    /**
     * Determines if the button should be compact
     * @default false
     * */
    compact?: boolean;

    /**
     * Determines if the button should be disabled
     * @default false
     * */
    disabled?: boolean;

    /**
     * Determines if the button should be loading, uses loaderProps if provided
     * @default false
     * */
    loading?: boolean;

    /**
     * Determines if the button should be full width
     * @default false
     * */
    fullWidth?: boolean;

    /**
     * The class names of the button, can be used to override the default styles
     * */
    classNames?: ButtonClassNames;
};

export type ButtonComponent = PolymorphicComponent<"button", ButtonProps>;
