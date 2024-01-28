import { NextResponse } from "next/server";

export async function middleware(request) {
  const isAuthenticate = request.cookies.get(process.env.COOKIE_SESSION_TOKEN);
  const path = request.nextUrl.pathname;
  if (path.startsWith("/profile")) {
    if (!isAuthenticate) {
      return NextResponse.rewrite(new URL("/signin", request.url));
    }
  }

  if (path.startsWith("/signin") || path.startsWith("/signup")) {
    if (isAuthenticate) {
      return NextResponse.rewrite(new URL("/profile", request.url));
    }
  }
  if (path.startsWith("/quiz-start")) {
    if (!isAuthenticate) {
      return NextResponse.rewrite(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Use an array of objects for more specific matching
  matcher: ["/profile", "/signin", "/signup", "/quiz-start/:path*"],
};
