import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeSession, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    revokeSession(sessionId);
  }

  const response = NextResponse.json({ success: true, message: "Logged out from archive." });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
