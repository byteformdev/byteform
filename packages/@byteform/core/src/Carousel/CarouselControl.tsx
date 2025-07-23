import { forwardRef } from "react";
import { CarouselControlProps } from "./types";
import { IconButton } from "../IconButton";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const CarouselControl = forwardRef<HTMLButtonElement, CarouselControlProps>(
    ({ direction, disabled = false, size = 32, className, ...props }, ref) => {
        const iconSize = Math.round(size * 0.6);

        return (
            <IconButton
                ref={ref}
                variant="filled"
                size="md"
                disabled={disabled}
                className={className}
                style={{
                    width: size,
                    height: size,
                    minWidth: size,
                    minHeight: size
                }}
                {...props}
            >
                {direction === "prev" ? (
                    <IconChevronLeft size={iconSize} />
                ) : (
                    <IconChevronRight size={iconSize} />
                )}
            </IconButton>
        );
    }
);

CarouselControl.displayName = "@byteform/core/CarouselControl";

export { CarouselControl };
