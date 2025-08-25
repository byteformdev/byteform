import { forwardRef, useEffect, useState, useCallback } from "react";
import { TreeViewProps, TreeNode as TreeNodeType } from "./types";
import { useTheme } from "../_theme";
import { TreeViewContext } from "./context";
import { TreeNode } from "./TreeNode";

const collectAllNodeIds = (nodes: TreeNodeType[]): string[] => {
    const ids: string[] = [];
    const traverse = (nodeList: TreeNodeType[]) => {
        nodeList.forEach((node) => {
            ids.push(node.id);
            if (node.children) {
                traverse(node.children);
            }
        });
    };
    traverse(nodes);
    return ids;
};

const findNodeById = (
    nodes: TreeNodeType[],
    nodeId: string
): TreeNodeType | null => {
    for (const node of nodes) {
        if (node.id === nodeId) {
            return node;
        }
        if (node.children) {
            const found = findNodeById(node.children, nodeId);
            if (found) return found;
        }
    }
    return null;
};

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
    (
        {
            data,
            value,
            defaultValue,
            onChange,
            onNodeToggle,
            multiple = false,
            defaultExpandedAll = false,
            defaultExpanded = [],
            expandedIcon,
            collapsedIcon,
            leafIcon,
            showLeafIcon = false,
            selectable = true,
            clickAction = "select",
            className,
            classNames,
            checkboxes = false,
            levelOffset = 20
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [localValue, setLocalValue] = useState<string | string[]>(() => {
            if (value !== undefined) return value;
            if (defaultValue !== undefined) return defaultValue;
            return multiple ? [] : "";
        });

        const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
            if (defaultExpandedAll) {
                return new Set(collectAllNodeIds(data));
            }
            return new Set(defaultExpanded);
        });

        const currentValue = value !== undefined ? value : localValue;

        useEffect(() => {
            if (value !== undefined) {
                setLocalValue(value);
            }
        }, [value]);

        const handleSelectionChange = useCallback(
            (nodeId: string, node: TreeNodeType) => {
                let newValue: string | string[];

                if (multiple) {
                    const currentArray = Array.isArray(currentValue)
                        ? currentValue
                        : [];
                    if (currentArray.includes(nodeId)) {
                        newValue = currentArray.filter((id) => id !== nodeId);
                    } else {
                        newValue = [...currentArray, nodeId];
                    }
                } else {
                    newValue = currentValue === nodeId ? "" : nodeId;
                }

                if (value === undefined) {
                    setLocalValue(newValue);
                }

                onChange?.(newValue, node);
            },
            [currentValue, multiple, value, onChange]
        );

        const handleToggle = useCallback(
            (nodeId: string, expanded: boolean) => {
                setExpandedNodes((prev) => {
                    const newSet = new Set(prev);
                    if (expanded) {
                        newSet.add(nodeId);
                    } else {
                        newSet.delete(nodeId);
                    }
                    return newSet;
                });
                onNodeToggle?.(nodeId, expanded);
            },
            [onNodeToggle]
        );

        const contextValue = {
            value: currentValue,
            onChange: handleSelectionChange,
            onToggle: handleToggle,
            expandedNodes,
            multiple,
            expandedIcon,
            collapsedIcon,
            leafIcon,
            showLeafIcon,
            selectable,
            clickAction,
            classNames,
            checkboxes,
            levelOffset
        };

        return (
            <TreeViewContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "tree-view rounded-md overflow-hidden",
                        theme === "light"
                            ? "text-[var(--byteform-light-text)] border border-[var(--byteform-light-border)]"
                            : "text-[var(--byteform-dark-text)] border border-[var(--byteform-dark-border)]",
                        classNames?.wrapper,
                        className
                    )}
                    role="tree"
                    aria-multiselectable={multiple}
                >
                    {data.map((node) => (
                        <TreeNode key={node.id} node={node} level={0} />
                    ))}
                </div>
            </TreeViewContext.Provider>
        );
    }
);

const ExtendedTreeView = Object.assign(TreeView, {
    Node: TreeNode
});

ExtendedTreeView.displayName = "@byteform/core/TreeView";

export { ExtendedTreeView as TreeView };
