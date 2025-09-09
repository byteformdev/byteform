import { useEffect, useRef, useState } from "react";
import { HueSliderProps } from "./types";
import { cx, useTheme } from "../../_theme";

export const HueSlider = ({
    value,
    onChange,
    className,
    ...rest
}: HueSliderProps) => {
    const { theme } = useTheme();
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getPosition = (clientX: number) => {
        if (!sliderRef.current) return 0;

        const rect = sliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const left = clientX - rect.left;

        let position = Math.max(0, Math.min(left, width));
        return Math.round((position / width) * 360);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        onChange(getPosition(e.clientX));
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                onChange(getPosition(e.clientX));
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
    }, [isDragging, onChange]);

    return (
        <div
            ref={sliderRef}
            className={cx("relative h-2 rounded-md cursor-pointer", className)}
            style={{
                background: `linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)`
            }}
            onMouseDown={handleMouseDown}
            tabIndex={0}
            role="slider"
        >
            <div
                className={cx(
                    "absolute rounded-full shadow-lg w-1 h-3 shadow-sm",
                    theme === "light"
                        ? "bg-[var(--byteform-black)]"
                        : "bg-[var(--byteform-white)]"
                )}
                style={{
                    left: `min(max(2px, ${
                        (value / 360) * 100
                    }%), calc(100% - 2px))`,
                    transform: "translateX(-50%)",
                    top: "50%",
                    marginTop: "-6px"
                }}
            />
        </div>
    );
};
