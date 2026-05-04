"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { StatusPill } from "@/components/ui-ember/status-pill"
import { MobileBrand } from "./sidebar"

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/workflow": "Workflow",
  "/appointments": "Reservations",
  "/invoices": "Invoices",
  "/finance": "Finance",
  "/inventory": "Inventory",
  "/shipments": "Shipments",
  "/feedback": "Feedback & recovery",
  "/integrations": "Integrations",
}

export function Header() {
  const pathname = usePathname()
  const crumb = breadcrumbMap[pathname] ?? ""

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileBrand />
        <div className="hidden items-center gap-2 text-[13px] sm:flex">
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Ember Table
          </Link>
          <span className="text-border">/</span>
          <span className="font-medium text-foreground">{crumb}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden w-64 items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground lg:flex">
          <Search className="h-3.5 w-3.5" />
          <span>Search guests, invoices, inventory...</span>
          <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </div>
        <StatusPill tone="ember" label="Service in progress" pulse className="hidden sm:inline-flex" />
        <ThemeToggle />
        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            5
          </span>
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
            SC
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-xs font-medium text-foreground">Sarah Chen</p>
            <p className="text-[10px] text-muted-foreground">Manager</p>
          </div>
        </div>
        <Link href="/" className="hidden text-xs text-muted-foreground transition-colors hover:text-foreground xl:inline">
          Exit demo
        </Link>
      </div>
    </header>
  )
}
