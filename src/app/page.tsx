import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  CalendarRange,
  Check,
  MessageCircleHeart,
  Plug,
  ReceiptText,
  Sparkles,
  Star,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { EmberLogo } from "@/components/ui-ember/ember-logo"
import { SectionHeader } from "@/components/ui-ember/section-header"
import { StatusPill } from "@/components/ui-ember/status-pill"
import { SurfaceCard } from "@/components/ui-ember/surface-card"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export const metadata: Metadata = { title: "OpsPilot — Ember Table" }

const partners = ["OpenTable", "Toast", "Resy", "Square", "Gmail", "Twilio"]

const steps = [
  {
    n: "01",
    icon: CalendarRange,
    title: "Reservation event",
    line: "OpenTable, Resy, or direct - captured the moment it lands.",
    metric: "0s lag",
  },
  {
    n: "02",
    icon: Activity,
    title: "Service completed",
    line: "POS marks the table closed, OpsPilot picks up the thread.",
    metric: "Toast + Square",
  },
  {
    n: "03",
    icon: ReceiptText,
    title: "Invoice generated",
    line: "Itemized check, tax, tip pre-applied. Sent without a click.",
    metric: "0 manual sends",
  },
  {
    n: "04",
    icon: MessageCircleHeart,
    title: "Guest follow-up",
    line: "Thank-yous, recovery, and rebookings drafted in your tone.",
    metric: "Drafted in 4s",
  },
  {
    n: "05",
    icon: Brain,
    title: "Manager brief",
    line: "Tonight's risks, wins, and next moves in one calm summary.",
    metric: "Read in 30s",
  },
]

const connectorRows = [
  ["OpenTable", "Reservations", "connected"],
  ["Square", "Payments + tickets", "connected"],
  ["Google Reviews", "Feedback", "connected"],
  ["Gmail", "Guest comms", "attention"],
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
          <EmberLogo subtitle="Ember Table" />
          <div className="hidden items-center gap-8 text-[13px] text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#preview" className="transition-colors hover:text-foreground">
              Product
            </a>
            <a href="#integrations" className="transition-colors hover:text-foreground">
              Integrations
            </a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "sm",
                className: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
              })}
            >
              Open dashboard <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero-atmosphere relative overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1100px] px-6 pb-28 pt-20 text-center md:pb-36 md:pt-32">
          <div className="animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="ember-pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
            AI operations companion · for hospitality
          </div>

          <h1 className="animate-fade-up font-display text-[52px] leading-[0.98] tracking-tight text-balance sm:text-[72px] md:text-[88px]">
            The operations layer
            <br />
            for <span className="text-ember italic">modern hospitality</span>.
          </h1>

          <p className="animate-fade-up mx-auto mt-7 max-w-[620px] text-pretty text-[16px] leading-[1.55] text-muted-foreground md:text-[18px]">
            OpsPilot watches every reservation, ticket, inventory signal, invoice, and review - then takes
            the next action so your floor runs ahead of the night.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "lg",
                className:
                  "h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-[0_18px_50px_-18px_hsl(var(--ember)/0.6)] hover:bg-primary/90",
              })}
            >
              View live dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              href="/workflow"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "h-12 rounded-full border-border bg-card/60 px-7 backdrop-blur hover:bg-card",
              })}
            >
              See the workflow
            </Link>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-9 gap-y-3 border-t border-border/60 pt-10 text-muted-foreground/70">
            <span className="text-[10px] uppercase tracking-[0.22em]">Speaks to your stack</span>
            {partners.map((partner) => (
              <span key={partner} className="font-display text-[15px] tracking-tight">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="relative py-24 md:py-32">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1280px] px-6">
          <SectionHeader
            kicker="The flow"
            title="From the moment a guest books, OpsPilot is already moving."
            description="Five steps, zero context switching. Your team stays on the floor; the admin runs itself."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <SurfaceCard key={step.n} interactive className="h-full p-6">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground/70">{step.n}</span>
                  <step.icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 font-display text-[22px] leading-[1.1]">{step.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{step.line}</p>
                <div className="mt-6 border-t border-border pt-4 text-[10px] uppercase tracking-[0.16em] text-primary">
                  {step.metric}
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section id="preview" className="relative border-y border-border bg-gradient-to-b from-background via-card/40 to-background py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeader
            kicker="The surface"
            title="A calm, high-signal command center."
            description="Tonight's service, the AI manager brief, attention queue, inventory risk, and integration health - readable at a glance."
            align="center"
          />
          <div className="relative mt-14">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/8 blur-3xl" />
            <SurfaceCard className="overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-brick/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-copper/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sage/70" />
                  <span className="ml-3 font-mono text-[11px]">opspilot.app/dashboard</span>
                </div>
                <StatusPill tone="ember" label="Service in progress" pulse />
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3 md:p-6">
                <div className="surface-card p-6 md:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary">
                      <Sparkles className="h-3.5 w-3.5" /> AI manager brief
                    </div>
                    <span className="text-[11px] text-muted-foreground">Friday · 4:42 PM</span>
                  </div>
                  <p className="font-display text-[24px] leading-[1.2] text-balance">
                    Tonight runs <span className="text-ember">88 covers</span>. VIP table locked,
                    overdue invoices queued, and a recovery reply is ready for sign-off.
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                    {[
                      ["88", "Covers"],
                      ["14", "Seated"],
                      ["4", "Attention"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-lg border border-border bg-muted/30 p-3">
                        <p className="font-display text-[26px] leading-none">{value}</p>
                        <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-card p-6">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Attention queue</p>
                  <ul className="space-y-3 text-[13px]">
                    <li className="flex items-start gap-2.5">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brick" />
                      <span>Sofia · allergy follow-up · recovery drafted</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>Jessica · anniversary at T-15 · 7:00</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ReceiptText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-copper" />
                      <span>Marcus · tab outstanding $158.47</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </section>

      <section id="integrations" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            kicker="Integrations"
            title="One operational surface across reservations, POS, comms, and reviews."
            description="The MCP bridge normalizes external events into the same deterministic services used by the UI."
          />
          <SurfaceCard className="p-0">
            {connectorRows.map(([name, detail, status]) => (
              <div key={name} className="flex items-center justify-between border-b border-border px-5 py-4 last:border-b-0">
                <div className="flex items-center gap-3">
                  <Plug className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>
                <StatusPill tone={status === "connected" ? "sage" : "copper"} label={status} />
              </div>
            ))}
          </SurfaceCard>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row">
          <EmberLogo subtitle="Ember Table" />
          <div className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-sage" />
            Live data dashboard, workflow, feedback, finance, inventory, and integrations.
          </div>
        </div>
      </footer>
    </div>
  )
}
