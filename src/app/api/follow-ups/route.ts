import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      error: "This legacy reservation follow-up endpoint has been retired.",
      replacement: "Use feedback follow-up actions under /api/feedback/follow-ups/{id}.",
    },
    { status: 410 }
  )
}