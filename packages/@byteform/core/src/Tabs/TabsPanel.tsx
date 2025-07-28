import { forwardRef } from "react";
import { TabsPanelProps } from "./types";
import { useTabs } from "./context";
import { useTheme } from "../_theme";

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
    ({ children, value, className, ...props }, ref) => {
        const { value: activeValue, classNames } = useTabs();
        const { cx } = useTheme();

        const isActive = activeValue === value;

        if (!isActive) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`tab-${value}`}
                className={cx(
                    "flex-1 p-4 outline-none focus:outline-none",
                    classNames?.panel,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

TabsPanel.displayName = "@byteform/core/Tabs.Panel";
