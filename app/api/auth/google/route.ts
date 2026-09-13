import { NextResponse } from "next/server";
import {
  verifyGoogleIdToken,
  findOrCreateGoogleUser,
  createGoogleSession,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idToken = body?.credential || body?.idToken || body?.token;

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { error: "Google ID token credential is required." },
        { status: 400 }
      );
    }

    // Securely verify Google ID Token on the backend
    const verification = await verifyGoogleIdToken(idToken);

    if (!verification.success || !verification.user) {
      return NextResponse.json(
        { error: verification.error || "Invalid or unverified Google token." },
        { status: 401 }
      );
    }

    // 1. Locate existing account or automatically create new account keyed by Google 'sub'
    const userAccount = findOrCreateGoogleUser(verification.user);

    // 2. Create authenticated visitor session
    const session = createGoogleSession(userAccount);

    // 3. Craft response and set secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully with Google.",
      user: {
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        picture: userAccount.picture,
        googleSub: userAccount.googleSub,
        role: session.role,
        authProvider: "google",
      },
    });

    // Set HTTP-only, secure, SameSite session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: session.sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days session
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal authentication error";
    console.error("[Google Auth API Route Error]:", errorMessage);
    return NextResponse.json(
      { error: "Authentication failed. Please try signing in again." },
      { status: 500 }
    );
  }
}
