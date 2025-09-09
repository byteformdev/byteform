import { TabsContextProps } from "./types";
import { createSafeContext } from "../_utils/createContext";

export const [TabsProvider, useTabsContext] =
    createSafeContext<TabsContextProps>(
        "Tabs component was not found in the tree"
    );
