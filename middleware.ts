import { NextResponse, type NextRequest } from "next/server";

export const SESSION_COOKIE = "historia_visitor_session";

// Public paths that do not require onboarding
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files, Next.js system internals, images, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  // If user explicitly visits /onboarding and already has session without a token, let them view it or navigate
  if (pathname === "/onboarding") {
    return NextResponse.next();
  }

  // Auto-mint session cookie transparently if not present, so the user is never blocked
  const response = NextResponse.next();
  if (!sessionCookie) {
    const guestSessionId = "guest_" + Math.random().toString(36).substring(2, 15);
    response.cookies.set({
      name: SESSION_COOKIE,
      value: guestSessionId,
      httpOnly: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
