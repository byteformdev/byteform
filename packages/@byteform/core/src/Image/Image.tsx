import { forwardRef, useState, useEffect } from "react";
import { ImageFit, ImageProps, ImageRadius, ImageSize } from "./types";
import { cx } from "../_theme";

const fitClasses: Record<ImageFit, string> = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    "scale-down": "object-scale-down",
    none: "object-none"
};

const radiusClasses: Record<ImageRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
};

const sizeClasses: Record<ImageSize, string> = {
    xs: "w-16 h-16",
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
    auto: "w-auto h-auto"
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    (
        {
            src,
            alt,
            fallbackSrc,
            placeholder,
            fit = "cover",
            radius = "none",
            size = "auto",
            lazy,
            withPlaceholder = true,
            aspectRatio,
            className,
            onLoad,
            onError,
            style,
            ...props
        },
        ref
    ) => {
        const [imageState, setImageState] = useState<
            "loading" | "loaded" | "error"
        >("loading");
        const [currentSrc, setCurrentSrc] = useState(src);

        useEffect(() => {
            setImageState("loading");
            setCurrentSrc(src);
        }, [src]);

        const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
            setImageState("loaded");
            onLoad?.(e);
        };

        const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
                setCurrentSrc(fallbackSrc);
                setImageState("loading");
            } else {
                setImageState("error");
                onError?.(e);
            }
        };

        const containerStyle = {
            aspectRatio: aspectRatio ? aspectRatio.toString() : undefined,
            ...style
        };

        if (!currentSrc) {
            return <div style={containerStyle}>{placeholder}</div>;
        }

        if (imageState === "loading" && withPlaceholder && placeholder) {
            return <div style={containerStyle}>{placeholder}</div>;
        }

        if (imageState === "error") {
            return <div style={containerStyle}>{placeholder}</div>;
        }

        return (
            <img
                ref={ref}
                src={currentSrc}
                alt={alt}
                loading={lazy ? "lazy" : "eager"}
                onLoad={handleLoad}
                onError={handleError}
                style={containerStyle}
                className={cx(
                    fitClasses[fit],
                    radiusClasses[radius],
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Image.displayName = "@byteform/core/Image";
