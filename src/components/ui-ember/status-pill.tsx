import { cn } from "@/lib/utils"

type Tone = "ember" | "sage" | "brick" | "neutral" | "copper"

const toneClasses: Record<Tone, string> = {
  ember: "border-primary/20 bg-primary/10 text-primary",
  sage: "border-sage/25 bg-sage/10 text-sage",
  brick: "border-brick/25 bg-brick/10 text-brick",
  copper: "border-copper/25 bg-copper/10 text-copper",
  neutral: "border-border bg-muted/60 text-muted-foreground",
}

const dotClasses: Record<Tone, string> = {
  ember: "bg-primary",
  sage: "bg-sage",
  brick: "bg-brick",
  copper: "bg-copper",
  neutral: "bg-muted-foreground/60",
}

interface StatusPillProps {
  tone?: Tone
  label: string
  dot?: boolean
  pulse?: boolean
  className?: string
}

export function StatusPill({
  tone = "neutral",
  label,
  dot = true,
  pulse = false,
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none",
        toneClasses[tone],
        className
      )}
    >
      {dot ? (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[tone], pulse && "ember-pulse-dot")} />
      ) : null}
      {label}
    </span>
  )
}
