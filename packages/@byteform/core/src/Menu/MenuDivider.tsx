import React from "react";
import { useTheme } from "../_theme";
import { MenuDividerProps } from "./types";
import { useMenu } from "./context";

export const MenuDivider = ({ className }: MenuDividerProps) => {
    const { theme, cx } = useTheme();
    const { classNames } = useMenu();

    return (
        <div
            className={cx(
                "my-2 h-px outline-none",
                theme === "light"
                    ? "bg-[var(--byteform-light-border)]"
                    : "bg-[var(--byteform-dark-border)]",
                className,
                classNames?.divider
            )}
            role="separator"
        />
    );
};

MenuDivider.displayName = "@byteform/core/Menu.Divider";
