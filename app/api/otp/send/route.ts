import { NextResponse } from "next/server";
import { generateAndSendOtp } from "@/lib/security";
import { checkRateLimit } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local_visitor";
    const rateCheck = checkRateLimit(`otp_send_${ip}`, 5, 60 * 1000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many OTP requests. Please wait ${rateCheck.resetInSec}s.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const phone = (body.phone || "").trim();

    if (!phone) {
      return NextResponse.json({ error: "Mobile number is required." }, { status: 400 });
    }

    const result = generateAndSendOtp(phone);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Verification code transmitted.",
      devCode: result.devCode, // available for instant testing in local environment
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
