// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variantStyles = clsx({
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
      variant === "primary",
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400":
      variant === "secondary",
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500":
      variant === "success",
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
      variant === "danger",
  });

  const sizeStyles = clsx({
    "px-3 py-1 text-sm": size === "sm",
    "px-4 py-2 text-base": size === "md",
    "px-5 py-3 text-lg": size === "lg",
  });

  return (
    <button
      className={twMerge(baseStyles, variantStyles, sizeStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
}
