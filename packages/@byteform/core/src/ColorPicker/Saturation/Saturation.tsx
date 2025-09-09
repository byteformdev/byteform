import { useEffect, useRef, useState } from "react";
import { SaturationProps } from "./types";
import { getPosition } from "./get-position";
import { cx, useTheme } from "../../_theme";

export const Saturation = ({
    value,
    onChange,
    className,
    ...rest
}: SaturationProps) => {
    const { theme } = useTheme();
    const saturationRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);

        const { s, v } = getPosition(e.clientX, e.clientY, saturationRef);
        onChange({ ...value, s, v });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const { s, v } = getPosition(
                    e.clientX,
                    e.clientY,
                    saturationRef
                );
                onChange({ ...value, s, v });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, onChange, value]);

    const background = `hsl(${value.h}, 100%, 50%)`;

    return (
        <div
            ref={saturationRef}
            className={cx(
                "relative h-36 cursor-pointer touch-none rounded-md overflow-hidden",
                className
            )}
            style={{ background }}
            onMouseDown={handleMouseDown}
            tabIndex={0}
            role="region"
            {...rest}
        >
            <div
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{
                    background: `linear-gradient(to right, #fff, rgba(255, 255, 255, 0))`
                }}
            />
            <div
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{
                    background: `linear-gradient(to top, #000, rgba(0, 0, 0, 0))`
                }}
            />
            <div
                className={cx(
                    "absolute w-2 h-2 ring-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg",
                    theme === "light"
                        ? "ring-[var(--byteform-black)]"
                        : "ring-[var(--byteform-white)]"
                )}
                style={{
                    left: `${value.s * 100}%`,
                    top: `${(1 - value.v) * 100}%`
                }}
            />
        </div>
    );
};
