import { ElementType, ReactNode } from "react";

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    inline?: boolean;
    component?: ElementType;
    absolute?: boolean;
    className?: string;
}
