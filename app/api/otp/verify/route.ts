import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = (body.phone || "").trim();
    const code = (body.code || "").trim();

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone number and verification code are required." }, { status: 400 });
    }

    const result = verifyOtp(phone, code);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Mobile number verified.",
      receipt: result.verificationReceipt,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
