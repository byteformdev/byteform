import { ReactNode, HTMLAttributes, RefObject } from "react";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsPlacement = "top" | "bottom" | "left" | "right";

export interface TabsClassNames {
    root?: string;
    list?: string;
    tab?: string;
    tabInner?: string;
    tabLabel?: string;
    tabSection?: string;
    panel?: string;
    indicator?: string;
}

export interface TabsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    children: ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    orientation?: TabsOrientation;
    grow?: boolean;
    allowTabDeactivation?: boolean;
    className?: string;
    classNames?: TabsClassNames;
}

export interface TabsContextProps {
    value: string | null;
    onChange: (value: string) => void;
    orientation: TabsOrientation;
    grow: boolean;
    allowTabDeactivation: boolean;
    classNames?: TabsClassNames;
    registerTab: (value: string, ref: RefObject<HTMLButtonElement>) => void;
    unregisterTab: (value: string) => void;
    tabRefs: Map<string, RefObject<HTMLButtonElement>>;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

export interface TabsTabProps
    extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange"> {
    children: ReactNode;
    value: string;
    disabled?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    className?: string;
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    value: string;
    className?: string;
}
