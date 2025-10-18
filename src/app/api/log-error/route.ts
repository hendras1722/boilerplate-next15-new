import { NextResponse } from "next/server";
import { addLog } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    addLog(
      body.level || "error",
      typeof body.error === "string" ? body.error : JSON.stringify(body.error),
      body.context
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to log error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
