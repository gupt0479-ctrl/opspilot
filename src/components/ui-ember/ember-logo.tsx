import { cn } from "@/lib/utils"

export function EmberMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-6 w-6", className)} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ember-grad" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="hsl(36 100% 78%)" />
          <stop offset="55%" stopColor="hsl(30 90% 58%)" />
          <stop offset="100%" stopColor="hsl(18 70% 38%)" />
        </radialGradient>
      </defs>
      <path
        d="M16 3c2.5 4 6.5 6.6 6.5 11.5 0 2.4-1.1 4.4-2.7 5.6.6-1.4.5-3-.4-4.4-1 2.3-3 3.6-3 6.1 0 1.1.5 2 1.4 2.6-3.6.4-7-1.9-7.7-5.4-.5-2.5.4-4.7 1.9-6.4-.3 1.4 0 2.7.9 3.6.5-3.4 1.4-6 3.1-13.6Z"
        fill="url(#ember-grad)"
      />
    </svg>
  )
}

export function EmberLogo({ className, subtitle }: { className?: string; subtitle?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <EmberMark />
      <div className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">OpsPilot</span>
        {subtitle ? (
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  )
}
