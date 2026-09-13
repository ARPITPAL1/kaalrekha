import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSession, isUserAdmin } from "@/lib/auth";
import { toggleBlogPostHide, deleteBlogPost, getBlogPostById } from "@/lib/blog";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    // Only Admin can hide or unhide blog posts
    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const result = toggleBlogPostHide(id);
    if (!result.success) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: result.isHidden ? "Post is now hidden from public view" : "Post is now publicly visible",
      isHidden: result.isHidden,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update blog post";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    // Only Admin can delete blog posts
    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const deleted = deleteBlogPost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete blog post";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
