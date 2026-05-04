"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/") {
    return <>{children}</>
  }

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1400px] p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
