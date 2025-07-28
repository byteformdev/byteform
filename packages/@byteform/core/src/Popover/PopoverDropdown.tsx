import { forwardRef } from "react";
import { PopoverDropdownProps } from "./types";
import { usePopover } from "./context";
import { useTheme } from "../_theme";
import { Transition } from "../Transition";
import { FloatingArrow, FloatingFocusManager } from "@floating-ui/react";

export const PopoverDropdown = forwardRef<HTMLDivElement, PopoverDropdownProps>(
    ({ children, className, style, ...others }, ref) => {
        const ctx = usePopover();
        const { theme, cx } = useTheme();

        return (
            <div
                style={{
                    position: "fixed",
                    zIndex: ctx.zIndex
                }}
            >
                <Transition mounted={ctx.opened} transition="fade">
                    {(transitionStyles) => (
                        <FloatingFocusManager
                            context={ctx.context}
                            modal={false}
                            disabled={!ctx.trapFocus || !ctx.opened}
                            returnFocus
                        >
                            <div
                                ref={(node) => {
                                    ctx.refs.setFloating(node);
                                    if (typeof ref === "function") {
                                        ref(node);
                                    } else if (ref) {
                                        ref.current = node;
                                    }
                                }}
                                id={ctx.dropdownId}
                                role="dialog"
                                aria-labelledby={ctx.targetId}
                                className={cx(
                                    "rounded-md border shadow-lg w-auto",
                                    "transition-opacity duration-200",
                                    ctx.opened ? "opacity-100" : "opacity-0",
                                    theme === "light"
                                        ? "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                                        : "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                                    ctx.classNames?.dropdown,
                                    className
                                )}
                                style={{
                                    ...ctx.floatingStyles,
                                    ...style,
                                    ...transitionStyles,
                                    zIndex: ctx.zIndex
                                }}
                                {...ctx.getFloatingProps(others)}
                            >
                                <div className="p-2 relative">
                                    {ctx.withArrow && (
                                        <FloatingArrow
                                            ref={ctx.arrowRef}
                                            context={ctx.context}
                                            className={ctx.classNames?.arrow}
                                            fill={
                                                theme === "light"
                                                    ? "var(--byteform-light-background)"
                                                    : "var(--byteform-dark-background)"
                                            }
                                            stroke={
                                                theme === "light"
                                                    ? "var(--byteform-light-border)"
                                                    : "var(--byteform-dark-border)"
                                            }
                                            strokeWidth={1}
                                            width={ctx.arrowSize! * 2}
                                            height={ctx.arrowSize}
                                            tipRadius={ctx.arrowRadius}
                                        />
                                    )}
                                    {children}
                                </div>
                            </div>
                        </FloatingFocusManager>
                    )}
                </Transition>
            </div>
        );
    }
);

PopoverDropdown.displayName = "@byteform/core/Popover.Dropdown";
