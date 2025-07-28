import { ElementType, ReactNode } from "react";

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    withBorder?: boolean;
    component?: ElementType;
    className?: string;
}
