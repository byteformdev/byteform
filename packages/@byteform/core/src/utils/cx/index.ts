import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cx = (...classes: Parameters<typeof clsx>) =>
    twMerge(clsx(...classes));
