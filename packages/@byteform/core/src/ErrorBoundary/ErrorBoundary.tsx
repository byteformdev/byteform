import React, { Component, ReactNode } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState, ErrorInfo } from "./types";
import { Button } from "../Button";
import { Paper } from "../Paper";
import { Text } from "../Text";
import { Code } from "../Code";
import { IconAlertTriangle } from "@tabler/icons-react";
import { cx } from "../_theme";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        });

        this.props.onError?.(error, errorInfo);
    }

    resetError = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined
        });
    };

    renderFallbackUI = (): ReactNode => {
        const { error, errorInfo } = this.state;
        const {
            fallback,
            title = "Something went wrong",
            description = "An unexpected error occurred. Please try again.",
            showDetails = process.env.NODE_ENV === "development",
            showReset = true,
            resetText = "Try again",
            className
        } = this.props;

        if (!error || !errorInfo) return null;

        if (fallback) {
            return fallback(error, errorInfo, this.resetError);
        }

        return (
            <Paper
                withBorder
                className={cx("w-full mx-auto text-center", className)}
            >
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <IconAlertTriangle size={24} className="text-red-600" />
                    </div>

                    <Text
                        size="xl"
                        weight={600}
                        className="text-red-600 dark:text-red-400"
                    >
                        {title}
                    </Text>

                    <Text
                        size="md"
                        className="text-gray-600 dark:text-gray-400"
                    >
                        {description}
                    </Text>

                    {showDetails && (
                        <div className="text-left space-y-3">
                            <Text
                                size="sm"
                                weight={500}
                                className="text-red-600 dark:text-red-400"
                            >
                                Error Details:
                            </Text>
                            <Code>{error.toString()}</Code>
                            {errorInfo.componentStack && (
                                <>
                                    <Text
                                        size="sm"
                                        weight={500}
                                        className="text-red-600 dark:text-red-400"
                                    >
                                        Component Stack:
                                    </Text>
                                    <Code>{errorInfo.componentStack}</Code>
                                </>
                            )}
                        </div>
                    )}

                    {showReset && (
                        <div className="flex justify-center pt-2">
                            <Button
                                onClick={this.resetError}
                                variant="outline"
                                className="border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-700 dark:text-red-400 dark:hover:bg-red-900/10"
                            >
                                {resetText}
                            </Button>
                        </div>
                    )}
                </div>
            </Paper>
        );
    };

    render() {
        if (this.state.hasError) {
            return this.renderFallbackUI();
        }

        return this.props.children;
    }
}

export { ErrorBoundary };
