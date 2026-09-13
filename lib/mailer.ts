import nodemailer from "nodemailer";
import { getDevInboxLogs } from "./auth";

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  photoBase64?: string | null;
}

/**
 * Dispatches an email using configured SMTP / Gmail credentials or falls back to Dev Inbox.
 * Supports: DESTINATION_EMAIL, OWNER_EMAIL, SMTP_USER, SMTP_PASSWORD, GMAIL_USER, GMAIL_APP_PASSWORD, EMAIL_API_KEY.
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  photoBase64,
}: SendEmailOptions): Promise<{ success: boolean; mode: "live" | "dev_inbox"; messageId?: string }> {
  const host =
    process.env.SMTP_HOST ||
    (process.env.GMAIL_USER || process.env.SMTP_USER?.includes("gmail") ? "smtp.gmail.com" : null);

  const user =
    process.env.SMTP_USER ||
    process.env.GMAIL_USER ||
    process.env.EMAIL_USER ||
    null;

  const pass =
    process.env.SMTP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.EMAIL_API_KEY ||
    null;

  const port = Number(process.env.SMTP_PORT) || 587;
  const from =
    process.env.SMTP_FROM ||
    process.env.EMAIL_FROM ||
    user ||
    "KAALREKHA Historical Archive <kumar2000150@gmail.com>";

  // If live credentials are provided, send via live SMTP transporter
  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: host || "smtp.gmail.com",
        port: port,
        secure: port === 465,
        auth: {
          user: user,
          pass: pass,
        },
      });

      const attachments: Array<{ filename: string; content: Buffer; cid?: string }> = [];

      if (photoBase64 && photoBase64.includes(",")) {
        const base64Data = photoBase64.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        attachments.push({
          filename: "scholar_identity_verified.jpg",
          content: buffer,
          cid: "identity_photo",
        });
      }

      const info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html || text.replace(/\n/g, "<br>"),
        attachments: attachments,
      });

      return { success: true, mode: "live", messageId: info.messageId };
    } catch (err: unknown) {
      console.error("Live SMTP dispatch error:", err);
      // Fallback to dev inbox if SMTP encounters temporary error
    }
  }

  // Fallback / Development Inbox logging
  const devLogs = getDevInboxLogs();
  devLogs.unshift({
    id: crypto.randomUUID(),
    type: "PHOTO_AND_ENQUIRY_DISPATCH",
    to: to,
    name: "KAALREKHA Dispatcher",
    subject: subject,
    timestamp: Date.now(),
    details: `${text}\n\n[Photo attached: ${photoBase64 ? "YES (Base64 JPEG/PNG)" : "NO"}]`,
  });

  return { success: true, mode: "dev_inbox" };
}
