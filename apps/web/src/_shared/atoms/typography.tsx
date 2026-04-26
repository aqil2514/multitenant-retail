import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export const Heading = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "text-2xl font-semibold tracking-tight text-foreground md:text-3xl",
        className
      )}
      {...props}
    />
  )
)
Heading.displayName = "Heading"

export const Subtext = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
Subtext.displayName = "Subtext"