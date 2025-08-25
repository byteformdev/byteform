import { ReactNode } from "react";

export interface TreeNode {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    children?: TreeNode[];
    disabled?: boolean;
    data?: any;
}

export interface TreeViewClassNames {
    wrapper?: string;
    node?: string;
    nodeContent?: string;
    nodeLabel?: string;
    nodeIcon?: string;
    nodeChevron?: string;
    nodeChildren?: string;
    selectedNode?: string;
    disabledNode?: string;
}

export interface TreeViewProps {
    data: TreeNode[];
    value?: string | string[];
    defaultValue?: string | string[];
    onChange?: (value: string | string[], node: TreeNode) => void;
    onNodeToggle?: (nodeId: string, expanded: boolean) => void;
    multiple?: boolean;
    defaultExpandedAll?: boolean;
    defaultExpanded?: string[];
    expandedIcon?: ReactNode;
    collapsedIcon?: ReactNode;
    leafIcon?: ReactNode;
    showLeafIcon?: boolean;
    selectable?: boolean;
    clickAction?: "select" | "toggle";
    className?: string;
    classNames?: TreeViewClassNames;
    checkboxes?: boolean;
    levelOffset?: number;
}

export interface TreeViewContextProps {
    value: string | string[];
    onChange: (nodeId: string, node: TreeNode) => void;
    onToggle: (nodeId: string, expanded: boolean) => void;
    expandedNodes: Set<string>;
    multiple: boolean;
    expandedIcon?: ReactNode;
    collapsedIcon?: ReactNode;
    leafIcon?: ReactNode;
    showLeafIcon: boolean;
    selectable: boolean;
    clickAction: "select" | "toggle";
    classNames?: TreeViewClassNames;
    checkboxes: boolean;
    levelOffset: number;
}

export interface TreeNodeProps {
    node: TreeNode;
    level: number;
}

export interface TreeNodeContentProps {
    node: TreeNode;
    level: number;
    expanded: boolean;
    selected: boolean;
    hasChildren: boolean;
}
