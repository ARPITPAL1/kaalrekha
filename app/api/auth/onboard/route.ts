import { NextResponse } from "next/server";
import { createPendingVerification } from "@/lib/auth";
import { checkRateLimit, isValidEmail, sanitizeInput } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local_visitor";
    const rateCheck = checkRateLimit(`onboard_${ip}`, 5, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many entrance requests. Please wait ${rateCheck.resetInSec}s before retrying.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitizeInput(body.name || "");
    const email = (body.email || "").trim().toLowerCase();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please provide a valid name (at least 2 characters)." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid academic or personal email address." }, { status: 400 });
    }

    const { token, verifyUrl } = createPendingVerification(name, email);

    return NextResponse.json({
      success: true,
      message: "An invitation to enter the archive has been sent to your email.",
      email,
      name,
      // Dev helper for immediate testing in local development
      devVerifyUrl: verifyUrl,
      devToken: token,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
