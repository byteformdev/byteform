import { ReactNode } from "react";

export type TableVariant = "default" | "vertical";
export type CaptionSide = "top" | "bottom";

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
    stickyHeader?: boolean;
    striped?: boolean;
    highlightOnHover?: boolean;
    withTableBorder?: boolean;
    withColumnBorders?: boolean;
    withRowBorders?: boolean;
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
    striped?: boolean;
    highlightOnHover?: boolean;
    withColumnBorders?: boolean;
    withRowBorders?: boolean;
    variant?: TableVariant;
    classNames?: TableClassNames;
}
