import { forwardRef, useMemo } from "react";
import { cx } from "../_theme";
import { AnchorProps } from "./types";
import { Text } from "../Text";

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
    ({ children, underline = "hover", href, className, ...props }, ref) => {
        const isExternal = typeof href === "string" && href.startsWith("http");

        const underlineClass = useMemo(() => {
            return underline === "always"
                ? "underline"
                : underline === "hover"
                ? "hover:underline"
                : "no-underline";
        }, [underline]);

        return (
            <Text
                ref={ref}
                component="a"
                href={href}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={cx(
                    "text-[var(--byteform-primary)]",
                    underlineClass,
                    className
                )}
                {...props}
            >
                {children}
            </Text>
        );
    }
);

Anchor.displayName = "@byteform/core/Anchor";
