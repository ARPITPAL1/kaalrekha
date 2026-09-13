import crypto from "crypto";
import { getDevInboxLogs } from "./auth";

// Strict rate limiter: Map of IP/Key -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, maxRequests = 10, windowMs = 60 * 1000): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetInSec: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count, resetInSec: Math.ceil((entry.resetAt - now) / 1000) };
}

// Input sanitizer preventing XSS & script injection
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  // Clean string to digits & plus
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[1-9]\d{6,14}$/.test(cleaned);
}

// Mobile OTP Store
interface OtpRecord {
  code: string;
  phone: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __historia_otps: Map<string, OtpRecord> | undefined;
}

const otps = global.__historia_otps ?? new Map<string, OtpRecord>();
if (process.env.NODE_ENV !== "production") {
  global.__historia_otps = otps;
}

export function generateAndSendOtp(phone: string): { success: boolean; error?: string; devCode?: string } {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  if (!isValidPhoneNumber(cleanPhone)) {
    return { success: false, error: "Please provide a valid international mobile number." };
  }

  // Generate cryptographically secure 6-digit number
  const buffer = crypto.randomBytes(3);
  const num = (buffer.readUIntBE(0, 3) % 900000) + 100000;
  const code = num.toString();

  const now = Date.now();
  const record: OtpRecord = {
    code,
    phone: cleanPhone,
    expiresAt: now + 5 * 60 * 1000, // 5 minutes
    attempts: 0,
    verified: false,
  };

  otps.set(cleanPhone, record);

  // Record into dev inbox for transparent verification during local testing
  const logs = getDevInboxLogs();
  logs.unshift({
    id: crypto.randomUUID(),
    type: "MOBILE_OTP",
    to: cleanPhone,
    subject: `SMS OTP Code: ${code}`,
    otpCode: code,
    timestamp: now,
    details: `Single-use verification code sent to ${cleanPhone}. Valid for 5 minutes.`,
  });

  return { success: true, devCode: code };
}

export function verifyOtp(phone: string, inputCode: string): { success: boolean; error?: string; verificationReceipt?: string } {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  const record = otps.get(cleanPhone);

  if (!record) {
    return { success: false, error: "No verification code requested for this number. Please request a new code." };
  }

  if (Date.now() > record.expiresAt) {
    otps.delete(cleanPhone);
    return { success: false, error: "Verification code has expired. Please request a new code." };
  }

  if (record.attempts >= 5) {
    otps.delete(cleanPhone);
    return { success: false, error: "Too many failed attempts. For security, please request a fresh code." };
  }

  record.attempts += 1;

  if (record.code !== inputCode.trim()) {
    return { success: false, error: `Incorrect code. ${5 - record.attempts} attempts remaining.` };
  }

  record.verified = true;
  otps.delete(cleanPhone); // Single-use consumption

  // Issue cryptographic proof receipt for the enquiry form
  const receipt = crypto.createHmac("sha256", process.env.OTP_SECRET || "historia_otp_secret_key_2026")
    .update(`${cleanPhone}:${Date.now()}`)
    .digest("hex");

  return { success: true, verificationReceipt: receipt };
}
