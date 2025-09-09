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

export type CodeLanguage =
    | "bash"
    | "c"
    | "cpp"
    | "css"
    | "diff"
    | "go"
    | "graphql"
    | "java"
    | "javascript"
    | "js"
    | "json"
    | "jsx"
    | "markdown"
    | "objectivec"
    | "python"
    | "py"
    | "reason"
    | "rust"
    | "scss"
    | "sql"
    | "tsx"
    | "typescript"
    | "ts"
    | "wasm"
    | "yaml";

export interface CodeClassNames {
    wrapper?: string;
    title?: string;
    container?: string;
    code?: string;
    lineNumber?: string;
    lineNumberHighlight?: string;
    copyButton?: string;
}

export interface CodeProps {
    children: string;
    language?: CodeLanguage;
    theme?: CodeTheme;
    highlightLines?: number[];
    showCopyButton?: boolean;
    showLineNumbers?: boolean;
    title?: string | ReactNode;
    copyIcon?: ReactNode;
    copiedIcon?: ReactNode;
    onCopy?: (code: string) => void;
    className?: string;
    classNames?: CodeClassNames;
}
