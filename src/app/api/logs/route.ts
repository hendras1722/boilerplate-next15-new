// app/api/logs/route.ts
import { NextResponse } from "next/server";
import { getLogs } from "@/lib/logger";

export async function GET() {
  return NextResponse.json(getLogs());
}
