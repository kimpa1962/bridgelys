import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // 🔁 Redirect gamla /sv → root (.se)
  if (pathname.startsWith("/sv")) {
    const newPath = pathname.replace(/^\/sv/, "") || "/";
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // 🔁 Redirect gamla /en → .com
  if (pathname.startsWith("/en")) {
    const newPath = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(
      `https://bridgelys.com${newPath}`
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};