import { forwardRef } from "react";
import { CarouselSlideProps } from "./types";
import { useTheme } from "../_theme";

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
    ({ children, size, className, ...props }, ref) => {
        const { cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    "flex-none w-full h-full flex items-center justify-center",
                    className
                )}
                style={{
                    width: size
                        ? typeof size === "number"
                            ? `${size}px`
                            : size
                        : undefined
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CarouselSlide.displayName = "@byteform/core/CarouselSlide";

export { CarouselSlide };
