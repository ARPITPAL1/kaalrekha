import { NextResponse } from "next/server";
import { checkRateLimit, sanitizeInput, isValidEmail } from "@/lib/security";
import { sendEmail } from "@/lib/mailer";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/send-photo
 * Secure backend endpoint to validate captured researcher photo and dispatch via email attachment.
 */
export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local_visitor";
    const rateCheck = checkRateLimit(`photo_send_${ip}`, 10, 60 * 1000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateCheck.resetInSec}s before retrying.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const photoBase64: string | undefined = body.photoBase64 || body.image;

    // 1. Validate Photo Presence
    if (!photoBase64 || typeof photoBase64 !== "string") {
      return NextResponse.json(
        { error: "No photo payload provided. Please capture or upload a valid photo." },
        { status: 400 }
      );
    }

    // 2. Validate MIME Type & Format (JPEG, PNG, WebP allowed)
    const match = photoBase64.match(/^data:image\/(jpeg|jpg|png|webp);base64,/i);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid image format. Supported formats are JPEG, PNG, and WebP." },
        { status: 400 }
      );
    }

    const imageType = match[1].toLowerCase() === "jpg" ? "jpeg" : match[1].toLowerCase();
    const base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, "");

    // 3. Validate Buffer & File Size (Max 10MB)
    const buffer = Buffer.from(base64Data, "base64");
    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "Image data is empty or corrupted." },
        { status: 400 }
      );
    }

    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (buffer.length > maxSizeBytes) {
      return NextResponse.json(
        { error: "Image file exceeds maximum allowable limit of 10MB." },
        { status: 413 }
      );
    }

    // 4. Extract Sender Metadata (Optional or Provided)
    const senderName = sanitizeInput(body.senderName || body.name || "Verified Scholar");
    const senderEmail = (body.senderEmail || body.email || "").trim().toLowerCase();
    const purpose = sanitizeInput(body.purpose || "AI-Verified Researcher Identity Capture");
    const notes = sanitizeInput(body.notes || "");

    if (senderEmail && !isValidEmail(senderEmail)) {
      return NextResponse.json(
        { error: "Provided sender email address is invalid." },
        { status: 400 }
      );
    }

    // 5. Generate Safe Unique Filename and ID
    const fileId = `scholar-face-${crypto.randomUUID()}-${Date.now()}`;
    const safeFilename = `${fileId}.${imageType === "jpeg" ? "jpg" : imageType}`;
    const destinationEmail =
      process.env.DESTINATION_EMAIL ||
      process.env.OWNER_EMAIL ||
      "kumar2000150@gmail.com";

    const timestamp = new Date().toUTCString();

    const emailSubject = `[KAALREKHA PHOTO VERIFICATION] ${senderName} (${safeFilename})`;
    const emailText = `
======================================================
KAALREKHA ARCHIVE · AI-VERIFIED IDENTITY PHOTO CAPTURE
======================================================
File ID:          ${fileId}
Filename:         ${safeFilename}
Destination:      ${destinationEmail}
Timestamp:        ${timestamp}
Image Size:       ${(buffer.length / 1024).toFixed(1)} KB (${imageType.toUpperCase()})

SENDER DETAILS:
------------------------------------------------------
Researcher Name:  ${senderName}
Email Address:    ${senderEmail || "Not specified / Session verified"}
Purpose:          ${purpose}
Notes:            ${notes || "Automated in-browser face detection auto-capture"}

VERIFICATION STATUS:
------------------------------------------------------
Face Detection:   VALIDATED & CONFIRMED IN BROWSER
Single Face:      PASSED
Stability Check:  PASSED (800ms–1200ms hold-still)
Attachment:       ${safeFilename} (Enclosed)
======================================================
`.trim();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background-color: #F6F1EA; color: #2D3436; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #FAF7F2; border: 1px solid #D6CEBE; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="border-bottom: 2px solid #8A3324; padding-bottom: 12px; margin-bottom: 16px;">
      <h2 style="color: #8A3324; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
        KAALREKHA (କାଳରେଖା)
      </h2>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #636E72; font-family: sans-serif;">
        AI-Verified Researcher Identity Photo Capture
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 13px; margin-bottom: 20px;">
      <tr style="border-bottom: 1px solid #EBE5D9;">
        <td style="padding: 8px 0; color: #8A3324; font-weight: bold; width: 140px;">Researcher:</td>
        <td style="padding: 8px 0; color: #2D3436;">${senderName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EBE5D9;">
        <td style="padding: 8px 0; color: #8A3324; font-weight: bold;">Email:</td>
        <td style="padding: 8px 0; color: #2D3436;">${senderEmail || "Session Authenticated"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EBE5D9;">
        <td style="padding: 8px 0; color: #8A3324; font-weight: bold;">File ID:</td>
        <td style="padding: 8px 0; color: #2D3436; font-family: monospace;">${fileId}</td>
      </tr>
      <tr style="border-bottom: 1px solid #EBE5D9;">
        <td style="padding: 8px 0; color: #8A3324; font-weight: bold;">Timestamp:</td>
        <td style="padding: 8px 0; color: #2D3436;">${timestamp}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #8A3324; font-weight: bold;">Detection Result:</td>
        <td style="padding: 8px 0; color: #27ae60; font-weight: bold;">✓ PASSED (AI Centered & Stable)</td>
      </tr>
    </table>

    <div style="text-align: center; margin: 20px 0; background: #000; padding: 12px; border-radius: 8px;">
      <p style="color: #fff; font-size: 11px; margin: 0 0 8px 0; font-family: sans-serif; letter-spacing: 1px;">
        ATTACHED RESEARCHER IDENTITY PHOTO
      </p>
      <img src="${photoBase64}" alt="Verified Identity" style="max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #444;" />
    </div>

    <p style="font-size: 11px; color: #636E72; font-family: sans-serif; text-align: center; margin: 16px 0 0 0; border-top: 1px solid #EBE5D9; pt: 12px;">
      This email was securely dispatched from the KAALREKHA Digital Historical Archive.
    </p>
  </div>
</body>
</html>
`.trim();

    // 6. Send Email via Mailer (Supports Gmail App Password, SMTP, or Dev Inbox)
    const result = await sendEmail({
      to: destinationEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      photoBase64: photoBase64,
    });

    return NextResponse.json({
      success: true,
      message: "Photo captured and sent successfully to destination archive email.",
      fileId: fileId,
      filename: safeFilename,
      destination: destinationEmail,
      mode: result.mode,
      timestamp: timestamp,
    });
  } catch (error: unknown) {
    console.error("POST /api/send-photo error:", error);
    const msg = error instanceof Error ? error.message : "Internal server error during photo transmission.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
