import {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useCallback,
    RefObject
} from "react";
import { TabsProps } from "./types";
import { TabsProvider } from "./context";
import { useTheme } from "../_theme";
import { TabsList } from "./TabsList";
import { TabsTab } from "./TabsTab";
import { TabsPanel } from "./TabsPanel";

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            children,
            value,
            defaultValue,
            onChange,
            orientation = "horizontal",
            grow = false,
            allowTabDeactivation = false,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { cx } = useTheme();
        const [localValue, setLocalValue] = useState<string | null>(
            defaultValue || null
        );

        const tabRefs = useRef<Map<string, RefObject<HTMLButtonElement>>>(
            new Map()
        );

        const currentValue = value !== undefined ? value : localValue;
        const isControlled = value !== undefined;

        useEffect(() => {
            if (isControlled && value !== undefined) {
                setLocalValue(value);
            }
        }, [value, isControlled]);

        const handleChange = (newValue: string) => {
            const shouldDeactivate =
                allowTabDeactivation && currentValue === newValue;
            const finalValue = shouldDeactivate ? null : newValue;

            if (!isControlled) {
                setLocalValue(finalValue);
            }

            onChange?.(finalValue || "");
        };

        const registerTab = useCallback(
            (value: string, ref: RefObject<HTMLButtonElement>) => {
                tabRefs.current.set(value, ref);
            },
            []
        );

        const unregisterTab = useCallback((value: string) => {
            tabRefs.current.delete(value);
        }, []);

        const contextValue = {
            value: currentValue,
            onChange: handleChange,
            orientation,
            grow,
            allowTabDeactivation,
            classNames,
            registerTab,
            unregisterTab,
            tabRefs: tabRefs.current
        };

        return (
            <TabsProvider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "flex",
                        orientation === "vertical" ? "flex-row" : "flex-col",
                        classNames?.root,
                        className
                    )}
                    data-orientation={orientation}
                    {...props}
                >
                    {children}
                </div>
            </TabsProvider>
        );
    }
);

const ExtendedTabs = Object.assign(Tabs, {
    List: TabsList,
    Tab: TabsTab,
    Panel: TabsPanel
});

ExtendedTabs.displayName = "@byteform/core/Tabs";

export { ExtendedTabs as Tabs };
