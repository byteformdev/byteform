import { createContext, useContext } from "react";

export function createSafeContext<ContextValue>(err: string) {
    const Context = createContext<ContextValue | null>(null);

    const useSafeContext = () => {
        const context = useContext(Context);

        if (context === null) {
            throw new Error(err);
        }

        return context;
    };

    const Provider = ({
        children,
        value
    }: {
        children: React.ReactNode;
        value: ContextValue;
    }) => <Context.Provider value={value}>{children}</Context.Provider>;

    return [Provider, useSafeContext] as const;
}
