import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clientId = (body?.clientId || "").trim();
    const clientSecret = (body?.clientSecret || "").trim();

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required." },
        { status: 400 }
      );
    }

    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = `# Local Development Environment Variables
GOOGLE_CLIENT_ID="${clientId}"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="${clientId}"
GOOGLE_CLIENT_SECRET="${clientSecret}"
APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
`;

    fs.writeFileSync(envPath, envContent, "utf-8");

    // Also update current process env in memory
    process.env.GOOGLE_CLIENT_ID = clientId;
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = clientId;
    process.env.GOOGLE_CLIENT_SECRET = clientSecret;
    process.env.APP_URL = "http://localhost:3000";

    return NextResponse.json({
      success: true,
      message: "Credentials saved to .env.local successfully.",
      clientId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to write .env.local";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
