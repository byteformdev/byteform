import { createContext, useContext } from "react";
import { TreeViewContextProps } from "./types";

export const TreeViewContext = createContext<TreeViewContextProps | null>(null);

export const useTreeView = (): TreeViewContextProps => {
    const context = useContext(TreeViewContext);
    if (!context) {
        throw new Error("useTreeView must be used within TreeView provider");
    }
    return context;
};
