import React from "react";
import "./Loader.css";
import { LoaderProps } from "./types";
import { cx } from "../_theme";

export const Loader = ({
    size = 40,
    color = "var(--byteform-primary)",
    speed = 1,
    stroke = 4,
    strokeLength = 0.25,
    bgOpacity = 0.2,
    variant = "spinner",
    className
}: LoaderProps) => {
    const radius = Math.max(0, size / 2 - stroke / 2);
    const dashArray = `${strokeLength * 100} ${100 - strokeLength * 100}`;
    const viewBoxSize = size;
    const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;

    const commonStyle: React.CSSProperties = {
        "--speed": `${speed}s`
    } as React.CSSProperties;

    const renderSpinner = () => (
        <svg
            className="loader-svg"
            viewBox={viewBox}
            width={size}
            height={size}
            style={commonStyle}
        >
            <circle
                className="loader-track"
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={radius}
                strokeWidth={stroke}
                style={{ stroke: color, opacity: bgOpacity }}
            />
            <circle
                className="loader-circle"
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={radius}
                strokeWidth={stroke}
                strokeDasharray={dashArray}
                strokeLinecap="round"
                style={{ stroke: color }}
            />
        </svg>
    );

    const renderDots = () => (
        <div className="loader-dots" style={commonStyle}>
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="loader-dot"
                    style={{
                        backgroundColor: color,
                        width: size / 5,
                        height: size / 5,
                        animationDelay: `${i * 0.15}s`
                    }}
                />
            ))}
        </div>
    );

    const renderPulse = () => (
        <div
            className="loader-pulse"
            style={{
                ...commonStyle,
                width: size / 2,
                height: size / 2,
                backgroundColor: color
            }}
        />
    );

    const renderBars = () => (
        <div className="loader-bars" style={commonStyle}>
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="loader-bar"
                    style={{
                        backgroundColor: color,
                        width: size / 8,
                        height: size / 2,
                        animationDelay: `${i * 0.15}s`
                    }}
                />
            ))}
        </div>
    );

    const variants = {
        spinner: renderSpinner,
        dots: renderDots,
        pulse: renderPulse,
        bars: renderBars
    };

    return (
        <div
            className={cx("loader-container", className)}
            style={{ width: size, height: size }}
            role="status"
            aria-busy="true"
        >
            {variants[variant]?.()}
        </div>
    );
};

Loader.displayName = "@byteform/core/Loader";
