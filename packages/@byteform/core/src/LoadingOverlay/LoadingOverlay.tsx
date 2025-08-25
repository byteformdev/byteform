import React from "react";
import { cx } from "../_theme";
import { Loader } from "../Loader";
import { LoadingOverlayProps } from "./types";
import { useTheme } from "@byteform/core";

export const LoadingOverlay = ({
    visible = true,
    overlayOpacity = 0.75,
    zIndex = 1000,
    classNames,
    className,
    loaderProps = {},
    transitionDuration = 200
}: LoadingOverlayProps) => {
    if (!visible) return null;
    const { theme } = useTheme();

    return (
        <div
            className={cx(
                "absolute inset-0 flex items-center justify-center",
                classNames?.wrapper,
                className
            )}
            style={{
                zIndex,
                pointerEvents: visible ? "auto" : "none"
            }}
            aria-hidden={!visible}
        >
            <div
                className={cx(
                    "absolute inset-0",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)]"
                        : "bg-[var(--byteform-dark-background)]",
                    classNames?.overlay
                )}
                style={{
                    opacity: visible ? overlayOpacity : 0,
                    transition: `opacity ${transitionDuration}ms ease`
                }}
            />
            <Loader {...loaderProps} />
        </div>
    );
};

LoadingOverlay.displayName = "@byteform/core/LoadingOverlay";
