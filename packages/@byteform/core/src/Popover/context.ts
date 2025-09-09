import { PopoverContextType } from "./types";
import { createSafeContext } from "../_utils/createContext";

export const [PopoverProvider, usePopoverContext] =
    createSafeContext<PopoverContextType>("Popover was not found in the tree");
