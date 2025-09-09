import { forwardRef } from "react";
import { HoverCardDropdownProps } from "./types";
import { useHoverCard } from "./context";
import { useTheme } from "../_theme";
import { Transition } from "../Transition";
import { FloatingArrow } from "@floating-ui/react";

export const HoverCardDropdown = forwardRef<
    HTMLDivElement,
    HoverCardDropdownProps
>(({ children, className, style, ...others }, ref) => {
    const ctx = useHoverCard();
    const { theme, cx } = useTheme();

    return (
        <div
            style={{
                position: "fixed",
                zIndex: ctx.zIndex
            }}
        >
            <Transition mounted={ctx.opened} transition="fade">
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
                        "relative rounded-md border shadow-md p-1 transition-opacity duration-200",
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
                        zIndex: ctx.zIndex
                    }}
                    {...ctx.getFloatingProps(others)}
                >
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
            </Transition>
        </div>
    );
});

HoverCardDropdown.displayName = "@byteform/core/HoverCard.Dropdown";
