import { forwardRef } from "react";
import { TreeNodeContentProps } from "./types";
import { useTreeView } from "./context";
import { useTheme } from "../_theme";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import { Checkbox } from "../Checkbox";

export const TreeNodeContent = forwardRef<HTMLDivElement, TreeNodeContentProps>(
    ({ node, level, expanded, selected, hasChildren }, ref) => {
        const { theme, cx } = useTheme();
        const treeView = useTreeView();

        const handleClick = () => {
            if (node.disabled) return;

            if (treeView.clickAction === "select" && treeView.selectable) {
                treeView.onChange(node.id, node);
            } else if (treeView.clickAction === "toggle" && hasChildren) {
                treeView.onToggle(node.id, !expanded);
            }
        };

        const handleChevronClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!node.disabled && hasChildren) {
                treeView.onToggle(node.id, !expanded);
            }
        };

        const handleCheckboxChange = (checked: boolean) => {
            if (!node.disabled && treeView.selectable) {
                treeView.onChange(node.id, node);
            }
        };

        const paddingLeft = level * treeView.levelOffset + 8;

        const chevronIcon = expanded
            ? treeView.expandedIcon || <IconChevronDown size={16} />
            : treeView.collapsedIcon || <IconChevronRight size={16} />;

        const leafIcon = treeView.leafIcon || <div className="w-4 h-4" />;

        return (
            <div
                ref={ref}
                className={cx(
                    "flex items-center w-full min-h-8 py-1 px-2 cursor-pointer transition-colors duration-150 select-none",
                    theme === "light"
                        ? "text-[var(--byteform-light-text)] hover:bg-[var(--byteform-light-background-hover)]"
                        : "text-[var(--byteform-dark-text)] hover:bg-[var(--byteform-dark-background-hover)]",
                    selected &&
                        (theme === "light"
                            ? "bg-[var(--byteform-light-background)] border-l-2 border-[var(--byteform-light-border)]"
                            : "bg-[var(--byteform-dark-background)] border-l-2 border-[var(--byteform-dark-border)]"),
                    node.disabled && "opacity-60 cursor-not-allowed",
                    treeView.classNames?.nodeContent,
                    selected && treeView.classNames?.selectedNode,
                    node.disabled && treeView.classNames?.disabledNode
                )}
                style={{ paddingLeft }}
                onClick={handleClick}
                data-selected={selected || undefined}
                data-disabled={node.disabled || undefined}
            >
                {/* Chevron or leaf icon */}
                <div
                    className={cx(
                        "flex items-center justify-center w-4 h-4 mr-2 flex-shrink-0",
                        hasChildren && "cursor-pointer",
                        treeView.classNames?.nodeChevron
                    )}
                    onClick={hasChildren ? handleChevronClick : undefined}
                >
                    {hasChildren ? (
                        <div
                            className={cx("transition-transform duration-150")}
                        >
                            {chevronIcon}
                        </div>
                    ) : (
                        treeView.showLeafIcon && leafIcon
                    )}
                </div>

                {/* Checkbox */}
                {treeView.checkboxes && (
                    <div className="mr-2 flex-shrink-0">
                        <Checkbox
                            checked={selected}
                            onChange={handleCheckboxChange}
                            disabled={node.disabled}
                            size="sm"
                        />
                    </div>
                )}

                {/* Node icon */}
                {node.icon && (
                    <div
                        className={cx(
                            "flex items-center justify-center mr-2 flex-shrink-0",
                            treeView.classNames?.nodeIcon
                        )}
                    >
                        {node.icon}
                    </div>
                )}

                {/* Node label */}
                <div
                    className={cx(
                        "flex-1 truncate text-sm font-medium",
                        treeView.classNames?.nodeLabel
                    )}
                >
                    {node.label}
                </div>
            </div>
        );
    }
);

TreeNodeContent.displayName = "@byteform/core/TreeView.NodeContent";
