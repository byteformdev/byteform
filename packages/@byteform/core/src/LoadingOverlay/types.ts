import { LoaderProps } from "../Loader/types";

export interface LoadingOverlayClassNames {
    wrapper?: string;
    overlay?: string;
}

export interface LoadingOverlayProps {
    visible?: boolean;
    overlayOpacity?: number;
    zIndex?: number;
    loaderProps?: LoaderProps;
    transitionDuration?: number;
    className?: string;
    classNames?: LoadingOverlayClassNames;
}
