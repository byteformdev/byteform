"use client";

import React, { useState, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { CodeProps, CodeTheme } from "./types";
import { useTheme } from "../_theme";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const getTheme = (theme: CodeTheme) => {
    return themes[theme] || themes.duotoneDark;
};

export const Code: React.FC<CodeProps> = ({
    children,
    language = "javascript",
    theme: themeProp = "duotoneDark",
    highlightLines = [],
    showCopyButton = true,
    showLineNumbers = true,
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

    const isLineHighlighted = (lineNumber: number) => {
        return highlightLines.includes(lineNumber);
    };

    return (
        <div
            className={cx(
                theme === "light"
                    ? "border-[var(--byteform-light-border)]"
                    : "border-[var(--byteform-dark-border)]",
                "relative rounded-lg border overflow-hidden",
                classNames?.wrapper
            )}
        >
            {title && (
                <div
                    className={cx(
                        theme === "light"
                            ? "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                            : "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                        "flex items-center justify-between px-4 py-2 border-b text-sm font-medium",
                        classNames?.title
                    )}
                >
                    {title}
                </div>
            )}

            <div className="relative">
                {showCopyButton && (
                    <button
                        onClick={handleCopy}
                        className={cx(
                            "absolute top-5 right-5 z-10 transition-all duration-200",
                            "text-[var(--byteform-dark-1)] hover:text-[var(--byteform-white)]"
                        )}
                    >
                        {copied
                            ? copiedIcon || <IconCheck className="w-4 h-4" />
                            : copyIcon || <IconCopy className="w-4 h-4" />}
                    </button>
                )}

                <div
                    className={cx(
                        "overflow-auto byteform-scrollbar max-h-96",
                        classNames?.container
                    )}
                >
                    <Highlight
                        theme={getTheme(themeProp)}
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

                            return (
                                <pre
                                    className={cx(
                                        highlightClassName,
                                        "p-4 text-sm leading-6",
                                        theme === "light"
                                            ? "bg-[var(--byteform-light-background)]"
                                            : "bg-[var(--byteform-dark-background)]",
                                        classNames?.code,
                                        className
                                    )}
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
                                                        "bg-yellow-900/30 -mx-4 px-4",
                                                    classNames?.lineNumberHighlight
                                                )}
                                            >
                                                {showLineNumbers && (
                                                    <span
                                                        className={cx(
                                                            "inline-block w-8 mr-4 text-right select-none text-xs",
                                                            theme === "light"
                                                                ? "text-[var(--byteform-light-text)]"
                                                                : "text-[var(--byteform-dark-text)]",
                                                            isHighlighted &&
                                                                "text-yellow-500 font-medium",
                                                            classNames?.lineNumber
                                                        )}
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
