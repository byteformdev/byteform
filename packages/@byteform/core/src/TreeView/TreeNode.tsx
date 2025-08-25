import { forwardRef } from "react";
import { TreeNodeProps } from "./types";
import { useTreeView } from "./context";
import { useTheme } from "../_theme";
import { TreeNodeContent } from "./TreeNodeContent";

export const TreeNode = forwardRef<HTMLDivElement, TreeNodeProps>(
    ({ node, level }, ref) => {
        const { cx } = useTheme();
        const treeView = useTreeView();

        const hasChildren = node.children && node.children.length > 0;
        const expanded = treeView.expandedNodes.has(node.id);

        const selected = Array.isArray(treeView.value)
            ? treeView.value.includes(node.id)
            : treeView.value === node.id;

        return (
            <div
                ref={ref}
                className={cx("tree-node", treeView.classNames?.node)}
                data-node-id={node.id}
                data-level={level}
            >
                <TreeNodeContent
                    node={node}
                    level={level}
                    expanded={expanded}
                    selected={selected}
                    hasChildren={!!hasChildren}
                />

                {hasChildren && expanded && (
                    <div
                        className={cx(
                            "tree-node-children",
                            treeView.classNames?.nodeChildren
                        )}
                    >
                        {node.children!.map((childNode) => (
                            <TreeNode
                                key={childNode.id}
                                node={childNode}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

TreeNode.displayName = "@byteform/core/TreeView.Node";
