import { useTheme } from "../_theme";
import { useMenuContext } from "./context";
import { MenuLabelProps } from "./types";

const getPosition = (position: MenuLabelProps["position"]) => {
    switch (position) {
        case "right":
            return "text-right";
        case "center":
            return "text-center";
        default:
            return "text-left";
    }
};

export const MenuLabel = ({
    children,
    className,
    position = "left"
}: MenuLabelProps) => {
    const { theme, cx } = useTheme();
    const { classNames } = useMenuContext();

    return (
        <div
            className={cx(
                "text-xs font-semibold px-3 pt-2 outline-none",
                theme === "light"
                    ? "text-[var(--byteform-light-hint)]"
                    : "text-[var(--byteform-dark-hint)]",
                getPosition(position),
                className,
                classNames?.label
            )}
        >
            {children}
        </div>
    );
};

MenuLabel.displayName = "@byteform/core/Menu.Label";
