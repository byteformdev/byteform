import { ReactNode } from "react";

export type TagSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface TagClassNames {
    wrapper?: string;
    label?: string;
    removeButton?: string;
}

export interface TagProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
    children: ReactNode;
    size?: TagSize;
    withRemoveButton?: boolean;
    removeButton?: ReactNode;
    disabled?: boolean;
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    classNames?: TagClassNames;
}
