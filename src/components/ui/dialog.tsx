"use client"

import * as React from "react"

// ── Minimal accessible dialog built on the native <dialog> element ──

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Dialog({ open, onClose, children }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) el.showModal()
    else el.close()
  }, [open])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: Event) => {
      if ((e as MouseEvent).target === el) onClose()
    }
    el.addEventListener("click", handler)
    return () => el.removeEventListener("click", handler)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      className="surface-card w-full max-w-md p-0 text-card-foreground backdrop:bg-black/50 open:animate-in open:fade-in open:zoom-in-95"
    >
      {children}
    </dialog>
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b px-6 py-4">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold">{children}</h2>
}

export function DialogBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4">{children}</div>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2 border-t px-6 py-4">{children}</div>
}
