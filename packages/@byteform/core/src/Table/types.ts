import { ReactNode } from "react";

export type TableVariant = "default" | "vertical";
export type CaptionSide = "top" | "bottom";
export type TableSpacing = "xs" | "sm" | "md" | "lg" | "xl";

export interface TableClassNames {
    root?: string;
    thead?: string;
    tbody?: string;
    tfoot?: string;
    tr?: string;
    th?: string;
    td?: string;
    caption?: string;
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    children: ReactNode;

    // Main visual features
    stickyHeader?: boolean;
    striped?: boolean;
    highlightOnHover?: boolean;

    // Border controls
    withTableBorder?: boolean;
    withColumnBorders?: boolean;
    withRowBorders?: boolean;

    // Spacing controls (new feature)
    verticalSpacing?: TableSpacing;
    horizontalSpacing?: TableSpacing;

    // Other props
    variant?: TableVariant;
    className?: string;
    classNames?: TableClassNames;
}

export interface TableTrProps
    extends React.HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    className?: string;
}

export interface TableTdProps
    extends React.HTMLAttributes<HTMLTableCellElement> {
    children: ReactNode;
    className?: string;
}

export interface TableThProps
    extends React.HTMLAttributes<HTMLTableCellElement> {
    children: ReactNode;
    className?: string;
}

export interface TableTheadProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
    className?: string;
}

export interface TableTbodyProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
    className?: string;
}

export interface TableTfootProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
    className?: string;
}

export interface TableCaptionProps
    extends React.HTMLAttributes<HTMLTableCaptionElement> {
    children: ReactNode;
    captionSide?: CaptionSide;
    className?: string;
}

export interface TableContextValue {
    // Visual features
    striped: boolean;
    highlightOnHover: boolean;

    // Border controls
    withColumnBorders: boolean;
    withRowBorders: boolean;

    // Spacing
    verticalSpacing: TableSpacing;
    horizontalSpacing: TableSpacing;

    // Other
    variant: TableVariant;
    classNames?: TableClassNames;
}
