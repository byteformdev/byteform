import { ModalContextValue } from "./types";
import { createSafeContext } from "../_utils/createContext";

export const [ModalProvider, useModalContext] =
    createSafeContext<ModalContextValue>("Modal was not found in the tree");
