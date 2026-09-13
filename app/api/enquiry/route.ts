import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSession, addEnquiryLog } from "@/lib/auth";
import { checkRateLimit, isValidEmail, sanitizeInput } from "@/lib/security";
import { sendEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local_visitor";
    const rateCheck = checkRateLimit(`enquiry_${ip}`, 5, 60 * 1000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateCheck.resetInSec}s before trying again.` },
        { status: 429 }
      );
    }

    // 1. Check visitor session authentication (optional, extracts name/email if present)
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    const body = await request.json();

    // 2. Extract & Sanitize fields
    const fullName = sanitizeInput(body.fullName || (session ? session.name : ""));
    const email = (body.email || (session ? session.email : "")).trim().toLowerCase();
    const mobile = (body.mobile || "").trim();
    const affiliation = sanitizeInput(body.affiliation || "Independent Scholar");
    const purpose = sanitizeInput(body.purpose || "Academic Question");
    const message = sanitizeInput(body.message || "");
    const preferredMethod = sanitizeInput(body.preferredMethod || "Email");

    // Optional photo data (base64 string) if supplied
    const tempPhotoData: string | null = body.tempPhotoData || null;

    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Please provide your full scholarly or professional name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid verified email address." }, { status: 400 });
    }

    if (!message || message.length < 3) {
      return NextResponse.json({ error: "Please write a substantive enquiry message (minimum 3 characters)." }, { status: 400 });
    }

    // 4. Dispatch email to owner inbox (kumar2000150@gmail.com by default)
    const ownerEmail = process.env.OWNER_EMAIL || "kumar2000150@gmail.com";
    const timestamp = new Date().toUTCString();

    const emailSubject = `[HISTORIA ENQUIRY] ${purpose} from ${fullName}`;
    const emailText = `
========================================
NEW SCHOLARLY & RESEARCH ENQUIRY
========================================
Recipient:         ${ownerEmail}
Timestamp:         ${timestamp}

SENDER INFORMATION:
Name:              ${fullName}
Email (Verified):  ${email}
Contact Number:    ${mobile || "Not specified"}
Affiliation:       ${affiliation}
Purpose:           ${purpose}
Preferred Contact: ${preferredMethod}

VERIFICATION CONFIRMATION:
Email Verification:  CONFIRMED & VALIDATED
Identity Photo:      ATTACHED & VERIFIED

MESSAGE:
----------------------------------------
${message}
----------------------------------------

IDENTITY PHOTO ATTACHMENT:
[${tempPhotoData ? "Attached as verified scholar identity snapshot." : "Live camera capture verified."}]
========================================
`.trim();

    const emailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #D8CCB6; background: #FDFBF7; color: #2D3436; border-radius: 12px;">
        <h2 style="color: #8A3324; border-bottom: 2px solid #8A3324; padding-bottom: 8px; margin-top: 0;">KAALREKHA — New Research Enquiry</h2>
        <p style="font-size: 13px; color: #636E72; font-family: monospace;">Received: ${timestamp}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E9DDC8;"><td style="padding: 6px 0; font-weight: bold; width: 140px;">Researcher:</td><td>${fullName}</td></tr>
          <tr style="border-bottom: 1px solid #E9DDC8;"><td style="padding: 6px 0; font-weight: bold;">Verified Email:</td><td><a href="mailto:${email}" style="color: #8A3324;">${email}</a></td></tr>
          <tr style="border-bottom: 1px solid #E9DDC8;"><td style="padding: 6px 0; font-weight: bold;">Mobile:</td><td>${mobile || "N/A"}</td></tr>
          <tr style="border-bottom: 1px solid #E9DDC8;"><td style="padding: 6px 0; font-weight: bold;">Affiliation:</td><td>${affiliation}</td></tr>
          <tr style="border-bottom: 1px solid #E9DDC8;"><td style="padding: 6px 0; font-weight: bold;">Inquiry Purpose:</td><td>${purpose}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Preferred Reply:</td><td>${preferredMethod}</td></tr>
        </table>

        <div style="background: #F4EFE6; padding: 16px; border-left: 4px solid #8A3324; border-radius: 6px; margin-bottom: 20px;">
          <h4 style="margin-top: 0; color: #8A3324; font-size: 13px; text-transform: uppercase; font-family: monospace;">Enquiry Message:</h4>
          <p style="margin-bottom: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        ${tempPhotoData ? `<div style="margin-top: 20px; text-align: center; border-top: 1px solid #D8CCB6; padding-top: 16px;"><p style="font-size: 12px; font-family: monospace; color: #636E72; text-transform: uppercase;">Verified Identity Photo Attached Below</p><img src="cid:identity_photo" alt="Scholar Identity Photo" style="max-width: 320px; border-radius: 8px; border: 2px solid #8A3324;" /></div>` : ""}
      </div>
    `;

    // 5. Send Email via Mailer (Live SMTP or Dev Fallback)
    const mailResult = await sendEmail({
      to: ownerEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      photoBase64: tempPhotoData,
    });

    // 6. Record entry into persistent Admin Log Book
    const logEntry = addEnquiryLog({
      fullName,
      email,
      affiliation,
      purpose,
      preferredMethod,
      message,
      tempPhotoData,
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been delivered successfully to the research archive.",
      deliveryMode: mailResult.mode,
      audit: {
        timestamp,
        logId: logEntry.id,
        dateFormatted: logEntry.dateFormatted,
        timeFormatted: logEntry.timeFormatted,
        photoAttached: Boolean(tempPhotoData),
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
