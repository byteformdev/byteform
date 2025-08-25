import { forwardRef, useState, useEffect } from "react";
import { IconPhoto, IconPhotoOff } from "@tabler/icons-react";
import { ImageProps } from "./types";
import { cx, useTheme } from "../_theme";
import { Loader } from "../Loader";

const fitClasses = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    "scale-down": "object-scale-down",
    none: "object-none"
};

const radiusClasses = {
    none: "rounded-none",
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
};

const sizeClasses = {
    xs: "w-16 h-16",
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
    auto: "w-auto h-auto"
};

const getClassName = (
    fit: keyof typeof fitClasses,
    radius: keyof typeof radiusClasses,
    size: keyof typeof sizeClasses,
    withHover: boolean,
    withZoom: boolean,
    className?: string
) => {
    return cx(
        "transition-all duration-200",
        fitClasses[fit],
        radiusClasses[radius],
        size !== "auto" && sizeClasses[size],
        withHover && "hover:opacity-80",
        withZoom && "hover:scale-105",
        className
    );
};

const PlaceholderIcon = ({
    size,
    theme
}: {
    size: keyof typeof sizeClasses;
    theme: string;
}) => {
    const iconSize =
        size === "xs"
            ? "w-4 h-4"
            : size === "sm"
            ? "w-6 h-6"
            : size === "md"
            ? "w-8 h-8"
            : size === "lg"
            ? "w-12 h-12"
            : "w-16 h-16";

    return (
        <div
            className={cx(
                "flex items-center justify-center",
                size !== "auto"
                    ? sizeClasses[size]
                    : "w-full h-full min-h-[100px]",
                theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-[var(--byteform-dark-text)]"
            )}
        >
            <IconPhoto className={iconSize} />
        </div>
    );
};

const ErrorIcon = ({
    size,
    theme
}: {
    size: keyof typeof sizeClasses;
    theme: string;
}) => {
    const iconSize =
        size === "xs"
            ? "w-3 h-3"
            : size === "sm"
            ? "w-4 h-4"
            : size === "md"
            ? "w-5 h-5"
            : size === "lg"
            ? "w-6 h-6"
            : "w-8 h-8";

    return (
        <div
            className={cx(
                "flex items-center justify-center",
                size !== "auto" ? sizeClasses[size] : "w-full h-full",
                theme === "light"
                    ? "text-[var(--byteform-red-2)]"
                    : "text-[var(--byteform-red-2)]"
            )}
        >
            <IconPhotoOff className={iconSize} />
        </div>
    );
};

const LoadingPlaceholder = ({ size }: { size: keyof typeof sizeClasses }) => {
    return (
        <div
            className={cx(
                "flex items-center justify-center",
                size !== "auto"
                    ? sizeClasses[size]
                    : "w-full h-full min-h-[100px]"
            )}
        >
            <Loader size={16} stroke={2} />
        </div>
    );
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
            width,
            height,
            lazy,
            withPlaceholder = true,
            onLoad,
            onError,
            className,
            withHover = false,
            withZoom = false,
            aspectRatio,
            style,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();
        const [imageState, setImageState] = useState<
            "loading" | "loaded" | "error"
        >("loading");
        const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

        useEffect(() => {
            setImageState("loading");
            setCurrentSrc(src);
        }, [src]);

        const handleLoad = () => {
            setImageState("loaded");
            onLoad?.();
        };

        const handleError = () => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
                setCurrentSrc(fallbackSrc);
                setImageState("loading");
            } else {
                setImageState("error");
                onError?.();
            }
        };

        const containerStyle = {
            width: width,
            height: height,
            aspectRatio: aspectRatio ? aspectRatio.toString() : undefined,
            ...style
        };

        if (!currentSrc) {
            if (placeholder) {
                return <div style={containerStyle}>{placeholder}</div>;
            }
            return (
                <div style={containerStyle}>
                    <PlaceholderIcon size={size} theme={theme} />
                </div>
            );
        }

        if (imageState === "loading" && withPlaceholder) {
            return (
                <div style={containerStyle} className="relative">
                    {placeholder ? (
                        <div
                            className={cx(
                                size !== "auto" && sizeClasses[size],
                                radiusClasses[radius]
                            )}
                        >
                            {placeholder}
                        </div>
                    ) : (
                        <LoadingPlaceholder size={size} />
                    )}
                    <img
                        ref={ref}
                        src={currentSrc}
                        alt={alt}
                        loading={lazy ? "lazy" : "eager"}
                        onLoad={handleLoad}
                        onError={handleError}
                        className="absolute inset-0 opacity-0 w-full h-full"
                        {...props}
                    />
                </div>
            );
        }

        if (imageState === "error") {
            return (
                <div style={containerStyle}>
                    <ErrorIcon size={size} theme={theme} />
                </div>
            );
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
                className={getClassName(
                    fit,
                    radius,
                    size,
                    withHover,
                    withZoom,
                    className
                )}
                {...props}
            />
        );
    }
);

Image.displayName = "@byteform/core/Image";
