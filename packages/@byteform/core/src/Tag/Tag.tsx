import { forwardRef } from "react";
import { TagProps, TagSize } from "./types";
import { useTheme } from "../_theme";
import { IconX } from "@tabler/icons-react";

const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2 py-0.5",
    lg: "text-base px-2 py-0.5",
    xl: "text-lg px-2.5 py-1"
};

const getSize = (size: TagSize) => {
    return sizeClasses[size];
};

export const Tag = forwardRef<HTMLDivElement, TagProps>(
    (
        {
            children,
            size = "md",
            withRemoveButton = false,
            removeButton,
            disabled = false,
            onRemove,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onRemove?.(e);
        };

        const renderRemoveButton = () => {
            if (removeButton) return removeButton;

            return (
                <button
                    type="button"
                    onClick={handleRemove}
                    disabled={disabled}
                    className={classNames?.removeButton}
                >
                    <IconX size={14} />
                </button>
            );
        };

        return (
            <div
                className={cx(
                    "flex items-center border w-fit rounded-md",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                        : "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                    getSize(size),
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.wrapper,
                    className
                )}
                {...props}
            >
                <span className={classNames?.label}>{children}</span>

                {withRemoveButton && (
                    <div className="ml-1 flex items-center justify-center cursor-pointer text-[var(--byteform-dark-1)] hover:text-[var(--byteform-white)] transition-colors duration-200">
                        {renderRemoveButton()}
                    </div>
                )}
            </div>
        );
    }
);

Tag.displayName = "@byteform/core/Tag";
