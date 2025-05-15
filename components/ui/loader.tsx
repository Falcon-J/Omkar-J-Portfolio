"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
}

export function Loader({
  size = "md",
  variant = "default",
  className,
  ...props
}: LoaderProps) {
  // Size mappings
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  // Variant mappings
  const variantMap = {
    default: "border-foreground/20 border-t-foreground",
    primary: "border-primary/20 border-t-primary",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizeMap[size],
        variantMap[variant],
        className
      )}
      {...props}
      aria-label="Loading"
      role="status"
    />
  );
}

// A component that centers the loader with optional text
export function LoadingSpinner({
  text,
  size = "md",
  variant = "default",
  className,
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <Loader size={size} variant={variant} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
