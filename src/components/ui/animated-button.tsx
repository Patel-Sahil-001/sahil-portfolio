import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedButtonProps {
    children: ReactNode;
    onClick?: (e?: any) => void;
    className?: string;
    href?: string;
    variant?: "default" | "outline";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    target?: string;
    rel?: string;
}

export default function AnimatedButton({
    children,
    onClick,
    className,
    href,
    variant = "default",
    type = "button",
    disabled = false,
    target,
    rel
}: AnimatedButtonProps) {
    const baseClasses = cn(
        "relative inline-flex items-center justify-center px-5 py-1.5 overflow-hidden font-medium transition-all rounded-xl group outline outline-1",
        variant === "default" && "bg-white text-black outline-white/20 hover:bg-white",
        variant === "outline" && "bg-transparent text-foreground outline-white/50 hover:bg-transparent",
        disabled && "opacity-50 cursor-not-allowed",
        className
    );

    const content = (
        <>
            <span className={cn(
                "w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0",
                variant === "default" ? "bg-black" : "bg-white",
                disabled && "opacity-50"
            )} />
            <span className={cn(
                "relative w-full text-center transition-colors duration-300 ease-in-out",
                variant === "default" ? "text-black group-hover:text-white" : "text-foreground group-hover:text-black"
            )}>
                {children}
            </span>
        </>
    );

    if (href) {
        return (
            <a href={href} target={target} rel={rel} className={baseClasses}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
            {content}
        </button>
    );
}
