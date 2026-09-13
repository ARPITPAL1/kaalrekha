import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  validateSession,
  getEnquiryLogs,
  updateEnquiryLogStatus,
  deleteEnquiryLog,
  isUserAdmin,
} from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    // Enforce Admin Authentication
    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json(
        { error: "Access restricted. Only Dr. Anjan Kumar Pal (kumar2000150@gmail.com) can access the Log Book." },
        { status: 403 }
      );
    }

    const logs = getEnquiryLogs();
    const todayStr = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const stats = {
      total: logs.length,
      today: logs.filter((l) => l.dateFormatted === todayStr).length,
      unread: logs.filter((l) => l.status === "UNREAD").length,
      reviewed: logs.filter((l) => l.status === "REVIEWED").length,
    };

    return NextResponse.json({
      success: true,
      stats,
      logs,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !["UNREAD", "REVIEWED", "ARCHIVED"].includes(status)) {
      return NextResponse.json({ error: "Invalid log id or status" }, { status: 400 });
    }

    const updated = updateEnquiryLogStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing log ID" }, { status: 400 });
    }

    const deleted = deleteEnquiryLog(id);
    if (!deleted) {
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Log entry deleted." });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
