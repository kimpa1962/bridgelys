import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  const {pathname} = request.nextUrl;

  if (hostname?.includes("bridgelys.com") && pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  if (hostname?.includes("bridgelys.se") && pathname === "/") {
    return NextResponse.redirect(new URL("/sv", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};