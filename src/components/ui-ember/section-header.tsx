import { cn } from "@/lib/utils"

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {kicker ? (
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-primary">{kicker}</p>
      ) : null}
      <h2 className="font-display text-[36px] leading-[1.04] tracking-tight text-balance md:text-[48px]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
