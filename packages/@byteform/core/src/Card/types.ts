import { ReactNode } from "react";

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    withDivider?: boolean;
    className?: string;
}
