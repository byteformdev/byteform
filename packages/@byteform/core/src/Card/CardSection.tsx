import { cx, useTheme } from "../_theme";
import { CardSectionProps } from "./types";

export const CardSection = ({
    children,
    withDivider = false,
    className,
    ...props
}: CardSectionProps) => {
    const { theme } = useTheme();

    return (
        <div
            className={cx(
                "p-4",
                theme === "light"
                    ? "border-[var(--byteform-light-border)]"
                    : "border-[var(--byteform-dark-border)]",
                withDivider && "border-b",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
