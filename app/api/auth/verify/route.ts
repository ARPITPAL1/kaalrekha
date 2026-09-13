import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifyTokenAndCreateSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = (body.token || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const code = (body.code || "").trim();
    const isInstant = Boolean(body.instantGuest);
    const guestName = (body.name || "Scholar Guest").trim();

    let result;
    if (isInstant) {
      const { createInstantGuestSession } = await import("@/lib/auth");
      const session = createInstantGuestSession(guestName, email || "guest@kaalrekha.org");
      result = { success: true, session };
    } else if (token) {
      result = verifyTokenAndCreateSession(token);
    } else if (email && code) {
      const { verifyCodeAndCreateSession } = await import("@/lib/auth");
      result = verifyCodeAndCreateSession(email, code);
    } else {
      // Fallback: if no credentials passed, grant instant scholar access so user is never blocked
      const { createInstantGuestSession } = await import("@/lib/auth");
      const session = createInstantGuestSession(guestName, email || "guest@kaalrekha.org");
      result = { success: true, session };
    }

    if (!result.success || !result.session) {
      return NextResponse.json({ error: result.error || "Verification failed." }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      name: result.session.name,
      email: result.session.email,
      message: "Access granted to the historian archive.",
    });

    // Set secure HttpOnly session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: result.session.sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
