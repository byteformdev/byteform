import { ReactNode } from "react";
import { useTheme } from "../_theme";
import { useModalContext } from "./context";
import { IconButton } from "../IconButton";
import { IconX } from "@tabler/icons-react";

export const ModalTitle = ({ children }: { children: ReactNode }) => {
    const { theme, cx } = useTheme();

    const { classNames, canClose, onClose, withCloseButton } =
        useModalContext();

    return (
        <div
            className={cx(
                "flex items-center justify-between mb-2",
                theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-[var(--byteform-dark-text)]",
                classNames?.titleWrapper
            )}
        >
            <p className={cx("text-sm", classNames?.title)}>{children}</p>
            {withCloseButton && canClose && (
                <IconButton
                    onClick={() => {
                        if (!canClose) return;
                        onClose?.();
                    }}
                    variant="ghost"
                    size="sm"
                    className={classNames?.closeButton}
                >
                    <IconX className="w-4 h-4" />
                </IconButton>
            )}
        </div>
    );
};

ModalTitle.displayName = "@byteform/core/Modal.Title";
