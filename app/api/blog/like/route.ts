import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSession } from "@/lib/auth";
import { toggleBlogPostLike } from "@/lib/blog";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    // Identify user by session email, or session ID, or client-provided visitor identifier
    const userIdentifier = session?.email || sessionId || body.visitorId || "anonymous_visitor";

    const result = toggleBlogPostLike(postId, userIdentifier);

    if (!result.success) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      likesCount: result.likesCount,
      isLiked: result.isLiked,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to register like";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
