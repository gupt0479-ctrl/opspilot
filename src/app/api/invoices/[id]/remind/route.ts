import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient, DEMO_ORG_ID } from "@/lib/db/supabase-server"
import { generateReminder } from "@/lib/ai/generate-reminder"
import { recordInvoiceReminderSent } from "@/lib/services/invoices"
import { isSupabaseConfigured } from "@/lib/env"

type ReminderBody = {
  followUpType?: "overdue" | "paid"
  invoiceFallback?: {
    total?: number
    amount?: number
    due_at?: string
    dueDate?: string
    reminder_count?: number
    reminderCount?: number
    number?: string
    customer?: { name?: string }
    guest?: string
    status?: string
  }
}

type ReminderFacts = {
  customerName: string
  totalDue: number
  dueAt: string
  reminderCount: number
  invoiceNumber: string
  status: string
  source: "db" | "fallback"
}

function fallbackToFacts(id: string, fallback: ReminderBody["invoiceFallback"]): ReminderFacts | null {
  if (!fallback) return null

  return {
    customerName:   fallback.customer?.name ?? fallback.guest ?? "Guest",
    totalDue:       Number(fallback.total ?? fallback.amount ?? 0),
    dueAt:          fallback.due_at ?? fallback.dueDate ?? new Date().toISOString(),
    reminderCount:  Number(fallback.reminder_count ?? fallback.reminderCount ?? 0),
    invoiceNumber:  fallback.number ?? id,
    status:         fallback.status ?? "pending",
    source:         "fallback",
  }
}

async function getLedgerInvoiceFacts(id: string): Promise<ReminderFacts | null> {
  const client = createServerSupabaseClient()
  const { data, error } = await client
    .from("invoices")
    .select("id, invoice_number, total_amount, due_at, reminder_count, status, customers ( full_name )")
    .eq("id", id)
    .eq("organization_id", DEMO_ORG_ID)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  const customer = Array.isArray(data.customers) ? data.customers[0] : data.customers

  return {
    customerName:  customer?.full_name ?? "Guest",
    totalDue:      Number(data.total_amount ?? 0),
    dueAt:         data.due_at as string,
    reminderCount: Number(data.reminder_count ?? 0),
    invoiceNumber: (data.invoice_number as string) ?? id,
    status:        (data.status as string) ?? "pending",
    source:        "db",
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  let body: ReminderBody = {}
  try {
    body = await req.json()
  } catch {
    // no body is fine
  }

  const facts =
    (isSupabaseConfigured() ? await getLedgerInvoiceFacts(id) : null) ??
    fallbackToFacts(id, body.invoiceFallback)
  if (!facts) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 })
  }

  // ── Paid thank-you path ────────────────────────────────────────────────────
  if (body.followUpType === "paid") {
    const thankYou = await generateReminder(facts, "paid")
    return NextResponse.json({
      subject:          thankYou.subject,
      message:          thankYou.message,
      reminder_number: 0,
      customer_name:    facts.customerName,
      invoice_total:    facts.totalDue,
      follow_up_type:   "paid",
    })
  }

  // ── Payment reminder path (overdue / pending) ─────────────────────────────

  // Guard: don't send payment reminders on already-paid invoices
  if (facts.status === "paid") {
    return NextResponse.json({ error: "Invoice already paid." }, { status: 400 })
  }

  const reminder = await generateReminder(facts)
  const reminderNumber =
    facts.source === "db"
      ? await recordInvoiceReminderSent(createServerSupabaseClient(), id, DEMO_ORG_ID)
      : reminder.reminder_number

  return NextResponse.json({
    subject:          reminder.subject,
    message:          reminder.message,
    reminder_number:  reminderNumber,
    customer_name:    facts.customerName,
    invoice_total:    facts.totalDue,
    follow_up_type:   "overdue",
  })
}
