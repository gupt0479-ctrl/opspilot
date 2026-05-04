import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface SurfaceCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
  padded?: boolean
  interactive?: boolean
}

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(
  ({ className, glow, padded = true, interactive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "surface-card",
        padded && "p-6 md:p-7",
        glow && "ember-glow",
        interactive && "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

SurfaceCard.displayName = "SurfaceCard"
