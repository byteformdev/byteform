import { forwardRef } from "react";
import { CarouselIndicatorsProps } from "./types";
import { useTheme } from "../_theme";

const CarouselIndicators = forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
    ({ total, active, onIndicatorClick, className, ...props }, ref) => {
        const { theme, cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    "absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 rounded-md p-2 w-fit mx-auto",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)]"
                        : "bg-[var(--byteform-dark-background)]",
                    className
                )}
                {...props}
            >
                {Array.from({ length: total }, (_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={cx(
                            "w-2 h-2 rounded-full transition-all duration-200 cursor-pointer border-0 outline-none",
                            "hover:scale-110 active:scale-95",
                            index === active
                                ? "bg-[var(--byteform-primary)]"
                                : theme === "light"
                                ? "bg-[var(--byteform-light-background-hover)] hover:bg-[var(--byteform-primary)]"
                                : "bg-[var(--byteform-dark-background-hover)] hover:bg-[var(--byteform-primary)]"
                        )}
                        onClick={() => onIndicatorClick?.(index)}
                    />
                ))}
            </div>
        );
    }
);

CarouselIndicators.displayName = "@byteform/core/CarouselIndicators";

export { CarouselIndicators };
