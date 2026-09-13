import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSession } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = validateSession(sessionId);

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      name: session.name,
      email: session.email,
      picture: session.picture,
      googleSub: session.googleSub,
      authProvider: session.authProvider || "email",
      role: session.role || "USER",
      isAdmin: Boolean(session.isAdmin || session.role === "ADMIN"),
      verifiedAt: session.verifiedAt,
    },
  });
}
