import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { ButtonGroupProps } from "./types";
import { cx } from "../../_theme";
import { Button } from "../Button";

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
    (
        {
            children,
            size,
            variant,
            compact,
            disabled,
            fullWidth,
            direction = "horizontal",
            align = "start",
            wrap = false,
            grow = false,
            animation,
            className,
            ...others
        },
        ref
    ) => {
        const justifyClass =
            align === "center"
                ? "justify-center"
                : align === "end"
                ? "justify-end"
                : align === "between"
                ? "justify-between"
                : align === "around"
                ? "justify-around"
                : align === "evenly"
                ? "justify-evenly"
                : "justify-start";

        const dirClass = direction === "vertical" ? "flex-col" : "flex-row";

        const itemsClass =
            direction === "vertical" ? "items-stretch" : "items-center";

        const all = Children.toArray(children);
        const len = all.length;

        const enhanced = all.map((child, index) => {
            if (!isValidElement(child)) return child;
            const el = child as React.ReactElement<any>;
            const isButton =
                (el.type as any)?.displayName === "@byteform/core/Button" ||
                el.type === Button;

            let cornerClass = "";
            if (!wrap && len > 1 && isButton) {
                if (direction === "vertical") {
                    if (index === 0) cornerClass = "rounded-b-none";
                    else if (index === len - 1) cornerClass = "rounded-t-none";
                    else cornerClass = "rounded-none";
                } else {
                    if (index === 0) cornerClass = "rounded-r-none";
                    else if (index === len - 1) cornerClass = "rounded-l-none";
                    else cornerClass = "rounded-none";
                }
            }

            const nextProps: any = {
                className: cx(el.props.className, grow && "flex-1", cornerClass)
            };

            if (isButton) {
                if (size !== undefined && el.props.size === undefined) {
                    nextProps.size = size;
                }
                if (variant !== undefined && el.props.variant === undefined) {
                    nextProps.variant = variant;
                }
                if (compact !== undefined && el.props.compact === undefined) {
                    nextProps.compact = compact;
                }
                if (disabled !== undefined && el.props.disabled === undefined) {
                    nextProps.disabled = disabled;
                }

                if (
                    animation !== undefined &&
                    el.props.animation === undefined
                ) {
                    nextProps.animation = animation;
                }
            }

            return cloneElement(el, nextProps);
        });

        return (
            <div
                ref={ref}
                className={cx(
                    "flex",
                    dirClass,
                    itemsClass,
                    justifyClass,
                    wrap && "flex-wrap",
                    fullWidth && "w-full",
                    className
                )}
                {...others}
            >
                {enhanced}
            </div>
        );
    }
);

ButtonGroup.displayName = "@byteform/core/Button.Group";
