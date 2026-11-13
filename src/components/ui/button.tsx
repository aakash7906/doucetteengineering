import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "accent" | "success"
  size?: "default" | "sm" | "lg" | "icon" | "pill"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] cursor-pointer"

    const variants = {
      default: "bg-primary text-primary-foreground shadow-2xs hover:bg-primary-hover active:opacity-90",
      accent: "bg-warning text-warning-foreground shadow-2xs hover:opacity-95 active:opacity-90",
      secondary: "bg-muted text-foreground hover:bg-accent active:bg-border",
      outline: "border border-border bg-card text-foreground shadow-2xs hover:bg-muted hover:border-border/80 active:bg-muted/80",
      ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
      destructive: "bg-destructive text-destructive-foreground shadow-2xs hover:opacity-95 active:opacity-90",
      success: "bg-success text-success-foreground shadow-2xs hover:opacity-95 active:opacity-90"
    }

    const sizes = {
      default: "h-10 px-4 py-2 text-xs sm:text-sm",
      sm: "h-8 rounded-md px-2.5 text-xs",
      lg: "h-12 rounded-xl px-5 text-sm sm:text-base font-bold",
      pill: "h-10 rounded-full px-4 text-xs sm:text-sm",
      icon: "h-9 w-9 p-0 rounded-lg"
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
