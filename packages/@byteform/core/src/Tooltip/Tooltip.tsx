import React, { cloneElement } from "react";
import { TooltipProps } from "./types";
import { useTheme } from "../_theme";
import { Transition } from "../Transition";
import { FloatingArrow } from "@floating-ui/react";
import { useTooltip } from "./use-tooltip";

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            children,
            label,
            position = "top",
            onPositionChange,
            offset = 6,
            disabled = false,
            opened,
            withArrow = false,
            arrowSize = 4,
            arrowRadius = 0,
            multiline = false,
            trigger = "hover",
            inline = false,
            compact = false,
            openDelay = 0,
            closeDelay = 0,
            zIndex = 1000,
            className,
            classNames,
            middlewares,
            ...others
        },
        ref
    ) => {
        const { theme, cx, settings } = useTheme();

        const tooltip = useTooltip({
            position,
            onPositionChange,
            offset,
            disabled,
            opened,
            withArrow,
            trigger,
            openDelay,
            closeDelay,
            middlewares
        });

        if (!label) {
            return <>{children}</>;
        }

        const clonedChild = cloneElement(
            React.Children.only(children) as React.ReactElement,
            {
                ref: tooltip.refs.setReference,
                ...tooltip.getReferenceProps({
                    "aria-describedby": tooltip.opened ? "tooltip" : undefined
                })
            } as any
        );

        const isCompact = compact || settings.tooltip?.compact;

        const tooltipElement = tooltip.opened && (
            <div
                style={{
                    position: "fixed",
                    zIndex,
                    pointerEvents: "none"
                }}
            >
                <Transition mounted={tooltip.opened} transition="fade">
                    <div
                        ref={(node) => {
                            tooltip.refs.setFloating(node);
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                        }}
                        role="tooltip"
                        id="tooltip"
                        className={cx(
                            "pointer-events-none rounded-md",
                            "transition-opacity duration-200",
                            tooltip.opened ? "opacity-100" : "opacity-0",
                            theme === "light"
                                ? "bg-[var(--byteform-light-background)]"
                                : "bg-[var(--byteform-dark-background)]",
                            classNames?.root
                        )}
                        style={{
                            position: tooltip.strategy,
                            top: tooltip.y ?? 0,
                            left: tooltip.x ?? 0,
                            zIndex
                        }}
                        {...tooltip.getFloatingProps(others)}
                    >
                        <div
                            className={cx(
                                "py-1 px-3 text-sm outline-none",
                                isCompact && "py-0.5 px-2 text-xs",
                                theme === "light"
                                    ? "text-[var(--byteform-light-text)]"
                                    : "text-[var(--byteform-dark-text)]",
                                multiline
                                    ? "text-left max-w-xs"
                                    : "text-center whitespace-nowrap",
                                classNames?.tooltip,
                                className
                            )}
                        >
                            {withArrow && (
                                <FloatingArrow
                                    ref={tooltip.arrowRef}
                                    context={tooltip.context}
                                    className={classNames?.arrow}
                                    fill={
                                        theme === "light"
                                            ? "var(--byteform-light-background)"
                                            : "var(--byteform-dark-background)"
                                    }
                                    width={arrowSize * 2}
                                    height={arrowSize}
                                    tipRadius={arrowRadius}
                                />
                            )}
                            <div className={classNames?.content}>{label}</div>
                        </div>
                    </div>
                </Transition>
            </div>
        );

        return (
            <div className={cx("relative", inline ? "inline" : "inline-block")}>
                {clonedChild}
                {tooltipElement}
            </div>
        );
    }
);

Tooltip.displayName = "@byteform/core/Tooltip";
