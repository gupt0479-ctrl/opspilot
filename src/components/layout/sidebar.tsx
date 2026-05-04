"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GitBranch,
  MessageSquare,
  Plug,
  FileText,
  Package,
  CalendarDays,
  DollarSign,
  Truck,
  Sparkles,
} from "lucide-react"
import { EmberLogo, EmberMark } from "@/components/ui-ember/ember-logo"
import { cn } from "@/lib/utils"

const coreItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflow", label: "Workflow", icon: GitBranch },
  { href: "/appointments", label: "Reservations", icon: CalendarDays },
]

const opsItems = [
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/finance", label: "Finance", icon: DollarSign },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/shipments", label: "Shipments", icon: Truck },
]

/** Phase 3: MCP bridge + feedback must stay visible in IA (PRD §4.3, §12.1). */
const supportItems = [
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/integrations", label: "Integrations", icon: Plug },
]

function NavGroup({
  label,
  items,
  collapsed = false,
}: {
  label: string
  items: typeof coreItems
  collapsed?: boolean
}) {
  const pathname = usePathname()

  function navClass(href: string) {
    const active = pathname === href || pathname.startsWith(`${href}/`)
    return cn(
      "relative flex h-9 items-center gap-2.5 rounded-lg px-3 text-[13px] transition-colors",
      active
        ? "bg-primary/10 font-medium text-primary before:absolute before:bottom-1.5 before:left-0 before:top-1.5 before:w-0.5 before:rounded-full before:bg-primary"
        : "text-sidebar-foreground/75 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
    )
  }

  return (
    <div className="px-2">
      {!collapsed ? (
        <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-sidebar-foreground/45">
          {label}
        </p>
      ) : null}
      <div className="space-y-0.5">
        {items.map(({ href, label: itemLabel, icon: Icon }) => (
          <Link key={href} href={href} className={navClass(href)}>
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            {!collapsed ? <span>{itemLabel}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-[236px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex items-center gap-2 border-b border-sidebar-border/60 px-4 py-5">
        <EmberLogo subtitle="Ember Table" />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto py-4">
        <NavGroup label="Core" items={coreItems} />
        <NavGroup label="Operations" items={opsItems} />
        <NavGroup label="Guest care" items={supportItems} />
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3">
        <div className="flex items-center gap-2 text-[11px] text-sidebar-foreground/85">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium">AI service is on</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-sidebar-foreground/55">
          Watching reservations, tickets, and guest signals in real time.
        </p>
      </div>
    </aside>
  )
}

export function MobileBrand() {
  return (
    <Link href="/" className="flex items-center gap-2 md:hidden">
      <EmberMark />
      <span className="font-display text-lg font-semibold">OpsPilot</span>
    </Link>
  )
}
