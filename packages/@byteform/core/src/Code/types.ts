import { ReactNode } from "react";

export type CodeTheme =
    | "dracula"
    | "duotoneDark"
    | "duotoneLight"
    | "github"
    | "gruvboxMaterialDark"
    | "gruvboxMaterialLight"
    | "jettwaveDark"
    | "jettwaveLight"
    | "nightOwl"
    | "nightOwlLight"
    | "oceanicNext"
    | "okaidia"
    | "oneDark"
    | "oneLight"
    | "palenight"
    | "shadesOfPurple"
    | "synthwave84"
    | "ultramin"
    | "vsDark"
    | "vsLight";

export interface CodeClassNames {
    wrapper?: string;
    title?: string;
    container?: string;
    code?: string;
    lineNumber?: string;
    lineNumberHighlight?: string;
}

export interface CodeProps {
    children: string;
    language?: string;
    theme?: CodeTheme;
    highlightLines?: number[];
    showCopyButton?: boolean;
    showLineNumbers?: boolean;
    title?: string;
    copyIcon?: ReactNode;
    copiedIcon?: ReactNode;
    onCopy?: (code: string) => void;
    className?: string;
    classNames?: CodeClassNames;
}
