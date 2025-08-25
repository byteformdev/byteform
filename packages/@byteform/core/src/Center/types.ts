import { ElementType, ReactNode } from "react";

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    inline?: boolean;
    className?: string;
    component?: ElementType;
}
