import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const {pathname} = request.nextUrl;

  const hasLocalePrefix =
    pathname === "/sv" ||
    pathname === "/en" ||
    pathname.startsWith("/sv/") ||
    pathname.startsWith("/en/");

  if (!hasLocalePrefix) {
    if (hostname.includes("bridgelys.com")) {
      return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
    }

    if (hostname.includes("bridgelys.se")) {
      return NextResponse.redirect(new URL(`/sv${pathname}`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};