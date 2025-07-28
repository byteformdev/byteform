import { createContext, useContext } from "react";
import { TabsContextProps } from "./types";

export const TabsContext = createContext<TabsContextProps | null>(null);

export const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs component");
    }
    return context;
};
