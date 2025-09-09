import { MenuContextType } from "./types";
import { createSafeContext } from "../_utils/createContext";

export const [MenuProvider, useMenuContext] =
    createSafeContext<MenuContextType>("Menu was not found in the tree");
