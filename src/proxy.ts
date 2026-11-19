import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup"];
const PUBLIC_ROUTES = ["/", "/about", "/campaigns"];

export function proxy(request: NextRequest) {
  const cookieStore = cookies();
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
