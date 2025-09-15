// src/components/ui/Card.tsx
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "outline";
}

export default function Card({
  children,
  className,
  variant = "default",
}: CardProps) {
  const baseStyles =
    "rounded-lg p-6 min-w-[40ch] shadow transition hover:shadow-lg";

  const variantStyles = clsx({
    "bg-white": variant === "default",
    "bg-yellow-50 border-l-4 border-yellow-400": variant === "highlight",
    "bg-white border border-gray-200": variant === "outline",
  });

  return (
    <div className={twMerge(baseStyles, variantStyles, className)}>
      {children}
    </div>
  );
}
