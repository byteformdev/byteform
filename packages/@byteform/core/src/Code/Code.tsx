"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { CodeProps, CodeTheme } from "./types";
import { useTheme } from "../_theme";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const getTheme = (theme: CodeTheme) => {
    return themes[theme] || themes.duotoneDark;
};

export const Code: React.FC<CodeProps> = ({
    children,
    language = "ts",
    theme: themeProp = "oneDark",
    highlightLines = [],
    showCopyButton = true,
    showLineNumbers,
    title,
    copyIcon,
    copiedIcon,
    onCopy,
    className,
    classNames
}) => {
    const { theme, cx } = useTheme();

    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            onCopy?.(children);

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    }, [children, onCopy]);

    const isLineHighlighted = useCallback(
        (lineNumber: number) => {
            return highlightLines.includes(lineNumber);
        },
        [highlightLines]
    );

    const highlightTheme = useMemo(() => getTheme(themeProp), [themeProp]);

    const wrapperClassName = useMemo(
        () =>
            cx(
                theme === "light"
                    ? "border-[var(--byteform-light-border)]"
                    : "border-[var(--byteform-dark-border)]",
                "relative group rounded-md border overflow-hidden",
                classNames?.wrapper
            ),
        [theme, cx, classNames?.wrapper]
    );

    const titleClassName = useMemo(
        () =>
            cx(
                theme === "light"
                    ? "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                    : "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                "flex items-center justify-between px-4 py-2 border-b text-sm font-medium",
                classNames?.title
            ),
        [theme, cx, classNames?.title]
    );

    const copyButtonClassName = useMemo(
        () =>
            cx(
                "absolute top-4 right-4 z-10 transition-all duration-200 opacity-0 group-hover:opacity-100",
                theme === "light"
                    ? "text-[var(--byteform-light-text)] hover:text-[var(--byteform-dark-5)]"
                    : "text-[var(--byteform-dark-1)] hover:text-[var(--byteform-light-1)]",
                classNames?.copyButton
            ),
        [cx, theme, classNames?.copyButton]
    );

    const containerClassName = useMemo(
        () =>
            cx(
                "overflow-auto byteform-scrollbar max-h-96",
                theme === "light"
                    ? "bg-[var(--byteform-light-background)]"
                    : "bg-[var(--byteform-dark-background)]",
                classNames?.container
            ),
        [theme, cx, classNames?.container]
    );

    return (
        <div className={wrapperClassName}>
            {title && <div className={titleClassName}>{title}</div>}

            <div className="relative">
                {showCopyButton && (
                    <button
                        onClick={handleCopy}
                        className={copyButtonClassName}
                    >
                        {copied
                            ? copiedIcon || <IconCheck className="w-4 h-4" />
                            : copyIcon || <IconCopy className="w-4 h-4" />}
                    </button>
                )}

                <div className={containerClassName}>
                    <Highlight
                        theme={highlightTheme}
                        code={children.trim()}
                        language={language}
                    >
                        {({
                            className: highlightClassName,
                            style,
                            tokens,
                            getLineProps,
                            getTokenProps
                        }) => {
                            const {
                                backgroundColor,
                                background,
                                ...cleanStyle
                            } = style;

                            const preClassName = useMemo(
                                () =>
                                    cx(
                                        highlightClassName,
                                        "p-4 text-sm leading-6 min-w-full",
                                        classNames?.code,
                                        className
                                    ),
                                [
                                    cx,
                                    highlightClassName,
                                    classNames?.code,
                                    className
                                ]
                            );

                            const lineNumberClassName = useMemo(
                                () =>
                                    cx(
                                        "inline-block mr-4 text-right select-none text-xs",
                                        theme === "light"
                                            ? "text-[var(--byteform-light-text)]"
                                            : "text-[var(--byteform-dark-text)]",
                                        classNames?.lineNumber
                                    ),
                                [cx, theme, classNames?.lineNumber]
                            );

                            const highlightedLineNumberClassName = useMemo(
                                () =>
                                    cx(
                                        lineNumberClassName,
                                        "text-blue-500 font-medium"
                                    ),
                                [cx, lineNumberClassName]
                            );

                            return (
                                <pre
                                    className={preClassName}
                                    style={cleanStyle}
                                >
                                    {tokens.map((line, i) => {
                                        const lineNumber = i + 1;
                                        const isHighlighted =
                                            isLineHighlighted(lineNumber);
                                        const lineProps = getLineProps({
                                            line
                                        });

                                        return (
                                            <div
                                                key={i}
                                                {...lineProps}
                                                className={cx(
                                                    lineProps.className,
                                                    "flex items-center",
                                                    isHighlighted &&
                                                        "bg-blue-900/30 -mx-4 px-4",
                                                    classNames?.lineNumberHighlight
                                                )}
                                            >
                                                {showLineNumbers && (
                                                    <span
                                                        className={
                                                            isHighlighted
                                                                ? highlightedLineNumberClassName
                                                                : lineNumberClassName
                                                        }
                                                    >
                                                        {lineNumber}
                                                    </span>
                                                )}

                                                <span className="flex-1">
                                                    {line.map((token, key) => (
                                                        <span
                                                            key={key}
                                                            {...getTokenProps({
                                                                token
                                                            })}
                                                        />
                                                    ))}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </pre>
                            );
                        }}
                    </Highlight>
                </div>
            </div>
        </div>
    );
};

export default memo(Code);
