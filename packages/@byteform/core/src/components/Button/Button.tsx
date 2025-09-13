import {
    PolymorphicComponentPropsWithRef,
    useComponentId,
    useProps
} from "../../utils";
import { ButtonProps } from "./Button.types";
import {
    getAnimation,
    getDisabled,
    getSize,
    getVariant,
    getAlign
} from "./Button.styles";
import { useMemo } from "react";
import { useTheme } from "../../theme";
import { Loader } from "../Loader/Loader";

const defaultButtonProps = {
    size: "md",
    variant: "default",
    radius: "default",
    shadow: "default",
    animation: "default",
    align: "center"
} satisfies Partial<ButtonProps>;

function Button<C extends React.ElementType = "button">(
    inputProps: PolymorphicComponentPropsWithRef<C, ButtonProps>
) {
    const {
        as,
        children,
        size,
        variant,
        radius,
        shadow,
        animation,
        align,
        loaderProps,
        disabled,
        loading,
        fullWidth,
        compact,
        leftSection,
        rightSection,
        className,
        classNames,
        ref,
        ...props
    } = useProps("Button", defaultButtonProps, inputProps);
    const { getRadius, getShadow, cx } = useTheme();

    const sizeClass = useMemo(() => getSize(size, compact), [size, compact]);
    const variantClass = useMemo(
        () => getVariant(variant, disabled || loading),
        [variant, disabled, loading]
    );
    const radiusClass = useMemo(() => getRadius(radius), [radius]);
    const shadowClass = useMemo(() => getShadow(shadow), [shadow]);
    const animationClass = useMemo(
        () => getAnimation(animation, disabled || loading),
        [animation, disabled, loading]
    );
    const disabledClass = useMemo(
        () => getDisabled(disabled || loading),
        [disabled, loading]
    );
    const alignClass = useMemo(() => getAlign(align), [align]);

    const Component = as || "button";
    const id = useComponentId(props.id);

    return (
        <Component
            className={cx(
                "transition-colors duration-200 inline-flex items-center gap-2",
                fullWidth && "w-full",
                sizeClass,
                variantClass,
                radiusClass,
                shadowClass,
                animationClass,
                disabledClass,
                alignClass,
                className,
                classNames?.root
            )}
            ref={ref}
            id={id}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            {...props}
        >
            {(loading ? (
                <span
                    className={cx(
                        "flex items-center justify-center",
                        classNames?.leftSection
                    )}
                >
                    <Loader
                        size={20}
                        stroke={2}
                        {...loaderProps}
                        className={classNames?.loader}
                    />
                </span>
            ) : (
                leftSection
            )) && (
                <span
                    className={cx(
                        "flex items-center justify-center",
                        classNames?.leftSection
                    )}
                >
                    {leftSection}
                </span>
            )}
            {children}
            {rightSection && (
                <span
                    className={cx(
                        "flex items-center justify-center",
                        classNames?.rightSection
                    )}
                >
                    {rightSection}
                </span>
            )}
        </Component>
    );
}

Button.displayName = "@byteform/core/Button";

export { Button };
