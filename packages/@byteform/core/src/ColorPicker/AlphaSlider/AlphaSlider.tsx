import { useEffect, useState } from "react";
import { useRef } from "react";
import { AlphaSliderProps } from "./types";
import { cx, useTheme } from "../../_theme";

export const AlphaSlider = ({
    value,
    onChange,
    color,
    className,
    ...rest
}: AlphaSliderProps) => {
    const { theme } = useTheme();
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getPosition = (clientX: number) => {
        if (!sliderRef.current) return 0;

        const rect = sliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const left = clientX - rect.left;

        let position = Math.max(0, Math.min(left, width));
        return parseFloat((position / width).toFixed(2));
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
            className={cx(
                "relative h-2 rounded-md cursor-pointer",
                theme === "light"
                    ? "color-transparency-grid-light"
                    : "color-transparency-grid-dark",
                className
            )}
            style={{
                backgroundSize: "4px 4px",
                backgroundPosition: "0 0, 6px 6px"
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                className="absolute inset-0 rounded-md"
                style={{
                    background: `linear-gradient(to right, transparent, ${color})`
                }}
            />
            <div
                className={cx(
                    "absolute rounded-full shadow-lg w-1 h-3 shadow-sm",
                    theme === "light"
                        ? "bg-[var(--byteform-black)]"
                        : "bg-[var(--byteform-white)]"
                )}
                style={{
                    left: `min(max(2px, ${value * 100}%), calc(100% - 2px))`,
                    transform: "translateX(-50%)",
                    top: "50%",
                    marginTop: "-6px"
                }}
            />
        </div>
    );
};
