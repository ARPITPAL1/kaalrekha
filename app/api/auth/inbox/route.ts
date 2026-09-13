import { NextResponse } from "next/server";
import { getDevInboxLogs } from "@/lib/auth";

export async function GET() {
  const logs = getDevInboxLogs();
  return NextResponse.json({ logs });
}
