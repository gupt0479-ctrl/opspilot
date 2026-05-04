import { cn } from "@/lib/utils"

export function MiniLineChart({
  data,
  labels,
  height = 120,
  highlight = "last",
  className,
  ariaLabel = "Trend chart",
}: {
  data: number[]
  labels?: string[]
  height?: number
  highlight?: "last" | "max" | "none"
  className?: string
  ariaLabel?: string
}) {
  const width = 600
  const padX = 8
  const padY = 14
  const min = data.length ? Math.min(...data) : 0
  const max = data.length ? Math.max(...data) : 1
  const range = max - min || 1
  const stepX = (width - padX * 2) / Math.max(data.length - 1, 1)
  const points = data.map((value, index) => ({
    x: padX + index * stepX,
    y: padY + (1 - (value - min) / range) * (height - padY * 2),
  }))
  const path = points
    .map((point, index, arr) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      const previous = arr[index - 1]
      const cx = (previous.x + point.x) / 2
      return `C ${cx} ${previous.y}, ${cx} ${point.y}, ${point.x} ${point.y}`
    })
    .join(" ")
  const areaPath = points.length
    ? `${path} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`
    : ""
  const maxIndex = data.reduce((best, value, index) => (value > data[best] ? index : best), 0)
  const highlightIndex = highlight === "last" ? points.length - 1 : highlight === "max" ? maxIndex : -1

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{ width: "100%", height }}
    >
      <defs>
        <linearGradient id="mini-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#mini-area)" />
      <path d={path} fill="none" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      {highlightIndex >= 0 && points[highlightIndex] ? (
        <>
          <circle cx={points[highlightIndex].x} cy={points[highlightIndex].y} r="6" fill="var(--primary)" opacity="0.15" />
          <circle cx={points[highlightIndex].x} cy={points[highlightIndex].y} r="2.5" fill="var(--primary)" />
        </>
      ) : null}
      {labels ? (
        <g fill="var(--muted-foreground)" fontFamily="Avenir Next, sans-serif">
          <text x={padX} y={height - 2} fontSize="9">
            {labels[0]}
          </text>
          <text x={width - padX} y={height - 2} fontSize="9" textAnchor="end">
            {labels[labels.length - 1]}
          </text>
        </g>
      ) : null}
    </svg>
  )
}

export function SentimentBars({
  positive,
  neutral,
  negative,
  className,
}: {
  positive: number
  neutral: number
  negative: number
  className?: string
}) {
  const total = positive + neutral + negative || 1
  const segments = [
    { value: positive, color: "hsl(var(--sage))", label: "Positive" },
    { value: neutral, color: "var(--muted-foreground)", label: "Neutral" },
    { value: negative, color: "hsl(var(--brick))", label: "Negative" },
  ]

  return (
    <div className={className}>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/60">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="h-full transition-all"
            style={{ width: `${(segment.value / total) * 100}%`, backgroundColor: segment.color }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: segment.color }} />
            <span>{segment.label}</span>
            <span className="font-medium text-foreground/80">{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BarSeries({
  data,
  height = 110,
  highlightLast = true,
  className,
}: {
  data: { label: string; value: number }[]
  height?: number
  highlightLast?: boolean
  className?: string
}) {
  const max = Math.max(...data.map((item) => item.value), 1)

  return (
    <div className={cn("flex items-end justify-between gap-1.5", className)} style={{ height }}>
      {data.map((item, index) => {
        const barHeight = (item.value / max) * (height - 18)
        const isLast = index === data.length - 1 && highlightLast
        return (
          <div key={item.label} className="group flex flex-1 flex-col items-center gap-1.5">
            <div
              className="w-full rounded-md transition-all"
              style={{
                height: `${barHeight}px`,
                background: isLast
                  ? "linear-gradient(180deg, var(--primary) 0%, hsl(var(--copper)) 100%)"
                  : "color-mix(in srgb, var(--muted-foreground) 18%, transparent)",
              }}
            />
            <span className={cn("font-mono text-[9px]", isLast ? "text-primary" : "text-muted-foreground/70")}>
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
