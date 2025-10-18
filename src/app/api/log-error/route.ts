// app/api/log-error/route.ts
import { NextResponse } from "next/server";
import { logError } from "@/lib/logger";

/*
*
* How to use
* this is using fetch throw to message error and body context and error
*
* fetch("/api/log-error", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    context: "Fetch JSONPlaceholder",
    error: err.message,
  }),
});
*
*/

export async function POST(req: Request) {
  try {
    const body = await req.json();
    logError(body.error, body.context);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to log error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
