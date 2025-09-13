import { cx } from "../../utils";
import { LoaderProps } from "./Loader.types";
import React from "react";

function Loader({
    size = 40,
    color = "var(--byteform-primary)",
    speed = 1,
    stroke = 3,
    strokeLength = 0.6,
    bgOpacity = 0.2,
    className
}: LoaderProps) {
    const radius = Math.max(0, size / 2 - stroke / 2);
    const circumference = 2 * Math.PI * radius;
    const dashArray = `${circumference * strokeLength} ${circumference}`;
    const viewBoxSize = size;
    const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;

    const commonStyle: React.CSSProperties = {
        "--loader-speed": `${speed}s`
    } as React.CSSProperties;

    return (
        <div
            className={cx(
                "inline-flex items-center justify-center flex-shrink-0",
                className
            )}
        >
            <svg
                className="byteform-loader-spin"
                viewBox={viewBox}
                width={size}
                height={size}
                style={commonStyle}
            >
                <circle
                    cx={viewBoxSize / 2}
                    cy={viewBoxSize / 2}
                    r={radius}
                    strokeWidth={stroke}
                    fill="none"
                    className="transition-colors duration-500 ease-in-out"
                    style={{
                        stroke: color,
                        opacity: bgOpacity
                    }}
                />
                <circle
                    cx={viewBoxSize / 2}
                    cy={viewBoxSize / 2}
                    r={radius}
                    strokeWidth={stroke}
                    strokeDasharray={dashArray}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-colors duration-500 ease-in-out"
                    style={{ stroke: color }}
                />
            </svg>
        </div>
    );
}

export { Loader };
