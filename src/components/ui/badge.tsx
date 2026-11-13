import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "primary" | "success" | "warning" | "destructive"
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    secondary: "bg-muted text-muted-foreground border border-border",
    outline: "text-foreground border border-border bg-card",
    primary: "bg-primary-light text-primary border border-primary/25 font-bold",
    success: "bg-primary-light text-primary border border-primary/30 font-bold",
    warning: "bg-warning/15 text-warning-foreground border border-warning/30 font-semibold",
    destructive: "bg-destructive/10 text-destructive border border-destructive/20 font-bold",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none tracking-tight",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
