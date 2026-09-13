import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSession, isUserAdmin } from "@/lib/auth";
import { getBlogPosts, addBlogPost } from "@/lib/blog";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    // If admin is logged in, show all posts (including hidden); else show only published posts
    const isAdmin = Boolean(session && isUserAdmin(session.email));
    const posts = getBlogPosts(isAdmin);

    return NextResponse.json({
      success: true,
      isAdmin,
      posts,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to retrieve blog dispatches";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    // Only Admin can upload/create new blog posts
    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json(
        { error: "Unauthorized. Only Dr. Anjan Kumar Pal (kumar2000150@gmail.com) can publish dispatches." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { type, title, caption, mediaUrl, location, tags } = body;

    if (!title || !caption) {
      return NextResponse.json({ error: "Title and caption are required." }, { status: 400 });
    }

    const newPost = addBlogPost({
      type: type || "photo",
      title,
      caption,
      mediaUrl,
      location,
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags
            .split(",")
            .map((t: string) => t.trim().replace(/^#/, ""))
            .filter(Boolean)
        : [],
    });

    return NextResponse.json({
      success: true,
      message: "Blog dispatch published successfully!",
      post: newPost,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to publish blog post";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
