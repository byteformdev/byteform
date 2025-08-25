import { ReactNode } from "react";

export interface ErrorInfo {
    componentStack: string;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export interface ErrorBoundaryProps {
    /** Content to render when no error occurs */
    children: ReactNode;
    /** Custom fallback UI to render when an error occurs */
    fallback?: (
        error: Error,
        errorInfo: ErrorInfo,
        resetError: () => void
    ) => ReactNode;
    /** Function called when an error occurs */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /** Whether to show error details in development */
    showDetails?: boolean;
    /** Custom title for the error UI */
    title?: string;
    /** Custom description for the error UI */
    description?: string;
    /** Whether to show a reset button */
    showReset?: boolean;
    /** Custom reset button text */
    resetText?: string;
    /** Additional CSS classes */
    className?: string;
}
