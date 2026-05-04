import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      error: "This legacy invoice endpoint has been retired.",
      replacement: "Complete an appointment, then use /api/invoices/{id}/send.",
    },
    { status: 410 }
  )
}