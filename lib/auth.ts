import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

export interface PendingVerification {
  token: string;
  code: string;
  name: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
}

export interface UserAccount {
  id: string;
  googleSub?: string;
  email: string;
  name: string;
  picture?: string;
  provider: "google" | "email" | "guest";
  createdAt: number;
  lastLoginAt: number;
}

export interface VisitorSession {
  sessionId: string;
  userId?: string;
  name: string;
  email: string;
  picture?: string;
  googleSub?: string;
  authProvider: "google" | "email" | "guest";
  verifiedAt: number;
  role: "VISITOR" | "SCHOLAR_GUEST";
}

// Memory store for verification tokens, active sessions, and registered users
declare global {
  // eslint-disable-next-line no-var
  var __historia_verifications: Map<string, PendingVerification> | undefined;
  // eslint-disable-next-line no-var
  var __historia_sessions: Map<string, VisitorSession> | undefined;
  // eslint-disable-next-line no-var
  var __historia_users: Map<string, UserAccount> | undefined;
  // eslint-disable-next-line no-var
  var __historia_inbox_logs: Array<{
    id: string;
    type: "EMAIL_VERIFICATION" | "MOBILE_OTP" | "ENQUIRY_DISPATCH" | "PHOTO_AND_ENQUIRY_DISPATCH" | "GOOGLE_AUTH";
    to: string;
    name?: string;
    subject: string;
    token?: string;
    verifyUrl?: string;
    otpCode?: string;
    timestamp: number;
    details?: string;
  }> | undefined;
}

const verifications = global.__historia_verifications ?? new Map<string, PendingVerification>();
const sessions = global.__historia_sessions ?? new Map<string, VisitorSession>();
const users = global.__historia_users ?? new Map<string, UserAccount>();
const inboxLogs = global.__historia_inbox_logs ?? [];

if (process.env.NODE_ENV !== "production") {
  global.__historia_verifications = verifications;
  global.__historia_sessions = sessions;
  global.__historia_users = users;
  global.__historia_inbox_logs = inboxLogs;
}

export const SESSION_COOKIE_NAME = "historia_visitor_session";
const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function generateCryptoToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function getGoogleOAuthClient(): OAuth2Client {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  return new OAuth2Client(clientId, clientSecret);
}

/**
 * Securely verifies a Google ID Token on the backend using Google's official OAuth2Client.
 * Validates cryptographic signature, issuer, audience, and expiry.
 * Extracts only: sub, email, name, picture.
 */
