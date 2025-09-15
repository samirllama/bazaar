// src/components/ui/Button.tsx

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref
  ) => {
    // Base styles for all buttons - slightly tweaked for better focus rings
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-semibold tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 disabled:opacity-50";

    // All variant styles have been modernized
    const variantStyles = {
      primary:
        "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg focus-visible:ring-purple-500",
      secondary:
        "border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 focus-visible:ring-neutral-500",
      success:
        "bg-green-500/10 text-green-700 hover:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/20 focus-visible:ring-green-500",
      danger:
        "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/20 focus-visible:ring-red-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