export async function verifyGoogleIdToken(idToken: string): Promise<{
  success: boolean;
  user?: { sub: string; email: string; name: string; picture?: string };
  error?: string;
}> {
  if (!idToken || typeof idToken !== "string") {
    return { success: false, error: "Missing or invalid Google ID token." };
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  try {
    const client = getGoogleOAuthClient();

    // Verify token with Google public keys and audience check
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId ? [clientId] : undefined,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return { success: false, error: "Failed to extract Google user profile payload." };
    }

    const { sub, email, name, picture } = payload;

    if (!sub) {
      return { success: false, error: "Google user identifier (sub) is missing." };
    }

    if (!email) {
      return { success: false, error: "Google account email is missing." };
    }

    return {
      success: true,
      user: {
        sub,
        email: email.toLowerCase(),
        name: name || email.split("@")[0],
        picture: picture || undefined,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Google token verification failed";
    console.error("[Google Auth] ID Token verification error:", message);
    return {
      success: false,
      error: `Google verification error: ${message}`,
    };
  }
}

/**
 * Finds or creates a user account keyed by the unique Google `sub` identifier.
 * Prevents account duplication and links existing accounts seamlessly.
 */
export function findOrCreateGoogleUser(googleUser: {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}): UserAccount {
  const cleanEmail = googleUser.email.toLowerCase().trim();
  const cleanSub = googleUser.sub.trim();
  const now = Date.now();

  // 1. Search by unique Google sub
  for (const user of users.values()) {
    if (user.googleSub === cleanSub) {
      user.name = googleUser.name || user.name;
      if (googleUser.picture) user.picture = googleUser.picture;
      user.email = cleanEmail;
      user.lastLoginAt = now;
      users.set(user.id, user);
      return user;
    }
  }

  // 2. Search by email to link existing email account to this Google sub
  for (const user of users.values()) {
    if (user.email.toLowerCase() === cleanEmail) {
      user.googleSub = cleanSub;
      user.name = googleUser.name || user.name;
      if (googleUser.picture) user.picture = googleUser.picture;
      user.provider = "google";
      user.lastLoginAt = now;
      users.set(user.id, user);
      return user;
    }
  }

  // 3. Create a brand new user account
  const newUserId = `usr_${crypto.randomUUID()}`;
  const newUser: UserAccount = {
    id: newUserId,
    googleSub: cleanSub,
    email: cleanEmail,
    name: googleUser.name.trim(),
    picture: googleUser.picture,
    provider: "google",
    createdAt: now,
    lastLoginAt: now,
  };

  users.set(newUserId, newUser);

  // Log in dev inbox / activity log
  inboxLogs.unshift({
    id: crypto.randomUUID(),
    type: "GOOGLE_AUTH",
    to: newUser.email,
    name: newUser.name,
    subject: "Google Sign-In Account Established",
    timestamp: now,
    details: `User verified via Google OAuth 2.0 (sub: ${cleanSub}). Account ${newUserId} registered.`,
  });
  if (inboxLogs.length > 50) inboxLogs.pop();

  return newUser;
}

/**
 * Creates an authenticated session for a Google user
 */
export function createGoogleSession(user: UserAccount): VisitorSession {
  const sessionId = crypto.randomBytes(40).toString("hex");
  const session: VisitorSession = {
    sessionId,
    userId: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    googleSub: user.googleSub,
    authProvider: "google",
    verifiedAt: Date.now(),
    role: "SCHOLAR_GUEST",
  };

  sessions.set(sessionId, session);
  return session;
}

export function createPendingVerification(name: string, email: string): { token: string; code: string; verifyUrl: string } {
  const token = generateCryptoToken();
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const now = Date.now();
  const record: PendingVerification = {
    token,
    code,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    createdAt: now,
    expiresAt: now + TOKEN_TTL_MS,
    used: false,
  };

  verifications.set(token, record);

  const baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/onboarding?token=${token}`;

  // Record into dev simulated inbox for transparent local evaluation
  inboxLogs.unshift({
    id: crypto.randomUUID(),
    type: "EMAIL_VERIFICATION",
    to: record.email,
    name: record.name,
    subject: "HISTORIA Archive — Invitation & Verification Seal",
    token,
    verifyUrl,
    otpCode: code,
    timestamp: now,
    details: `Official scholar archive invitation generated for ${record.name}. Verification Code: ${code}. Single-use cryptographic seal valid for 15 minutes.`,
  });

  if (inboxLogs.length > 50) inboxLogs.pop();

  return { token, code, verifyUrl };
}

export function verifyCodeAndCreateSession(email: string, code: string): { success: boolean; session?: VisitorSession; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();

  for (const [token, record] of verifications.entries()) {
    if (record.email === cleanEmail && record.code === cleanCode) {
      return verifyTokenAndCreateSession(token);
    }
  }
  return { success: false, error: "Invalid or expired verification code. Please check your email or request a new code." };
}

export function verifyTokenAndCreateSession(token: string): { success: boolean; session?: VisitorSession; error?: string } {
  const record = verifications.get(token);
  if (!record) {
    return { success: false, error: "Invalid or nonexistent verification seal." };
  }

  if (record.used) {
    return { success: false, error: "This verification seal has already been consumed." };
  }

  if (Date.now() > record.expiresAt) {
    verifications.delete(token);
    return { success: false, error: "Verification seal has expired. Please request a new invitation." };
  }

  record.used = true;
  verifications.set(token, record);

  const sessionId = crypto.randomBytes(40).toString("hex");
  const session: VisitorSession = {
    sessionId,
    name: record.name,
    email: record.email,
    authProvider: "email",
    verifiedAt: Date.now(),
    role: "SCHOLAR_GUEST",
  };

  sessions.set(sessionId, session);
  return { success: true, session };
}

export function createInstantGuestSession(name = "Scholar Guest", email = "guest@kaalrekha.org"): VisitorSession {
  const sessionId = crypto.randomBytes(40).toString("hex");
  const session: VisitorSession = {
    sessionId,
    name: name.trim() || "Scholar Guest",
    email: email.trim() || "guest@kaalrekha.org",
    authProvider: "guest",
    verifiedAt: Date.now(),
    role: "SCHOLAR_GUEST",
  };
  sessions.set(sessionId, session);
  return session;
}

export function validateSession(sessionId: string | undefined): VisitorSession | null {
  if (!sessionId) return null;
  const session = sessions.get(sessionId);
  if (!session) return null;
  return session;
}

export function revokeSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function getDevInboxLogs() {
  return inboxLogs;
}
